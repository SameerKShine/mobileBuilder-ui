import React from "react";
import CommonModal from "../modal/CommonModal";
import { CommonInput } from "../elements/commonElements";
import { Icon } from "@shopify/polaris";
import { ExitMajor } from "@shopify/polaris-icons";
import FullScreenButton from "../elements/FullScreenButton";
import { Tooltip } from "antd";
import {
  BgColorsOutlined,
  MobileOutlined,
} from "@ant-design/icons";

function SaveBar({
  handleSave,
  flag,
  errorName,
  handleEditTitle,
  design_name,
  children,
  // step,
  sideBar,
  setSideBar,
  handleExit,
}) {

  const builderLayout = [
    {title:"Builder", path:0, icon:<MobileOutlined style={{ color: "#ffffff", fontSize: "25px" }} />},
    {title:"App Apperance", path:1, icon:<BgColorsOutlined style={{'color':"#ffffff", fontSize: "25px"}} />},
    // {title:"Splash Screen", path:2, icon:<SettingOutlined style={{'color':"#ffffff", fontSize: "25px"}} />},
  ]
  return (
    <>
      <div
        className={
          flag == "builder"
            ? "SD-builderToBar"
            : "SD-builderToBar SD-builderToBarCondition"
        }
      >
        <div className="SD-topbar-logo">
          {/* <img src="https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg" /> */}
          <div onClick={handleExit} className="exitButton">
            <Icon source={ExitMajor} color="base" />
            <span className="exitSpan">Exit</span>
          </div>
        </div>

        <div>
          <CommonInput
            onChange={handleEditTitle}
            value={design_name}
            input={{
              placeholder: "Enter Template Title",
              name: "builder_title",
            }}
          />
          <span style={{ color: "#ffffff" }}>{errorName}</span>
        </div>
        {/* <div className="SD-topbar-center">
          <div className="topbar_elements topbar_select">
            <select value={step} onChange={(e) => handlePage(e.target.value)}>
              <option value={0}>Landing Page</option>
              <option value={1}>Bottom Bar</option>
              <option value={2}>App Bar</option>
              <option value={6}>Side Bar</option>
              <option value={3}>Profile Page</option>
              <option value={4}>Cart Page</option>
              <option value={5}>Product Detail Page</option>
            </select>
          </div>
        </div> */}
        <div className="small-mobile-view top-bar SD-topbar-right">
          <button
            className={`SD-saveButton ${
              design_name.length < 1 || errorName.length > 0
                ? " disableBtnClr"
                : ""
            }`}
            disabled={
              design_name.length < 1 || errorName.length > 0 ? true : false
            }
            onClick={handleSave}
          >
            Save
          </button>

          <FullScreenButton />
        </div>
      </div>
      <div className="builderLayout" style={{'display':'flex'}}>
        <nav className="builderSidebar">
          <ul className="SD-layoutSideBar">
          {builderLayout.map((rout, index)=> <li key={index} onClick={()=>setSideBar(rout.path)}  className={
              rout.path == sideBar
                ? "SD-sidebar_active"
                : "sidebar_no_active"
            }>
              <Tooltip title={rout.title}>
                {rout.icon}
              </Tooltip>
            </li>)  }
          </ul>
        </nav>
        {children}
        </div>
    </>
  );
}

export default SaveBar;
