import mongoose from "mongoose";
const { Schema } = mongoose;

let menuData = new Schema(
  {
    shop: { type: String, required: true },
    menu_data: { type: Object },
  },
  { timestamps: true }
);

let menuModel = mongoose.model("menuData", menuData);
export default menuModel;