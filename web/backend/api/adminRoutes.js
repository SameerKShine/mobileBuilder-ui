import express from "express";
import { saveLandingPageData, saveMenuData } from "../controllers/backendControllers.js";

const adminRoutes = express.Router();

adminRoutes.post("/landingPage", saveLandingPageData);
adminRoutes.post("/saveMenuData", saveMenuData);

  export default adminRoutes;