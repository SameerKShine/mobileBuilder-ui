import landingPageModel from "../models/landingPageModel.js";
import menuModel from "../models/menuModel.js";

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
