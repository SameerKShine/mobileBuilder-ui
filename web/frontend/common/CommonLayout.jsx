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
  SettingOutlined,
  // BgColorsOutlined,
  BellOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
  AppstoreOutlined,
  UploadOutlined
} from "@ant-design/icons";
import FullScreenButton from "./elements/FullScreenButton";

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

  // const handleScreenApp = () => {

  // };

  const mainLayout = [
    {
      title: "Dashboard",
      path: "/",
      icon: <AppstoreOutlined  style={{ color: "#ffffff", fontSize: "25px" }} /> ,
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
    {
      title: "Global Settings",
      path: "/globalSettings",
      icon: <SettingOutlined style={{ color: "#ffffff", fontSize: "25px" }} />,
    },
  ];
 
  // const builderLayout = [
  //   {title:"Builder", path:0, icon:<MobileOutlined style={{ color: "#ffffff", fontSize: "25px" }} />},
  //   {title:"App Apperance", path:1, icon:<BgColorsOutlined style={{'color':"#ffffff", fontSize: "25px"}} />},
  //   // {title:"Splash Screen", path:2, icon:<SettingOutlined style={{'color':"#ffffff", fontSize: "25px"}} />},
  // ]
  // console.log(params.pathname)

  const handleCollapse = () => {
    setCollapseBar(!collapseBar)
  }
  return (
    <div>

      <section className="SD-app-layout">
        <nav  style={{'width':collapseBar&&'3%'}}>
        <div className="SD-topbar-logo">
          <img src="https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg" />
          { collapseBar ?<CaretRightOutlined style={{'color':'#ffffff', fontSize:'20px'}} onClick={handleCollapse} />
          :
          <CaretLeftOutlined style={{'color':'#ffffff', fontSize:'20px'}}  onClick={handleCollapse} />}
        </div>
          <ul className="SD-layoutSideBar">
            { 
            mainLayout.map((rout, index) => (
              <li key={index}>
                {/* <Tooltip title={rout.title}> */}
                  <Link
                    className={
                      params.pathname == rout.path 
                        ? "SD-sidebar_active"
                        : "sidebar_no_active"
                    }
                    to={rout.path}
                  >
                    {rout.icon}
                    <p className="sidebar-label">

                    {rout.title}
                    </p>
                  </Link>
                {/* </Tooltip> */}
              </li>
            ))}
          </ul>
        </nav>
        <div className="SD-mainSection">
          <div className="topbar_elements">
          {mainLayout.map((pageName, index)=> params.pathname == pageName.path &&<strong key={index}>{pageName.title}</strong>)}
        <FullScreenButton/>
          </div>
          {/* <Outlet context={[step, sideBar]} /> */}
          <Outlet/>
        </div>
      </section>
    </div>
  );
}

export default Test;
