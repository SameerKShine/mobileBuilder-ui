import landingPageModel from "../models/landingPageModel.js";
import menuModel from "../models/menuModel.js";

export const saveLandingPageData = async (req, res) => {
    try{
        const {data, shop} = req.body
        console.log(req.body)
        const results = await landingPageModel.findOneAndUpdate(
            { shop: shop },
            {
              landing_page: data,
            },
            {
              upsert: true, // Make this update into an upsert
              new : true
            }
          );
        //   console.log(results)
          res.status(200).send({ message: "succcess", data: "Landing page data saved Successfully " });
    }
    catch(err){
console.log('enter in catch', err.message)
res.status(200).send({ message: "error", data: "Something Went wrong" });
    }
}

export const saveMenuData = async (req, res) =>{
        try{
          const {data, shop} = req.body
          const results = await menuModel.findOneAndUpdate(
            { shop: shop },
            {
              menu_data: data,
            },
            {
              upsert: true, // Make this update into an upsert
              new : true
            }
          );
        //   console.log(results)
          res.status(200).send({ message: "succcess", data: "Menu data saved Successfully " });
        }
        catch{
            console.log('enter in CTACH')
            res.status(200).send({ message: "error", data: "Something Went wrong" });
        }
}