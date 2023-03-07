// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import mongodb from './backend/config/mongodb.js'
import adminRoutes from "./backend/api/adminRoutes.js";
import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import webhookHandlers   from "./webhook-handlers.js";
import storefrontRoutes from "./backend/api/storefrontRoutes.js";


const PORT = parseInt(process.env.BACKEND_PORT || process.env.PORT, 10);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
// console.log( "process.env.SCOPES", process.env.SCOPES)
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);

console.log(process.env.HOST)
console.log(process.env.SCOPES)
// console.log("GDPRWebhookHandlers", GDPRWebhookHandlers.PRODUCTS_UPDATE)
// console.log("shopify.config.webhooks.path", shopify.config.webhooks.path)

// app.post(
//   shopify.config.webhooks.path,
//   shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
// );
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers : webhookHandlers })
  );
mongodb()

app.use(express.json());

app.use("/api/storefront/", storefrontRoutes)
// app.use("/api/storefront/",shopify.validateAuthenticatedSession(), storefrontRoutes)
app.use("/api/admin/",shopify.validateAuthenticatedSession(), adminRoutes)
console.log(process.cwd())
app.use('/uploads', express.static(join(process.cwd(), 'uploads')));
// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

// app.post("/api/admin/searchDataproduct", async ( _req, res)=>{
//   console.log("enter here")
//   console.log(res.locals.shopify)
// })




app.post("/api/admin/test", async ( _req, res) => {
  console.log("Enter In APisdfsegfdegtdrghdghdf")
  console.log(_req.body)
  console.log(res.locals.shopify)
  res.send({message:"Sucess"})
})

app.get("/api/products/count", async (_req, res) => {
  console.log(res.locals.shopify)
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
