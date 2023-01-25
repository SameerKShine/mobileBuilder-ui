import React, { useState, useEffect } from "react";
import UploadPicture from "../common/elements/UploadPicture";
import MobileHeader from "../common/builder/MobileHeader";
import SaveChangesBar from "../common/SaveChangesBar";
import PreviewCard from "../common/builder/PreviewCard";
import { SettingOutlined } from "@ant-design/icons";
import { usePrevious } from "../hooks";
import { CommonInput } from "../common/elements/commonElements";

function globalSettings() {
  const [global_setting, setGlobalSetting] = useState({
    app_icon: "",
    splash_screen: "",
    app_name:""
  });
  const [showTopBar, setShowtopbar] = useState(false);

  const checkVal = usePrevious(global_setting);
  useEffect(() => {
    console.log("MENU USE EFFECT");
    if (checkVal !== undefined) {
      if (checkVal !== global_setting) {
        console.log("enter in if condition");
        console.log("checkVal  ==>", checkVal);
        setShowtopbar(true);
      } else {
        console.log("enter in ELSE condition");
        console.log("checkVal  ==>", checkVal);
        //  setShowBtn(false)
      }
    }
  }, [global_setting]);

  const uploadImage = (img, name) => {
    setGlobalSetting({ ...global_setting, [name]: img });
  };
 
  const options = [
    { label: "App Icon", name: "app_icon" },
    { label: "Splash Screen", name: "splash_screen" },
  ];

  return (
    <>
      {showTopBar && (
        <SaveChangesBar
          api_url="/globalSetting"
          setShowTopbar={setShowtopbar}
          data={global_setting}
        />
      )}
      <div className="SD-globalSetting">
        <div className="rightSidebar open-right-sidebar globalSettingLeftSection">
          <h2 className="SD-section-heading">
            {" "}
            <SettingOutlined /> Settings
          </h2>
          <ul>
            {options.map((el, index) => (
              <li key={index}>
                <div className="globalSettingEle">
                  <h2>{el.label}</h2>
                  <UploadPicture onuploadImage={uploadImage} name={el.name} />
                </div>
              </li>
            ))}
          </ul>
          <CommonInput
            label="App Name"
            onChange = {()=>{}}
            value=""
            input={{
              name:"app_name",
              type:"text"
           } }
          />
        </div>
        <div className="globalSettingPrev">
          <PreviewCard
            className="globalSettingView"
            data="globalSetting_hideHeader"
          ></PreviewCard>
          <PreviewCard className="globalSettingView"  data="globalSetting_hideHeader">
          
        </PreviewCard>
        </div>
      </div>
    </>
  );
}

export default globalSettings;
