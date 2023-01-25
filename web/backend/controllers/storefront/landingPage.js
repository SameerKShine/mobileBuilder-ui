import landingPageModel from "../../models/landingPageModel.js"

export const  landingPage = async (req, res) =>{
        console.log("Enter in store fron api")
          landingPageModel.findOne(
            { shop: "sameertestnode.myshopify.com" }
          ).then((data)=>{
              res.send({status:true, response: data, message:"Data Sucessfully Send"})
          })
          .catch((err)=>res.send({status:false, response: "Somthing went wrong"}))
} 