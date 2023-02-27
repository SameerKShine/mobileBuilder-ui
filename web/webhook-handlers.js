import { DeliveryMethod } from "@shopify/shopify-api";
import shopify from "./shopify.js";
import crypto from "node:crypto";
export default {
  /**
   * Customers can request their data from a store owner. When this happens,
   * Shopify invokes this webhook.
   *
   * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
   */

  //  PRODUCTS_UPDATE: {
  //   deliveryMethod: DeliveryMethod.Http,
  //   callbackUrl: "/products/update",
  //   callback: async (topic, shop, body, webhookId) => {
  //     console.log('--- Product update ---');
  //     const payload = JSON.parse(body);
  //     console.log(payload);
  //     console.log('--- /Product update ---');
  //   },
  // },

  PRODUCTS_UPDATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks/products/update",
    callback: async (topic, shop, body, webhookId) => {
      console.log('--- Product update ---');
      const secretKey = process.env.SHOPIFY_API_SECRET;
      const payload = JSON.parse(body);
      // let hmac_header = req.headers["x-shopify-hmac-sha256"];
      console.log( "heaader", webhookId)
      const hmac_calculated = crypto.createHmac("sha256", secretKey).update(body).digest("base64");
      console.log(hmac_calculated, "cal")

      // const sessionId = await shopify.api.session.getOfflineId(shop)
      // const session = await shopify.config.sessionStorage.loadSession(sessionId);
      // const client = new shopify.api.clients.Rest({session});
      console.log('--- /Product update ---', session);
    },
  },

  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      // Payload has the following shape:
      // {
      //   "shop_id": 954889,
      //   "shop_domain": "{shop}.myshopify.com",
      //   "orders_requested": [
      //     299938,
      //     280263,
      //     220458
      //   ],
      //   "customer": {
      //     "id": 191167,
      //     "email": "john@example.com",
      //     "phone": "555-625-1199"
      //   },
      //   "data_request": {
      //     "id": 9999
      //   }
      // }
    },
  },

  /**
   * Store owners can request that data is deleted on behalf of a customer. When
   * this happens, Shopify invokes this webhook.
   *
   * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      // Payload has the following shape:
      // {
      //   "shop_id": 954889,
      //   "shop_domain": "{shop}.myshopify.com",
      //   "customer": {
      //     "id": 191167,
      //     "email": "john@example.com",
      //     "phone": "555-625-1199"
      //   },
      //   "orders_to_redact": [
      //     299938,
      //     280263,
      //     220458
      //   ]
      // }
    },
  },

  /**
   * 48 hours after a store owner uninstalls your app, Shopify invokes this
   * webhook.
   *
   * https://shopify.dev/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      const payload = JSON.parse(body);
      // Payload has the following shape:
      // {
      //   "shop_id": 954889,
      //   "shop_domain": "{shop}.myshopify.com"
      // }
    },
  },
};
