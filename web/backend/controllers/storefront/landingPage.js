import landingPageModel from "../../models/landingPageModel.js"

export const  landingPage = async (req, res) =>{
        console.log("Enter in store fron api")
          landingPageModel.findOne(
            { shop: "test-updatedpre.myshopify.com" }
          ).then((data)=>{
              res.send({status:true, response: data, message:"Data Sucessfully Send"})
          })
          .catch((err)=>res.send({status:false, response: "Somthing went wrong"}))
} 