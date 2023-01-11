import React from 'react'
import menu1 from '../../assets/images/menuImages/menu1.svg'
import menu2 from '../../assets/images/menuImages/menu2.svg'
import menu3 from '../../assets/images/menuImages/menu3.svg'

function MenuOptions({setMenu, menu}) {

    const handleSelectMenu = (val) => {
        setMenu((prevState) => ({
            ...prevState,
            layout: val,
          }))
    }

    const layout_options = [
      {img:menu1, title:'Menu layout 1', value:'menu_1'},
      {img:menu2, title:'Menu layout 2', value:'menu_2'},
      {img:menu3, title:'Menu layout 3', value:'menu_3'},
    ]
  return (
    <div className='SD-menuElements'>
        <>
        <h2 className='SD-section-heading'>Select Menu Layout</h2>
      { layout_options.map((lay, index) => <div key={index} className={menu.layout == lay.value ? "selected_element" : ""}>
          <h3>{lay.title}</h3>
          <img
            onClick={() => handleSelectMenu(lay.value)}
            width="100%"
            src={lay.img}
          />
        </div>)}
      </>
    </div>
  )
}

export default MenuOptions