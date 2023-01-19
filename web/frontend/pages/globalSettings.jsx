import React, {useState} from "react";
import { Collapse } from "antd";
import UploadPicture from "../common/elements/UploadPicture";
import MobileHeader from "../common/builder/MobileHeader";
const { Panel } = Collapse;

function globalSettings() {
  const [global_setting, setGlobalSetting] = useState({
    app_logo :'',
    app_icon:'',
    splash_screen:'',
    app_appearance:{}
  }) 

  const uploadImage = (img) =>{
    setGlobalSetting({ ...global_setting, app_logo:img })
  }

  return (
    <div className="SD-globalSetting">
      <div className="globalSettingSaveBtn">
        <button>Save</button>
      </div>
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="App Logo" key="1">
            <div className="SD-appLogo">
              <UploadPicture onuploadImage = {uploadImage}/>
              <div className="globalSettingIconPrev">
                  <MobileHeader appLogo = {global_setting.app_logo}/>
              </div>
            </div>
          </Panel>
          <Panel header="App Icon" key="2">
          <div className="SD-appLogo">
              <UploadPicture/>
              <div className="globalSettingAppIcon">
                  app icons
              </div>
            </div>
          </Panel>
          <Panel header="Splash Screen" key="3">
          <div className="SD-appLogo">
              <UploadPicture/>
              <div className="globalSettingsplashScreen">
              Splash Screen
              </div>
            </div>
          </Panel>
          <Panel header="App Appearance" key="4">
            <p>App Appearance</p>
          </Panel>
        </Collapse>
    </div>
  );
}

export default globalSettings;
