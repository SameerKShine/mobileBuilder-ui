import shopify from "../../../shopify.js";

export async function productDetail(req, res) {
    try {
      console.log("WORKIBG!!");
  
      // const session = res.locals.shopify.session
      // console.log(">>>>>>>", session)
    const client = new shopify.api.clients.Graphql({
      session:{
         shop: 'test-updatedpre.myshopify.com',
       accessToken:'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'}
     });

    const queryString = `{
                product(id: "gid://shopify/Product/6910926749862") {
                title
                description
                onlineStoreUrl
                totalVariants
                variants (first:100){
                    edges{
                    node{
                        id
                        title
                        inventoryQuantity
                        image{
                        url
                        }
                        price
                        sku
                    }
                    }
                }
                }
            }`
  
      const response = await client.query({
        data: queryString,
      });
      console.log("response =====?", response.body.data.product);

      // response.body.data.product.edges.map((products) => {
      //   arr.push({
      //     id: products.node.id,
      //     label: products.node.title,
      //     image: products.node.featuredImage,
      //     amount: products.node.priceRangeV2.minVariantPrice.amount,
      //   currency_code: products.node.priceRangeV2.minVariantPrice.currencyCode,
      //   });
      // });
      res.send({message:"sucess", data:response.body.data.product})
    } catch (err) {
      return res.json({ message: "INTERNAL_SERVER_ERROR", err: err.message });
    }
  }