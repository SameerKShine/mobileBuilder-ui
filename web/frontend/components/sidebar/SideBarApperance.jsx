import React from "react";
import {
  Color_field,
  CommonSelect,
  Slider_field,
} from "../../common/elements/commonElements";

function SideBarApperance({ sideBar, setSidebar }) {
  const option = [
    { label: "layout 1", value: "layout_1" },
    { label: "layout 2", value: "layout_2" },
    { label: "layout 3", value: "layout_3" },
  ];

  const handleApperance = (e) => {
    setSidebar({ ...sideBar, [e.target.name]: e.target.value });
  };

  console.log("sideBar ==>", sideBar)
  return (
    <div className="SD-menuElements">
      <div>
        <Color_field
          label="Background Color"
          value={sideBar.background_color}
          name="background_color"
          onChange={handleApperance}
        />
        <Color_field
          label="Font Color"
          value={sideBar.font_color}
          name="font_color"
          onChange={handleApperance}
        />
        <Slider_field
          label="Font Size"
          min_range={15}
          max_range={30}
          val={sideBar.font_size}
          onChange={(e) => setSidebar({ ...sideBar, font_size: e })}
        />
        <CommonSelect
          label="Select Design"
          name="layout"
          option={option}
          value={sideBar.layout}
          onChange={handleApperance}
        />
      </div>
    </div>
  );
}

export default SideBarApperance;
