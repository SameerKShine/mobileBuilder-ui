import shopify from "../../shopify.js";

export async function getProducts(req, res) {
    try {
      console.log("WORKIBG!!");
      const session = res.locals.shopify.session
    const client = new shopify.api.clients.Graphql({ session });
      let newPageCursor = req.body.cursor;
      let titleName = req.body.search;
      let hasNextPage = req.body.nextPage;
      let queryField;
      if (!titleName && newPageCursor.length == 0 && hasNextPage.length == 0) {
        queryField = "first:15";
        // console.log("1", queryField);
      } else if (!titleName && newPageCursor.length) {
        queryField = 'first: 15, after : "' + newPageCursor + '"';
        // console.log("2", queryField);
      } else if (newPageCursor.length > 1) {
        queryField =
          'first: 15, query:  "*' +
          titleName +
          '*", after : "' +
          newPageCursor +
          '"';
        // console.log("3", queryField);
      } else {
        queryField = 'first: 15, query:  "*' + titleName + '*"';
        // console.log("4", queryField);
      }
  
      const queryString = `{
        products(${queryField}) {
          edges {
            cursor
            node {
              tags
              title
              id
              priceRangeV2 {
                minVariantPrice{
                  currencyCode
                  amount
                }
              }
              featuredImage{
                url
              }
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }`;
  
      const response = await client.query({
        data: queryString,
      });
      // console.log(response);
      let productItems = response.body.data.products;
      let cursorVal = productItems.edges.slice(-1);
      let nextCursor = cursorVal.map((i) => i.cursor);
      let nextPage = response.body.data.products.pageInfo.hasNextPage;
  
      if (!response.body.data.products.edges[0]) {
        return res.json({ message: "data not found", response: [] });
      }
  
      if (hasNextPage === false) {
        return res.json({
          nextPageCursor: ["no cursor"],
          response: ["no more Collections"],
          hasNextPage: nextPage,
        });
      } else {
        const arr = [];
        response.body.data.products.edges.map((products) => {
          arr.push({
            id: products.node.id,
            label: products.node.title,
            image: products.node.featuredImage,
            amount: products.node.priceRangeV2.minVariantPrice.amount,
          currency_code: products.node.priceRangeV2.minVariantPrice.currencyCode,
          });
        });
  
        return res.json({
          nextPageCursor: nextCursor,
          response: arr,
          hasNextPage: nextPage,
        });
      }
    } catch (err) {
      return res.json({ message: "INTERNAL_SERVER_ERROR", err: err.message });
    }
  }

  //collections
  export async function getCollection(req, res) {
    console.log("enter in function");
    try {
      const session = res.locals.shopify.session
    const client = new shopify.api.clients.Graphql({ session });
      let titleName = req.body.search;
      let newPageCursor = req.body.cursor;
      let hasNextPage = req.body.nextPage;
  
      let queryField;
  
      if (titleName) {
        queryField = 'first: 15, query:  "*' + titleName + '*"';
        // console.log(queryField);
      } else {
        queryField = "first:15";
        // console.log("no search", queryField);
      }
  
      // queryField = 'first: 15, query:  "*' + titleName + '*", after : "' + newPageCursor + '"';
  
      const queryString = `{
        collections(${queryField}) {
          edges {
            cursor
            node {
              title
              id
              image {
                id
                url
              }
            }
          }
          pageInfo {
             hasNextPage
          }
        }
      }`;
  
      const response = await client.query({
        data: queryString,
      });
  
      // console.log(response.body.data.collections.edges);
      let collectionItems = response.body.data.collections;
      let cursorVal = collectionItems.edges.slice(-1);
      let nextCursor = cursorVal.map((i) => i.cursor);
      let nextPage = collectionItems.pageInfo.hasNextPage;
  
      if (!collectionItems.edges[0]) {
        return res.json({
          message: "Data not found !!",
          response: [],
        });
      }
      if (newPageCursor == "" || hasNextPage === true) {
        // console.log("=-=-=-=--=-=-=-");
        // console.log(collectionItems);
        const arr = [];
        collectionItems.edges.map((item) => {
          arr.push({
            id: item.node.id,
            label: item.node.title,
            image: item.node.image,
          });
        });
        return res.json({
          nextPageCursor: nextCursor,
          response: arr,
          hasNextPage: nextPage,
        });
      }
    } catch (err) {
      return res.json({ message: "INTERNAL_SERVER_ERROR", err: err.message });
    }
  }

  // products of collection
  export async function getProductsOfCollection(req, res) {
    try {
      console.log(req.body);
      const session = res.locals.shopify.session
      const client = new shopify.api.clients.Graphql({ session });
  
      // console.log(req.body.id);
      const queryString = `query node {
        node(id:"${req.body.id}") {
          ... on Collection {
            id
            products(first: 10) {
              edges {
                node {
                  title
                  id
                  description
                  priceRangeV2 {
                    minVariantPrice {
                      currencyCode
                      amount
                    }
                  }
                  featuredImage {
                    url
                  }
                }
              }
              pageInfo {
                hasNextPage
              }    
            }
          }
        }
      }`;
  
      const response = await client.query({
        data: queryString,
      });
      const products = response.body.data.node.products.edges;
      const arr = [];
      products.map((products) => {
        arr.push({
          id: products.node.id,
          label: products.node.title,
          image: products.node.featuredImage,
          amount: products.node.priceRangeV2.minVariantPrice.amount,
          currency_code: products.node.priceRangeV2.minVariantPrice.currencyCode,
        });
      });
  
      res.json({
        response: arr,
      });
    } catch (err) {
      return res.json({ message: "INTERNAL_SERVER_ERROR", err: err.message });
    }
  }