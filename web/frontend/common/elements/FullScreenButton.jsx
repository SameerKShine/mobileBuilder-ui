import React, { useCallback, useState } from "react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { Button } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { useAppBridge } from "@shopify/app-bridge-react";

function FullScreenButton() {
  const [showScreen, setFullScreen] = useState(false);

  const app = useAppBridge();

  const handleScreenApp = useCallback(() => {
    const fullscreen = Fullscreen.create(app);
    setFullScreen(!showScreen);
    if (showScreen) {
      console.log("Enter in True condition");
      fullscreen.dispatch(Fullscreen.Action.EXIT);
    } else {
      console.log("Enter in False condition");

      fullscreen.dispatch(Fullscreen.Action.ENTER);
    }
  }, [showScreen]);

  console.log(showScreen)
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
  );
}

export default FullScreenButton;
