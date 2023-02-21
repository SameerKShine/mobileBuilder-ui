import mongoose from "mongoose";
const { Schema } = mongoose;

let builderData = new Schema(
  {
    shop: { type: String, required: true },
    publish: { type: Boolean },
    design_name: { type: String },
    template_id: { type: String },
    profile_page_design: { type: String },
    cart_page_design: { type: String },
    product_detail_page_design: { type: String },
    landing_page: { type: Array },
    menu_data: { type: Object },
    app_apperance: { type: Object },
    app_bar: { type: Object },
    side_bar: { type: Object },
  },
  { timestamps: true }
);

let builderDataModel = mongoose.model("builderData", builderData);
export default builderDataModel;
