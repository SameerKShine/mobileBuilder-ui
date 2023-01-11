import mongoose from "mongoose";
const { Schema } = mongoose;

let landingPageData = new Schema(
  {
    shop: { type: String, required: true },
    landing_page: { type: Array },
  },
  { timestamps: true }
);

let landingPageModel = mongoose.model("landingPageData", landingPageData);
export default landingPageModel;