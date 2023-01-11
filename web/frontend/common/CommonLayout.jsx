import React, { useState, useCallback, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
// import Icon
import { Redirect } from "@shopify/app-bridge/actions";
import { useAppBridge } from "@shopify/app-bridge-react";
import DashboardIcon from "../assets/images/layout/dashboard.svg";
import ExitIcon from "../assets/images/layout/exit.svg";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { Button, Tooltip } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";

function Test() {
  const [step, setStep] = useState(0);
  const [showScreen, setFullScreen] = useState(false);

  const params = useLocation();
  const handlePage = useCallback((e) => {
    setStep(e.target.value);
  }, []);

  //full screen
  const handleScreenApp = useCallback(() => {
    const fullscreen = Fullscreen.create(app);
    setFullScreen(!showScreen);
    localStorage.setItem("fullScreen_show", true);
    if (showScreen === false) {
      console.log("enter in if");
      return fullscreen.dispatch(Fullscreen.Action.ENTER);
    } else if (showScreen === true) {
    return  fullscreen.dispatch(Fullscreen.Action.EXIT);
    }
  }, [showScreen]);

  const app = useAppBridge();
  // useEffect(()=>{
  //   console.log(showScreen)
  //   const fullscreen = Fullscreen.create(app);

  // },[showScreen])

  return (
    <div>
      <div className="SD-TopBar">
        <div className="topbar_elements topbar_select">
          {params.pathname == "/" && (
            <select value={step} onChange={handlePage}>
              <option value={0}>Landing Page</option>
              <option value={1}>Menu</option>
            </select>
          )}
        </div>
        <div className=" topbar_elements fullScreen_button">
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
          {/* <div onClick={handleScreenApp}>
          {showScreen ? (
               <Tooltip title="Exit full screen"> <FullscreenExitOutlined width="2rem" /></Tooltip>
              ) : (
                <Tooltip title="Enter to full screen"><FullscreenOutlined /></Tooltip>
              )}
          </div> */}
        </div>
      </div>
      <section className="SD-app-layout">
        <nav>
          <ul className="SD-layoutSideBar">
            <li>
              <Link
                className={
                  params.pathname == "/"
                    ? "SD-sidebar_active"
                    : "sidebar_no_active"
                }
                to="/"
              >
                <img src={DashboardIcon} />
              </Link>
            </li>
            <li>
              <Link
                className={
                  params.pathname == "/push-notification"
                    ? "SD-sidebar_active"
                    : "sidebar_no_active"
                }
                to="/push-notification"
              >
                <img src={DashboardIcon} />
              </Link>
            </li>
            <li>
              <Link
                className={
                  params.pathname == "/admin/builder"
                    ? "SD-sidebar_active"
                    : "sidebar_no_active"
                }
                to="/admin/builder"
              >
                <img src={DashboardIcon} />
              </Link>
            </li>
            <li>
              <Link
                className={
                  params.pathname == "/admin/builder"
                    ? "SD-sidebar_active"
                    : "sidebar_no_active"
                }
                to="/admin/builder"
              >
                <img src={DashboardIcon} />
              </Link>
            </li>
          </ul>
        </nav>
        <div className="SD-mainSection">
          <Outlet context={[step]} />
        </div>
      </section>
    </div>
  );
}

export default Test;
