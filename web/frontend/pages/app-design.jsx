import React, {useState, useEffect} from 'react'
import { BgColorsOutlined } from "@ant-design/icons";
import { usePrevious, useApi } from "../hooks";
import {
    Color_field,
    CommonSelect,
    Slider_field,
  } from "../common/elements/commonElements";
  import SaveChangesBar from "../common/SaveChangesBar";
import PreviewCard from "../common/builder/PreviewCard";
import { Spin } from 'antd';
import { FieldsPreview } from '../common/builder/FieldsPreview';
import UploadPicture from '../common/elements/UploadPicture';
import { useAPI } from '../globalState/getShop';
import getApi from '../utils/getApi';


function app_design() {
    const [app_appearance, setapp_appearance] = useState({
        primary_color: "",
        secondary_color: "",
        background_color:"",
        font_family :"",
        font_size:""
      });
      const [mobileData, setMobileData] = useState([])
    const [showTopBar, setShowtopbar] = useState(false);
    const [loading, setLoading] = useState(false)

    const checkVal = usePrevious(app_appearance);
    useEffect(() => {
      console.log("MENU USE EFFECT");
      if (checkVal !== undefined) {
        if (checkVal !== app_appearance) {
          console.log("enter in if condition");
          console.log("checkVal  ==>", checkVal);
          setShowtopbar(true);
        } else {
          console.log("enter in ELSE condition");
          console.log("checkVal  ==>", checkVal);
          //  setShowBtn(false)
        }
      }
    }, [app_appearance]);

    const apperance = [
        { label: "Primary Color", name: "primary_color" },
        { label: "Secondary Color", name: "secondary_color" },
        { label: "Background Color", name: "background_color" },
      ];
    
      const fontFamilyOptions = [
        { label: "Font Family 1", value: "font_family_1" },
        { label: "Font Family 2", value: "font_family_2" },
        { label: "Font Family 3", value: "font_family_3" },
      ];
      const handleEditGlobalSetting = (e) => {
          const {name, value} = e.target
          console.log(name)
          console.log(value)
        setapp_appearance({...app_appearance, [name]: value})
      };

      const uploadImage =(img, name) =>{
        setapp_appearance({ ...app_appearance, [name]: img });
      }

// const {data, loading} = useApi("/api/admin/getMobileData")
// if(!loading){
//   if(data){
//     console.log(data)
//   }
// }
const {app} =useAPI()
  useEffect(()=>{
    setLoading(true)
    getApi("/api/admin/getMobileData", app)
    .then((res)=>{
      console.log("res", res)
      setMobileData(res.result.landing_page)
      setapp_appearance(res.result.builderApperanceData.builder_apperance)
      setLoading(false)
    })
  },[])
  return (
    <>
          {showTopBar && (
        <SaveChangesBar
          api_url="/builderApperance"
          setShowTopbar={setShowtopbar}
          data={app_appearance}
        />
      )}
      <div className="SD-globalSetting">
        <div className="rightSidebar open-right-sidebar globalSettingLeftSection">
          <div>
            <h2 className="SD-section-heading">
              {" "}
              <BgColorsOutlined /> App Apperance
            </h2>
            <UploadPicture label="App Logo" onuploadImage={uploadImage} name="app_logo"/>
            {apperance.map((inp, index) => (
              <div key={index}>
                <Color_field
                  label={inp.label}
                  value={app_appearance[inp.name]}
                  name={inp.name}
                  onChange={handleEditGlobalSetting}
                />
              </div>
            ))}
            <CommonSelect
              label="Font Family"
              name="font_family"
              value={app_appearance.font_family}
              option={fontFamilyOptions}
              onChange={handleEditGlobalSetting}
            />
          </div>
        </div>
            {/* <Spin spinning={loading}> */}
        <div className="appApperancePrev">

         <PreviewCard className="builderApperancePrev" mainClass = "mainClassApperancePrev"  data="globalSetting" bgColor={app_appearance.background_color}>
         <Spin spinning={loading}>
         {mobileData?.map((eleType, index) => {
            return <div key={index}>{FieldsPreview(eleType, index, app_appearance)}</div>;
          })}
         </Spin>
        </PreviewCard> 
          
        </div>
            {/* </Spin> */}
      </div>
    </>
  )
}

export default app_design