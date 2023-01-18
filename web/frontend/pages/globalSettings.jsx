import React, {useState} from "react";
import { Collapse } from "antd";
import UploadPicture from "../common/elements/UploadPicture";
import MobileHeader from "../common/builder/MobileHeader";
const { Panel } = Collapse;

function globalSettings() {

  return (
    <div className="SD-globalSetting">
      <div className="globalSettingSaveBtn">
        <button>Save</button>
      </div>
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="App Logo" key="1">
            <div className="SD-appLogo">
              <UploadPicture/>
              <div className="globalSettingIconPrev">
                  <MobileHeader/>
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
          {/* <Panel header="This is panel header 3" key="3">
      <p></p>
    </Panel> */}
        </Collapse>
    </div>
  );
}

export default globalSettings;
