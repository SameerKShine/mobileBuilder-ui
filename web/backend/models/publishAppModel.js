import mongoose from "mongoose";
const { Schema } = mongoose;

let publishAppData = new Schema(
  {
    shop: { type: String, required: true },
    appName: { type: String, required: true },
    appSubtitle: { type: String },
    email: { type: String },
    companyName: { type: String },
    supportUrl: { type: String },
    storeUrl: { type: String },
    fullDescription: { type: String },
    shortDescription: { type: String },
    keywords:{ type: String },
    copyright_text:{ type: String },
    privacy_policy_url:{ type: String },
    developer_account: { type: Boolean },
    appstore_email: { type: String },
    playstore_account: { type: Boolean },
    playstore_email: { type: String },
    country_select: { type: String },
  },
  { timestamps: true }
);

let publishAppModel = mongoose.model("publishAppData", publishAppData);
export default publishAppModel;