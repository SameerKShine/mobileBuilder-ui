import axios from "axios";
import { useEffect, useState } from "react"
import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";

export const useApi = (url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const app = useAppBridge();


  const fetchApi = async () => {
    const sessionToken = await getSessionToken(app);
    console.log(sessionToken)
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` }
    };
    axios.post(url, {}, config) // 'https://jsonplaceholder.typicode.com/users'
    .then(json => {
      console.log(json)
      setLoading(false)
      setData(json)
    })
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data }
};
