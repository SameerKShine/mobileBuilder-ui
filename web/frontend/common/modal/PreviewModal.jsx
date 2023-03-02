import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import getApi from '../../utils/getApi';
import { useAPI } from '../../globalState/getShop';
import PreviewCard from '../builder/PreviewCard';
import { FieldsPreview } from '../builder/FieldsPreview';

function PreviewModal({id, page, setIsModalOpen, isModalOpen}) {

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [prevData, setPrevData] = useState({})
    // const [builderFields, setBuilderFields] = useState("")
    // const [menu, setMenu] = useState("")
    // const [app_apperance, setApp_apperance] = useState("")
    // const [app_bar, setAppBar] = useState("")
    // const [layoutSelection, setLayoutSelect] = useState("")
    // const [sideBar_data, setSidebar] = useState("")
const {app} = useAPI()
    useEffect(()=>{
       
        if(page == "index"){
            console.log('enter in preview')
            console.log(id)
            getApi(`/api/admin/getMobileData/${id}`, app)
            .then((res) => {
              console.log("res", res.result);
              setPrevData(res.result)
              setLoading(false)
            //   setBuilderFields(res.result.landing_page);
            //   setMenu(res.result.menu_data);
            //   setUpDateId(res.result._id);
            //   setApp_apperance(res.result.app_apperance);
            //   setAppBar(res.result.app_bar);
            //   setLayoutSelect({
            //     cart_page_design : res.result.cart_page_design,
            //     product_detail_page_design : res.result.product_detail_page_design,
            //     profile_page_design : res.result.profile_page_design,
            //   })
            //   setLoading(false);
            })
            .catch((err) => {
              // console.log("ENTER IN ERRORRRRRRRRRRRRR", err)
              setLoading(false);
            });
        }
    },[])

    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
// console.log(data)
  return (
    <>
    {/* <Button type="primary" onClick={showModal}>
      Open Modal
    </Button> */}
    {/* <EyeOutlined  onClick={showModal} /> */}
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     {
         loading ? "Lodaing..."
         :
         <PreviewCard data = "globalSetting_hideHeader" bar_color = "#ffffff">
             {prevData.landing_page.map((eleType, index) => {
            return <div key={index}>{FieldsPreview(eleType, index, prevData.app_apperance)}</div>;
          })}
         </PreviewCard>
     }
    </Modal>
  </>
  )
}

export default PreviewModal