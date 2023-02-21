import React from "react";
import Cart from "../../assets/images/mobileHeader/cart.png";
import logo from "../../assets/images/mobileHeader/logo.png";
import menu from "../../assets/images/mobileHeader/menu.png";
import search from "../../assets/images/mobileHeader/searchIcn.png";
import favorite from "../../assets/images/mobileHeader/favorite.png";
import nodification from "../../assets/images/mobileHeader/nodification.png";

function MobileHeader({ app_logo, app_bar }) {
  return (
    <>
      <div
        className="SD-builder-topbar"
        style={{
          backgroundColor: app_bar.bar_color,
          "borderBottomLeftRadius": app_bar.bottom_radius,
          "borderBottomRightRadius": app_bar.bottom_radius,
          "boxShadow":`-1px ${app_bar.shadow}px 9px 3px #a4a4a4`
        }}
      >
        <div className="builder-topbar-InrBx">
          <div className="menuBox">
            <img src={menu} />
          </div>
          <div className="logoBox">
            {/* <img src={`https://8326-14-99-195-170.ngrok.io/${appLogo}`||logo} /> */}
            <img src={app_logo || logo} />
          </div>
          <div className="icnBox3">
            {app_bar.search_icon&&<img src={search} />}
            {app_bar.cart_icon&&<img src={Cart} />}
            {app_bar.favorite_icon&&<img src={favorite} />}
            {app_bar.notification_icon&&<img src={nodification} />}
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileHeader;
