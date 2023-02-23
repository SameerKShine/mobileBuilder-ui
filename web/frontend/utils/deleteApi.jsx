import React from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";


async function deleteApi(url,app) {
    console.log('enter here', url)
  const sessionToken = await getSessionToken(app);
console.log(sessionToken)
  const config = {
    headers: { Authorization: `Bearer ${sessionToken}` },
  };

 return  axios
    .delete(`/api/admin/${url}`, config)
// console.log(response)
//   return newData;
}

export default deleteApi;