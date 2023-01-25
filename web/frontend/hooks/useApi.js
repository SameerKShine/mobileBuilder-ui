import axios from "axios";
import { useEffect, useState } from "react"
// import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAPI } from "../globalState/getShop";

export const useApi = (url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const {app} = useAPI();


  const fetchApi = async () => {
    const sessionToken = await getSessionToken(app);
    console.log("sessionToken")
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    axios.get(url, {headers: { Authorization: `Bearer ${sessionToken}` }}) // 'https://jsonplaceholder.typicode.com/users'
    .then(json => {
      console.log(json)
      setLoading(false)
      setData(json.data.result)
    })
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data }
};
