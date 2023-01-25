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
            <img src={menu} />
          </div>
          <div className="logoBox">
            {/* <img src={`https://8326-14-99-195-170.ngrok.io/${appLogo}`||logo} /> */}
            <img src={logo} />
          </div>
          <div className="icnBox3">
            <img src={search} />
            <img src={Cart} />
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileHeader