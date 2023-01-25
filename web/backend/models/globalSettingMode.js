import mongoose from "mongoose";
const { Schema } = mongoose;

let globalSettingData = new Schema(
  {
    shop: { type: String, required: true },
    global_setting: { 
      app_icon: String,
      splash_screen: String,
      app_name:String

     },
  },
  { timestamps: true }
);

let globalSettingModel = mongoose.model("globalSettingData", globalSettingData);
export default globalSettingModel;