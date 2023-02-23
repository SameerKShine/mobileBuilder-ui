import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  ExitMajor
} from '@shopify/polaris-icons';

// import { useAppBridge } from "@shopify/app-bridge-react";
import DashboardIcon from "../assets/images/layout/dashboard.svg";
import ExitIcon from "../assets/images/layout/exit.svg";
// import { Fullscreen } from "@shopify/app-bridge/actions";
import { Tooltip } from "antd";
import {
  // FullscreenOutlined,
  // FullscreenExitOutlined,
  SettingOutlined,
  BgColorsOutlined,
  BellOutlined,
  MobileOutlined,
  AppstoreOutlined,
  UploadOutlined
} from "@ant-design/icons";
import FullScreenButton from "./elements/FullScreenButton";

function Test() {
  const [step, setStep] = useState(0);
  const [sideBar, setSideBar] = useState(0);
  // const [showScreen, setFullScreen] = useState(false);
  // const app = useAppBridge();
  const params = useLocation();
  // const navigate = useNavigate();
  // const handlePage = useCallback((e) => {
  //   setStep(e);
  //   setSideBar(0)
  // }, []);
  // useEffect(() => {
  //   const fullPage = sessionStorage.getItem("full_screen");
  //   if (fullPage == "enter") {
  //     const fullscreen = Fullscreen.create(app);
  //     fullscreen.dispatch(Fullscreen.Action.ENTER);
  //     setFullScreen(true);
  //   }
  // }, []);
  // const handleScreenApp = () => {
  //   const fullPage = sessionStorage.getItem("full_screen");
  //   const fullscreen = Fullscreen.create(app);
  //   if (fullPage == "enter") {
  //     sessionStorage.setItem("full_screen", "exit");
  //     fullscreen.dispatch(Fullscreen.Action.EXIT);
  //     setFullScreen(false);
  //   } else {
  //     sessionStorage.setItem("full_screen", "enter");
  //     fullscreen.dispatch(Fullscreen.Action.ENTER);
  //     setFullScreen(true);
  //   }
  // };

  const mainLayout = [
    {
      title: "Builder",
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
  return (
    <div>
 
      {/* <div className="SD-TopBar"> */}
        {/* {params.pathname.includes("/builder")
        &&
          <div onClick={()=>{
            navigate("/")
            setStep(0)
            setSideBar(0)
          }}>
      <Icon
        source={ExitMajor}
        color="base"
      />
        </div>
} */}
        {/* <div className="topbar_elements topbar_select">
          {params.pathname.includes("/builder") && (
            <select value={step} onChange={(e)=>handlePage(e.target.value)}>
              <option value={0}>Landing Page</option>
              <option value={1}>Bottom Bar</option>
              <option value={2}>App Bar</option>
              <option value={6}>Side Bar</option>
              <option value={3}>Profile Page</option>
              <option value={4}>Cart Page</option>
              <option value={5}>Product Detail Page</option>
            </select>
          )}
        </div> */}
        {/* <div className="topbar_elements fullScreen_button">
          <Button
            icon={
              showScreen ? (
                <FullscreenExitOutlined width="2rem" />
              ) : (
                <FullscreenOutlined />
              )
            }
            onClick={handleScreenApp}
          >
            {showScreen ? "Exit full screen" : "Enter to full screen"}
          </Button>
        </div> */}
        {/* <FullScreenButton/> */}
      {/* </div> */}
      <section className="SD-app-layout">
        <nav>
          <ul className="SD-layoutSideBar">
            { 
            // params.pathname.includes("/builder")?
            //  builderLayout.map((rout, index)=> <li key={index} onClick={()=>setSideBar(rout.path)}  className={
            //   rout.path == sideBar 
            //     ? "SD-sidebar_active"
            //     : "sidebar_no_active"
            // }>
            //   <Tooltip title={rout.title}>
            //     {rout.icon}
            //   </Tooltip>
            // </li>)
            // :
            mainLayout.map((rout, index) => (
              <li key={index}>
                <Tooltip title={rout.title}>
                  <Link
                    className={
                      params.pathname == rout.path 
                        ? "SD-sidebar_active"
                        : "sidebar_no_active"
                    }
                    to={rout.path}
                  >
                    {rout.icon}
                    <span>

                    {rout.title}
                    </span>
                  </Link>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
        <div className="SD-mainSection">
        <FullScreenButton/>
          <Outlet context={[step, sideBar]} />
        </div>
      </section>
    </div>
  );
}

export default Test;
