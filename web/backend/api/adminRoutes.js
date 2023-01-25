import express from "express";
import { saveLandingPageData, saveMenuData, saveGlobalSetting, getMobileData, saveBuilderApperance } from "../controllers/backendControllers.js";
import { UploadImage, deleteimg } from "../helpers/multer.js";
import { getProducts, getCollection, getProductsOfCollection } from "../controllers/shopifyApi.js";

const adminRoutes = express.Router();

adminRoutes.post("/landingPage", saveLandingPageData);
adminRoutes.post("/saveMenuData", saveMenuData);
adminRoutes.post("/globalSetting", saveGlobalSetting);
adminRoutes.post("/builderApperance", saveBuilderApperance);

adminRoutes.post("/uploadImage", UploadImage);
adminRoutes.post("/deleteImage", deleteimg);

adminRoutes.post("/getProduct", getProducts);
adminRoutes.post("/getCollections", getCollection);
adminRoutes.post("/collectionProducts", getProductsOfCollection);

adminRoutes.get("/getMobileData", getMobileData);

  export default adminRoutes;