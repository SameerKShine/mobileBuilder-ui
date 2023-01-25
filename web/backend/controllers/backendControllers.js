import builderApperanceModel from "../models/builderApperance.js";
import globalSettingModel from "../models/globalSettingMode.js";
import landingPageModel from "../models/landingPageModel.js";
import menuModel from "../models/menuModel.js";


//Landing Page Api controller
export const saveLandingPageData = async (req, res) => {
  try {
    const { data } = req.body;
    const shop = res.locals.shopify.session.shop;
    console.log(req.body);
    // console.log(shop)
    if (shop) {
      const results = await landingPageModel.findOneAndUpdate(
        { shop: shop },
        {
          landing_page: data,
        },
        {
          upsert: true, // Make this update into an upsert
          new: true,
        }
      );
      //   console.log(results)
      res
        .status(200)
        .send({
          message: "succcess",
          data: "Landing page data saved Successfully ",
        });
    } else {
      res.status(200).send({ message: "error", data: "Something Went wrong" });
    }
  } catch (err) {
    console.log("enter in catch", err.message);
    res.status(200).send({ message: "error", data: "Something Went wrong" });
  }
};


//Menu Api controller
export const saveMenuData = async (req, res) => {
  try {
    const { data } = req.body;
    const shop = res.locals.shopify.session.shop;
    if (shop) {
      const results = await menuModel.findOneAndUpdate(
        { shop: shop },
        {
          menu_data: data,
        },
        {
          upsert: true, // Make this update into an upsert
          new: true,
        }
      );
      //   console.log(results)
      res
        .status(200)
        .send({ message: "succcess", data: "Menu data saved Successfully " });
    } else {
      res.status(200).send({ message: "error", data: "Something Went wrong" });
    }
  } catch {
    console.log("enter in CTACH");
    res.status(200).send({ message: "error", data: "Something Went wrong" });
  }
};

// global setting Api controller
export const saveGlobalSetting = async (req, res) =>{
  try {
    const { data } = req.body;
    const shop = res.locals.shopify.session.shop;
    if (shop) {
      const results = await globalSettingModel.findOneAndUpdate(
        { shop: shop },
        {
          global_setting: data,
        },
        {
          upsert: true, // Make this update into an upsert
          new: true,
        }
      );
      //   console.log(results)
      res
        .status(200)
        .send({ message: "succcess", data: "Global Setting data saved Successfully " });
    } else {
      res.status(200).send({ message: "error", data: "Something Went wrong" });
    }
  } catch {
    console.log("enter in CTACH");
    res.status(200).send({ message: "error", data: "Something Went wrong" });
  }
}

// Builder Apperance Api controller
export const saveBuilderApperance = async (req, res) => {
  try {
    console.log("saveBuilderApperance")
    const { data } = req.body;
    const shop = res.locals.shopify.session.shop;
    if (shop) {
      const results = await builderApperanceModel.findOneAndUpdate(
        { shop: shop },
        {
          builder_apperance: data,
        },
        {
          upsert: true, // Make this update into an upsert
          new: true,
        }
      );
      //   console.log(results)
      res
        .status(200)
        .send({ message: "succcess", data: "Setting saved Successfully " });
    } else {
      res.status(200).send({ message: "error", data: "Something Went wrong" });
    }
  } catch {
    console.log("enter in CTACH");
    res.status(200).send({ message: "error", data: "Something Went wrong" });
  }
}

// get all mobile data
export const getMobileData = async (req, res) => {
    try{
      const shop = res.locals.shopify.session.shop
     
      console.log('enter here agregation', shop)
  const data = await  landingPageModel.aggregate([
        { $match: { shop: shop } },
        {
          $lookup: {
            from: "menudatas",
            localField: "shop",
            foreignField: "shop",
            as: "menuData",
          },
        },
        {
          $unwind: {
            "path": "$menuData",
            "preserveNullAndEmptyArrays": true
           }
         },
        {
          $lookup:{
            from:"globalsettingdatas",
            localField: "shop",
            foreignField: "shop",
            as: "globalSettingData",
          }
        },
        {
          $unwind: {
            "path": "$globalSettingData",
            "preserveNullAndEmptyArrays": true
           }
         },
        {
          $lookup:{
            from:"builderapperancedatas",
            localField: "shop",
            foreignField: "shop",
            as: "builderApperanceData",
          }
        },
        {
          $unwind: {
            "path": "$builderApperanceData",
            "preserveNullAndEmptyArrays": true
           }
         },
         {
          $project:{
            "landing_page":1,
            "menuData": {
              "menu_data": 1
            },
            "globalSettingData": {
              "global_setting": 1
            },
            "builderApperanceData": {
              "builder_apperance": 1
            }
          }
        },
      ])
      console.log(data)
      res.send({status:true, result:data[0]})
    }
    catch(err){
      console.log('enter in catch', err)
      res.send({status:false, result:"Something went wrong"})
    }
} 