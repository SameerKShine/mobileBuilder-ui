import React from 'react'
import { Tabs } from "antd";
import { BgColorsOutlined, MenuOutlined } from "@ant-design/icons";

function TabScreen({ firstTab, secondTab }) {
    const items = [
        {
          label: (
            <span>
              <MenuOutlined /> Options
            </span>
          ),
          key: "1",
          children: firstTab,
        },
        {
          label: (
            <span>
              {" "}
              <BgColorsOutlined /> Appearance
            </span>
          ),
          key: "2",
    
          children: secondTab,
        },
      ];
  return (
    <Tabs
    className="SD-tabs"
    defaultActiveKey="1"
    animated={true}
    items={items}
  />
  )
}

export default TabScreen