import React, { useState } from "react";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";


async function getApi(url, app) {
    console.log('enter here')
  const sessionToken = await getSessionToken(app);

  const config = {
    headers: { Authorization: `Bearer ${sessionToken}` },
  };

 const response = await axios
    .get(url, config)
    .then(({ data: isData }) => {
      return isData;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
}

export default getApi;