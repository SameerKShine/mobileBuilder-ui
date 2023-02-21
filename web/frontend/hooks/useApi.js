import axios from "axios";
import { useEffect, useState } from "react"
// import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAPI } from "../globalState/getShop";

export const useApi = (url) => {
  const [loader, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const {app} = useAPI();


  const fetchApi = async () => {
    console.log("Get hook action")
    const sessionToken = await getSessionToken(app);
    console.log("sessionToken")
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    axios.get(`/api/admin${url}`, {headers: { Authorization: `Bearer ${sessionToken}` }}) // 'https://jsonplaceholder.typicode.com/users'
    .then(json => {
      console.log(json)
      setData(json.data.result)
      setLoading(false)
    })
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loader, data }
};
