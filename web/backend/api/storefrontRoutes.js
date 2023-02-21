import express from "express";
import { landingPage, createCustomer } from "../controllers/storefront/landingPage.js";
import {getMobileData} from "../controllers/backendControllers.js"

const storefrontRoutes = express.Router();

storefrontRoutes.get("/landingPage", landingPage);
storefrontRoutes.post("/customerCreate", createCustomer)

  export default storefrontRoutes;