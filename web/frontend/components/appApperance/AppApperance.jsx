import React, { useState, useEffect } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { usePrevious, useApi } from "../../hooks";
import { Color_field, CommonSelect } from "../../common/elements/commonElements";
import PreviewCard from "../../common/builder/PreviewCard";
import { Spin } from "antd";
import { FieldsPreview } from "../../common/builder/FieldsPreview";
import UploadPicture from "../../common/elements/UploadPicture";
import { useAPI } from "../../globalState/getShop";
import DUMMY_DATA from "../../templateData.json";

function AppApperance({app_appearance, setapp_appearance, app_bar}) {

  const [mobileData, setMobileData] = useState([]);
  const [showTopBar, setShowtopbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dummyLogo, setDummyImg] = useState("");

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
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setapp_appearance({ ...app_appearance, [name]: value });
  };

  const uploadImage = (img, name, prevImg) => {
    setapp_appearance({ ...app_appearance, [name]: img });
    setDummyImg(prevImg)
  };

  const {loader, data} = useApi("/getBuilderApperance")
  console.log("loader", loader)

  const { app } = useAPI();
  useEffect(() => {
    // console.log(DUMMY_DATA.template_1);
    setMobileData(DUMMY_DATA.template_1.landing_page);
 
  }, []);
  // console.log("showTopBar ", app_appearance);
  return (
    <>
      {/* <SaveChangesBar  api_url="/builderApperance" data={{ app_appearance }} flag="app_design" /> */}
      <div className="SD-globalSetting">
        <div className="rightSidebar open-right-sidebar globalSettingLeftSection">
          <div>
            <h2 className="SD-section-heading">
              {" "}
              <SettingOutlined /> App Setting
            </h2>
            <UploadPicture
              label="Splash Screen"
              onuploadImage={uploadImage}
              name="splash_screen"
            />
            {apperance.map((inp, index) => (
              <div key={index}>
                <Color_field
                  label={inp.label}
                  value={app_appearance[inp?.name]}
                  name={inp.name}
                  onChange={handleEditGlobalSetting}
                />
              </div>
            ))}
            <CommonSelect
              label="Font Family"
              name="font_family"
              value={app_appearance?.font_family}
              option={fontFamilyOptions}
              onChange={handleEditGlobalSetting}
            />
          </div>
        </div>
        {/* <Spin spinning={loading}> */}
        <div className="appApperancePrev">
          <PreviewCard
            className="builderApperancePrev"
            mainClass="mainClassApperancePrev"
            logo={dummyLogo}
            app_bar={app_bar}
            data="globalSetting"
            bgColor={app_appearance.background_color}
          >
            <Spin spinning={loading}>
              {mobileData?.map((eleType, index) => {
                return (
                  <div key={index}>
                    {FieldsPreview(eleType, index, app_appearance)}
                  </div>
                );
              })}
            </Spin>
          </PreviewCard>
        </div>
        {/* </Spin> */}
      </div>
    </>
  );
}

export default AppApperance;
