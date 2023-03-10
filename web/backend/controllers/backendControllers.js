// import builderApperanceModel from "../models/builderApperance.js";
import globalSettingModel from "../models/globalSettingMode.js";
import landingPageModel from "../models/landingPageModel.js";
import builderDataModel from "../models/builderData.js";
import menuModel from "../models/menuModel.js";
import publishAppModel from "../models/publishAppModel.js"
import fetch from "node-fetch";


// COMMON FUNCTIONS

//create Unique code
function createUniqueCode(data) {
  const genRand = () => {
    return  Math.random().toString(36).substring(2,4 + 2) +
    (new Date()).getTime().toString(36);
  };
  let short_code = genRand();
  const filterCode = data.filter((el) => el.template_id.includes(short_code));
  if (filterCode.length >= 1) {
    return createUniqueCode(data);
    // console.log(short_code, 'if condition')
  } else {
    return short_code;
  }
}

//get list
async function getList (shop){
    return await builderDataModel.find(
        { shop: shop },
        {
          design_name:1,
          template_id:1,
          updatedAt:1,
          publish:1
        }
      )
}

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


//publishDesign Api controller
export const publishDesign = async (req, res) => {
  try {
    const { publish, updateId } = req.body;
    // console.log(updateId)
    const shop = res.locals.shopify.session.shop;
    if (shop) {
     const publishedData = await builderDataModel.findOneAndUpdate(
        {  shop: shop, publish:true }, {publish: false}
      )
       console.log("publishedData ", publishedData)
      if(publish){
        // console.log(publishedData._id)
        console.log("enter in If condition ", updateId)
        const results = await builderDataModel.findOneAndUpdate(
          { shop: shop, _id:updateId }, {publish:true}
        );
      } 
     const d = getList(shop);
     d.then((data) =>
       res.status(200).send({
         message: "succcess",
         data: data,
       })
     );
      }
  } catch(error) {
    console.log("enter in CTACH", error);
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
// export const saveBuilderApperance = async (req, res) => {
//   try {
//     console.log("saveBuilderApperance")
//     const { app_appearance } = req.body;
//     console.log(req.body)
//     const shop = res.locals.shopify.session.shop;
//     if (shop) {
//       const results = await builderApperanceModel.findOneAndUpdate(
//         { shop: shop },
//         {
//           builder_apperance: app_appearance,
//         },
//         {
//           upsert: true, // Make this update into an upsert
//           new: true,
//         }
//       );
//       //   console.log(results)
//       res
//         .status(200)
//         .send({ message: "succcess", data: "Setting saved Successfully " });
//     } else {
//       res.status(200).send({ message: "error", data: "Something Went wrong" });
//     }
//   } catch {
//     console.log("enter in CTACH");
//     res.status(200).send({ message: "error", data: "Something Went wrong" });
//   }
// }

// get all mobile data
export const getMobileData = async (req, res) => {
    try{
      const shop = res.locals.shopify.session.shop
      const { id } = req.params;
      console.log('enter here agregation', shop)
  const data = await  builderDataModel.findOne(
        {  shop: shop , template_id:id },
      )
      console.log(data)
      res.send({status:true, result:data})
    }
    catch(err){
      console.log('enter in catch', err)
      res.send({status:false, result:"Something went wrong"})
    }
} 

//push notification
export const pushNotification = async(req,res)=>{
  console.log("req.body", req.body)
  var notification ={
      'Title' : ' Hey Bro!',
      'Description' : 'How are you?'
  }
  var fcm_tokens = ['AAAAU7QkSdE:APA91bFl6jC1_s4d__KCkMjrLA4Pv8O1JyjkMKnA434QMfA1W4E951khX4n1AUeUEchKarp7uvTJZbCdvLpvdfXLzQRCBE_MggX7fdjo6BGVezflVqg38KUqOkTx5u9ldMF2KWyVgjz7'];
  var notification_body = {
      'notification' : notification,
      'registration_id' : fcm_tokens
  }
  fetch('https://fcm.googleapis.com/fcm/send',{
      'method': 'POST',
      'header': {
          'Authorization':'key='+'AAAAy90r_zo:APA91bGXG7KcSUqPg3ug8tLRBtM9-CeWf_ihOLlEQXYVklppdqk1HWQvbE_QukOLZ8PBVQYde5WgxA93M7LwEsW2U4Y_m8-TlaHPTUzEIWtey2jJZAEtPEMPv4TDEa1Rrdpd1A7bZvvf',
          'Content-Type' : 'application/json'
      },
      'body':JSON.stringify(notification_body)
  }).then((r)=>{
    console.log(r)
      res.send('Notfication sent successfully');
  }).catch((err)=>{
    console.log(err);
      res.send('Something went wrong!');
  })
}

//pulish App
export const publishApp = async(req,res)=>{
  
try{
  const shop = res.locals.shopify.session.shop;
  console.log("req.body", req.body)
  const data = req.body
  publishAppModel.findOneAndUpdate(
            { shop: shop },
            {
              shop: shop,
              appName: data.appName,
              appSubtitle: data.appSubtitle,
              email: data.email,
              companyName: data.companyName,
              supportUrl: data.supportUrl,
              storeUrl: data.storeUrl,
              fullDescription: data.fullDescription,
              shortDescription: data.shortDescription,
              keywords:data.keywords,
              copyright_text: data.copyright_text,
              privacy_policy_url: data.privacy_policy_url,
              developer_account: data.developer_account,
              appstore_email: data.appstore_email,
              playstore_account: data.playstore_account,
              playstore_email: data.playstore_email,
              country_select: data.country_select,
            },
            {
              upsert: true, // Make this update into an upsert
              new: true,
            }
          ).then((data)=>console.log(data))
          .catch((err)=>console.log(err))
}
catch{

}
}


//Save builder Data
export const saveBuilderData = async(req,res)=>{
  // console.log(req.body)
  try {
    const { builderFields, menu, design_name, updateId, app_apperance, app_bar, layoutSelection, side_bar } = req.body;
    console.log("app_apperance ==>", app_apperance)
    const shop = res.locals.shopify.session.shop;
    console.log(req.body);
    const returnData = await builderDataModel.find(
      { store: shop },
      { template_id: 1}
    );
    const uniqueId = createUniqueCode(returnData)
    console.log(uniqueId)
    let findObj = {
      shop: shop, _id:updateId
    }
    if(updateId == ""){
      findObj._id = uniqueId
    }
    console.log(findObj)
    if (shop) {
      const results = await builderDataModel.findOneAndUpdate(
        findObj,
        {
          landing_page: builderFields,
          design_name:design_name,
          template_id:uniqueId,
          profile_page_design:layoutSelection.profile_page_design,
          cart_page_design:layoutSelection.cart_page_design,
          product_detail_page_design:layoutSelection.product_detail_page_design,
          menu_data:menu,
          app_apperance:app_apperance,
          app_bar:app_bar,
          side_bar:side_bar,
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
    console.log("enter in catch", err);
    res.status(200).send({ message: "error", data: "Something Went wrong" });
  }
}

//Get designs builder Data
export const getDesignsList = async(req,res)=>{
  try {
    const shop = res.locals.shopify.session.shop;

    if (shop) {
      const d = getList(shop);
     d.then((data) =>
       res.status(200).send({
         message: "succcess",
         data: data,
       })
     );
    } else {
      res.status(200).send({ message: "error", data: "Something Went wrong" });
    }
  } catch (err) {
    console.log("enter in catch", err.message);
    res.status(200).send({ message: "error", data: "Something Went wrong" });
  }
}

//get All design Names
export const getDesignsNames = async(req,res)=>{
  try{
    const shop = res.locals.shopify.session.shop
    console.log('enter here agregation', shop)
  builderDataModel.find(
      {  shop: shop }, {design_name: 1}
    ).then((data)=>{
      res.send({status:true, result:data})
    })
    // res.send({status:true, result:data})
  }
  catch(err){
    console.log('enter in catch', err)
    res.send({status:false, result:"Something went wrong"})
  }
}


//get builder apperance data
// export const getBuilderApperance = async(req,res)=>{
//   try{
//     const shop = res.locals.shopify.session.shop
//     console.log('enter here apperance data', shop)
//   builderApperanceModel.find(
//       {  shop: shop }, {builder_apperance: 1}
//     ).then((data)=>{
//       res.send({status:true, result:data})
//     })
//     // res.send({status:true, result:data})
//   }
//   catch(err){
//     console.log('enter in catch', err)
//     res.send({status:false, result:"Something went wrong"})
//   }
// }


