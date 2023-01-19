import mongoose from "mongoose";
const { Schema } = mongoose;

let globalSettingData = new Schema(
  {
    shop: { type: String, required: true },
    global_setting: { type: Array },
  },
  { timestamps: true }
);

let globalSettingModel = mongoose.model("globalSettingData", globalSettingData);
export default globalSettingModel;