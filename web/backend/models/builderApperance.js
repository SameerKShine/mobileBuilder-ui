import mongoose from "mongoose";
const { Schema } = mongoose;

let builderApperanceData = new Schema(
  {
    shop: { type: String, required: true },
    builder_apperance: { 
      app_logo:String,
        primary_color: String,
        secondary_color: String,
        background_color: String,
        font_family: String,
        font_size: String,
     },
  },
  { timestamps: true }
);

let builderApperanceModel = mongoose.model("builderApperanceData", builderApperanceData);
export default builderApperanceModel;