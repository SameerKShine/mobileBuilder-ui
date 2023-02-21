import React, { useState } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";


async function postApi(url, body, app) {
    console.log('enter here in Post function')
  const sessionToken = await getSessionToken(app);

  const config = {
    headers: { Authorization: `Bearer ${sessionToken}` },
  };

 const response = await axios
    .post(url, body, config)
    .then(({ data: isData }) => {
      return isData;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

export default postApi;
