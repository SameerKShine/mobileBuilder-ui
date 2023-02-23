import express from "express";
import {
  publishDesign,
  saveGlobalSetting,
  getMobileData,
  // saveBuilderApperance,
  pushNotification,
  saveBuilderData,
  getDesignsList,
  getDesignsNames,
  publishApp,
  deleteAppDesign
} from "../controllers/backendControllers.js";
import { UploadImage, deleteimg } from "../helpers/multer.js";
import {
  getProducts,
  getCollection,
  getProductsOfCollection,
} from "../controllers/shopifyApi.js";

const adminRoutes = express.Router();


adminRoutes.get("/getMobileData/:id", getMobileData);
adminRoutes.get("/getDesignsList", getDesignsList);
adminRoutes.get("/getAllDesignNames", getDesignsNames);

adminRoutes.post("/builderData", saveBuilderData);
adminRoutes.post("/publishDesign", publishDesign);
adminRoutes.post("/publishApp", publishApp);

adminRoutes.post("/globalSetting", saveGlobalSetting);
// adminRoutes.post("/builderApperance", saveBuilderApperance);

adminRoutes.post("/uploadImage", UploadImage);
adminRoutes.post("/deleteImage", deleteimg);
adminRoutes.delete("/deleteAppDesign", deleteAppDesign);

adminRoutes.post("/getProduct", getProducts);
adminRoutes.post("/getCollections", getCollection);
adminRoutes.post("/collectionProducts", getProductsOfCollection);


adminRoutes.post("/pushNotification", pushNotification);
adminRoutes.get("/update", (req, res) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
});

export default adminRoutes;
