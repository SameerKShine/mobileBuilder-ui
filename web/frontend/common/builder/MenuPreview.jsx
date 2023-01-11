import React from "react";

function MenuPreview({ data }) {
  return data.layout == "menu_2" ? (
    <div className="menuBxRed">
      <div className="appmenu" style={{ backgroundColor: data.bgClr }}>
        {data.elements.slice(0, 5).map((menu, index) => (
          <div key={index} className="menuItemBox">
            <div className="menuItemIcn">
              <img
                src={menu.icon_url}
              />
            </div>
            <div className="menuItemName">
              <p
                className="activeMenu"
                style={{ color: data?.text_color ?? "#000" }}
              >
                {menu.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : data.layout == "menu_3" ? (
    <div className="menuBx" style={{ backgroundColor: data.bgClr }}>
      <div className="appmenuScnd">
        {data.elements.slice(0, 5).map((menu, index) =>
          index == 2 ? (
            <div key={index}>
              <div className="menuItemBox home">
                <div className="menuItemIcn">
                  <img
                    src={menu.icon_url}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div key={index} className="menuItemBox">
              <div className="menuItemIcn">
                <img
                  src={menu.icon_url}
                />
              </div>
              <div className="menuItemName">
                <p style={{ color: data.text_color ?? "#000" }}>{menu.title}</p>
              </div>
            </div>
          )
        )}
      </div>
      <div className="menuLine">
        <p> </p>
      </div>
    </div>
  ) : (
    <div>
      <div>
        <div className="menuBx" style={{ backgroundColor: data.bgClr }}>
          <div className="appmenuThird">
            {data.elements.slice(0, 5).map((menu, index) => (
              <div key={index} className="menuItemBox">
                <div className="menuItemIcn">
                  <img
                    src={menu.icon_url}
                  />
                </div>
                <div className="menuItemName">
                  <p style={{ color: data.text_color ?? "#000" }}>
                    {menu.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="menuLine">
            <p> </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(MenuPreview);
