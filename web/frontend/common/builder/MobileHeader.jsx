import React from 'react'
import Cart from '../../assets/images/mobileHeader/cart.png'
import logo from '../../assets/images/mobileHeader/logo.png'
import menu from '../../assets/images/mobileHeader/menu.png'
import search from '../../assets/images/mobileHeader/searchIcn.png'

function MobileHeader({appLogo}) {
  return (
    <>
      <div className="SD-builder-topbar">
        <div className="builder-topbar-InrBx">
          <div className="menuBox">
            <img src={search} />
          </div>
          <div className="logoBox">
            <img src={appLogo||logo} />
          </div>
          <div className="icnBox3">
            <img src={menu} />
            <img src={Cart} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader