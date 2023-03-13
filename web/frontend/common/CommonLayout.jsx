import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import {
//   ExitMajor
// } from '@shopify/polaris-icons';

// import { useAppBridge } from "@shopify/app-bridge-react";
// import DashboardIcon from "../assets/images/layout/dashboard.svg";
// import ExitIcon from "../assets/images/layout/exit.svg";
// import { Fullscreen } from "@shopify/app-bridge/actions";
// import { Tooltip } from "antd";
import {
  // FullscreenOutlined,
  // FullscreenExitOutlined,
  SelectOutlined,
  // BgColorsOutlined,
  BellOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
  AppstoreOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FullScreenButton from "./elements/FullScreenButton";
import { Tooltip } from "antd";

function Test() {
  const [collapseBar, setCollapseBar] = useState(false);
  // const [sideBar, setSideBar] = useState(0);
  // const [showScreen, setFullScreen] = useState(false);
  // const app = useAppBridge();
  const params = useLocation();
  // const navigate = useNavigate();
  // const handlePage = useCallback((e) => {
  //   setStep(e);
  //   setSideBar(0)
  // }, []);


  const mainLayout = [
    {
      title: "Dashboard",
      path: "/",
      icon: <AppstoreOutlined style={{ color: "#ffffff", fontSize: "25px" }} />,
    },
    {
      title: "Push Notification",
      path: "/push-notification",
      icon: <BellOutlined style={{ color: "#ffffff", fontSize: "25px" }} />,
    },
    {
      title: "Publish App",
      path: "/publish-app",
      icon: <UploadOutlined style={{ color: "#ffffff", fontSize: "25px" }} />,
    },
    // {
    //   title: "Customer List",
    //   path: "/customer-list",
    //   icon: <SettingOutlined style={{ color: "#ffffff", fontSize: "25px" }} />,
    // },
    // {
    //   title: "Global Settings",
    //   path: "/globalSettings",
    //   icon: <SettingOutlined style={{ color: "#ffffff", fontSize: "25px" }} />,
    // },
  ];

  // const builderLayout = [
  //   {title:"Builder", path:0, icon:<MobileOutlined style={{ color: "#ffffff", fontSize: "25px" }} />},
  //   {title:"App Apperance", path:1, icon:<BgColorsOutlined style={{'color':"#ffffff", fontSize: "25px"}} />},
  //   // {title:"Splash Screen", path:2, icon:<SettingOutlined style={{'color':"#ffffff", fontSize: "25px"}} />},
  // ]
  // console.log(params.pathname)

  const handleCollapse = () => {
    setCollapseBar(!collapseBar);
  };
  return (
    <div>
      <section className="SD-app-layout">
        <nav className={collapseBar ? "collapsedBar": "nonCollapsedBar"} style={{ width: collapseBar && "4%" }}>
          <div className="SD-topbar-logo">
            {collapseBar ?
            <img src="assets/images/logo/shopifylogo.png" width="30px" />
            : (
              <img src="https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg" />
            )}
            {collapseBar ? (
              <Tooltip title="Expand Sidebar">
              <DoubleRightOutlined
                style={{ color: "#ffffff", fontSize: "20px" }}
                onClick={handleCollapse}
              />
              </Tooltip>
            ) : (
              <DoubleLeftOutlined
                style={{ color: "#ffffff", fontSize: "20px" }}
                onClick={handleCollapse}
              />
            )}
          </div>
          <ul className="SD-layoutSideBar">
            {mainLayout.map((rout, index) => (
              <li key={index}>
                
                <Link
                  className={
                    params.pathname == rout.path
                      ? "SD-sidebar_active"
                      : "sidebar_no_active"
                  }
                  to={rout.path}
                >
                  <Tooltip  title={collapseBar&&rout.title}>

                  {rout.icon}
                  </Tooltip>
                 {!collapseBar&& <p className="sidebar-label">{rout.title}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="SD-mainSection">
          <div className="topbar_elements">
            {mainLayout.map(
              (pageName, index) =>
                params.pathname == pageName.path && (
                  <div key={index} className="topbarTitle">
                  <strong>{pageName.title}</strong>   
                  {/* <a>Know More about {pageName.title}</a>  */}
                  </div>
                )
            )}
            <div className="knowMoreLink">
            <a>Know More about </a>
            <FullScreenButton />
            </div>
            
          </div>
          {/* <Outlet context={[step, sideBar]} /> */}
          <Outlet />
        </div>
      </section>
    </div>
  );
}

export default Test;
