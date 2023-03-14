import express from "express";
import { landingPage, createCustomer } from "../controllers/storefront/landingPage.js";
import { productDetail } from "../controllers/storefront/shopifyApi.js";
import {getMobileData} from "../controllers/backendControllers.js"

const storefrontRoutes = express.Router();

storefrontRoutes.get("/landingPage", landingPage);
storefrontRoutes.post("/customerCreate", createCustomer)
storefrontRoutes.get("/getProductDetail", productDetail)

  export default storefrontRoutes;