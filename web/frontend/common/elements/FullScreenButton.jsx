import React, { useCallback } from "react";
import { Fullscreen } from "@shopify/app-bridge/actions";
import { Button, Tooltip } from "antd";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useMobileview } from "../../globalState/mobileView";

function FullScreenButton({positionTip}) {
  const app = useAppBridge();
const {getFullscreen, setFullscreen} = useMobileview()
console.log("use Context", getFullscreen)
  const handleScreenApp = useCallback(() => {
    const fullscreen = Fullscreen.create(app);
    setFullscreen(!getFullscreen);
    if (getFullscreen) {
      console.log("Enter in True condition");
      fullscreen.dispatch(Fullscreen.Action.EXIT);
    } else {
      console.log("Enter in False condition");

      fullscreen.dispatch(Fullscreen.Action.ENTER);
    }
  }, [getFullscreen]);

  return (
    <div className="fullScreen_button">
      <Tooltip placement={positionTip??"bottom"} title={getFullscreen ? " Exit Fillscreen " : " Enter Fullscreen "}>
      <Button
        icon={
          getFullscreen ? (
            <FullscreenExitOutlined width="2rem" />
          ) : (
            <FullscreenOutlined />
          )
        }
        onClick={handleScreenApp}
      >
      </Button>
      </Tooltip>
    </div>
  );
}

export default React.memo(FullScreenButton);
