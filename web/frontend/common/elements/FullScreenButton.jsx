import React, {useEffect, useState} from 'react'
import { Fullscreen } from "@shopify/app-bridge/actions";
import { Button} from "antd";
import {
    FullscreenOutlined,
    FullscreenExitOutlined,
  } from "@ant-design/icons";
  import { useAppBridge } from "@shopify/app-bridge-react";
  
function FullScreenButton() {
    const [showScreen, setFullScreen] = useState(false);

    const app = useAppBridge();

    useEffect(() => {
        const fullPage = sessionStorage.getItem("full_screen");
        if (fullPage == "enter") {
          const fullscreen = Fullscreen.create(app);
          fullscreen.dispatch(Fullscreen.Action.ENTER);
          setFullScreen(true);
        }
      }, []);

    const handleScreenApp = () => {
        const fullPage = sessionStorage.getItem("full_screen");
        const fullscreen = Fullscreen.create(app);
        if (fullPage == "enter") {
          sessionStorage.setItem("full_screen", "exit");
          fullscreen.dispatch(Fullscreen.Action.EXIT);
          setFullScreen(false);
        } else {
          sessionStorage.setItem("full_screen", "enter");
          fullscreen.dispatch(Fullscreen.Action.ENTER);
          setFullScreen(true);
        }
      };
  return (
    <div className="fullScreen_button">
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
  </div>
  )
}

export default FullScreenButton