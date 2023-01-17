import React from "react";
import axios from "axios";
import { useApi } from "../../hooks";
import { getSessionToken } from "@shopify/app-bridge-utils";
async function commonApi() {
  const { app } = useApi();
  const sessionToken = await getSessionToken(app);
  console.log(sessionToken);
  const config = {
    headers: { Authorization: `Bearer ${sessionToken}` },
  };
  const { loading, data } = apis;
  console.log(data);
  axios
    .post("/api/admin/test", { data: "dfghj" }, config)
    .then(({ data: isData }) => {
      console.log(isData);
    })
    .catch((error) => {
      console.log(error);
    });
  return <div>commonApi</div>;
}

export default commonApi;
