import React from 'react'
import CommonModal from './modal/CommonModal'
import axios from "axios";
import { errToast, sucessToast } from './notification/notification';
import { useAPI } from '../globalState/getShop';
import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";

function SaveChangesBar({ data, api_url, setShowTopbar }) {
    // const { getShop } = useAPI();
    // const getShop = 'test-updatedpre.myshopify.com'
    // useEffect(()=>{
    //   console.log(checkVal, ' checkVal')
    //   if(checkVal !== builderFields){
    //     setShowBtn(true)
    //   } else{
    //     setShowBtn(false)
    //   }
    // }, [builderFields])
  
    const app = useAppBridge();
    const handleSaveBuilder = async() => {
      const sessionToken = await getSessionToken(app);
       console.log(sessionToken)
   const config = {
     headers: { Authorization: `Bearer ${sessionToken}` }
   };
      const bodyData = {
        data
      };
      console.log(data);
      axios
        .post(`/api/admin${api_url}`, bodyData, config)
        .then((res) => {
          console.log(res);
          if(res.data.message == 'succcess'){
                sucessToast(res.data.data,'top')
              setShowTopbar(false);
          } else{
              errToast(res.data.data, 'top')
          }
        })
        .catch((err) => console.log(err));
    };
    const handleDiscard = () => {
      setShowTopbar(false);
    };
  return (
    <>
      <div className="SD-builderToBar">
        <div className="SD-topbar-logo">
          <img src="https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg" />
        </div>
        <div className="SD-topbar-center">Unsaved changes</div>
        <div className="small-mobile-view top-bar SD-topbar-right">
          <CommonModal
            title={
              <h4 className="modalTitle">
                Are you sure you want Discard Your Changes
              </h4>
            }
            okFunc={handleDiscard}
            button={{ ok: "yes", cancel: "Cancel" }}
            buttonText="Discard"
          />
          <button className="SD-saveButton" onClick={handleSaveBuilder}>
            Save
          </button>
        </div>
      </div>
  </>
  )
}

export default SaveChangesBar