import express from "express";
import { landingPage } from "../controllers/storefront/landingPage.js";
import {getMobileData} from "../controllers/backendControllers.js"

const storefrontRoutes = express.Router();

storefrontRoutes.get("/landingPage", landingPage);
// storefrontRoutes.post("/getMobileData", getMobileData);

  export default storefrontRoutes;