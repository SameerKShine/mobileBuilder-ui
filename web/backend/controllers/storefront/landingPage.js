
import shopify from "../../../shopify.js"
import builderDataModel from "../../models/builderData.js"

export const  landingPage = async (req, res) =>{
        console.log("Enter in store fron api")
          builderDataModel.findOne(
            { shop: "sameertestnode.myshopify.com", publish : true }
          ).then((data)=>{
              res.send({status:true, response: data, message:"Data Sucessfully Send"})
          })
          .catch((err)=>res.send({status:false, response: "Somthing went wrong"}))
} 

//create Customer
export const  createCustomer = async (req, res) =>{
        // console.log("Enter in store fron api MUTATION" , shopify.api.clients)
        // console.log(res.locals.shopify.session)
        const session = res.locals.shopify.session
        const client =  new shopify.api.clients.Graphql({ 
          session
         });
        //  console.log("client ==>", client)
        const input = {
            "email": "akshay.sharma@shinedezign.com",
             "password": "123456"
        }
//  const queryString =  `mutation {
//   customerCreate(input: { email: "kawaljeet.singh@shinedezign.com",  firstName: "Kawal", lastName: "Singh"}) {
//       customer {
//           id
//       }
//   }
// }` 
//   const response = await client.query({
//     data: queryString,
    
//   });
//     console.log(response.body.data)



 const qurey =  `mutation  {
              customerAccessTokenCreate(input: { email: "kawaljeet.singh@shinedezign.com",  firstName: "Kawal", lastName: "Singh"}) {
      customerUserErrors {
      code
     field
    message
     }
    customerAccessToken {
     accessToken
     expiresAt
     }
     }
      }`

        const response = await client.query({
     data: qurey,
    
   });
   console.log(response.body.data)
} 

