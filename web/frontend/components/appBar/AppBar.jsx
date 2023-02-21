import { Switch } from "antd";
import React, { useMemo } from "react";
import MobileHeader from "../../common/builder/MobileHeader";
import {
  Color_field,
  Slider_field,
} from "../../common/elements/commonElements";
import UploadPicture from "../../common/elements/UploadPicture";

function AppBar({ app_bar, setAppBar }) {
  const handeAppbar = (name, value) => {
    setAppBar({ ...app_bar, [name]: value });
  };
  return (
    <div className="SD-publish_app">
      <h2 className="SD-section-heading"> App Bar Setting</h2>
      <div>
        <h2>Preview</h2>
        <div className="app_bar_preview">
          <MobileHeader app_bar={app_bar} />
        </div>
      </div>
      <div>
        <div className="display_flex">
          <Color_field
            value={app_bar.bar_color}
            name="bar_color"
            onChange={(e) => handeAppbar(e.target.name, e.target.value)}
            mainClass="appBarColorField"
            label="App Bar Color"
          />
          <div className="appBarColorField appBarSlider">
            <UploadPicture label="Upload App Logo" />
          </div>
          <div className="appBarColorField appBarSwitch">
            <label>Notification Icon</label>
            <Switch
              checked={app_bar.notification_icon ? true : false}
              onChange={(e) => handeAppbar("notification_icon", e)}
            />
          </div>
          <div className="appBarColorField appBarSwitch">
            <label>Search Icon</label>
            <Switch
              checked={app_bar.cart_icon ? true : false}
              onChange={(e) => handeAppbar("cart_icon", e)}
            />
          </div>
          <div className="appBarColorField appBarSwitch">
            <label>Cart Icon</label>
            <Switch
              checked={app_bar.search_icon ? true : false}
              onChange={(e) => handeAppbar("search_icon", e)}
            />
          </div>
          <div className="appBarColorField appBarSwitch">
            <label>Favorite Icon</label>
            <Switch
              checked={app_bar.favorite_icon ? true : false}
              onChange={(e) => handeAppbar("favorite_icon", e)}
            />
          </div>
          <div className="appBarColorField appBarSlider">
            <Slider_field
              label="Bottom Radius"
              max_range={10}
              min_range={0}
              step=""
              val={app_bar.bottom_radius}
              onChange={(e) => handeAppbar( "bottom_radius" ,e)}
            />
          </div>
          <div className="appBarColorField appBarSlider">
            <Slider_field
              label="Bottom Shadow"
              max_range={10}
              min_range={0}
              step=""
              val={app_bar.shadow}
              onChange={(e) => handeAppbar( "shadow" ,e)}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AppBar;
