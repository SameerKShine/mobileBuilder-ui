import React from "react";
import PreviewCard from "../../common/builder/PreviewCard";
import SideBarApperance from "./SideBarApperance";
import EditSidebar from "./EditSidebar";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
function SideBar({ sideBar, setSidebar }) {
  return (
    <div className="SD-editSection">
      <SideBarApperance sideBar={sideBar} setSidebar={setSidebar} />
      <PreviewCard bgColor={sideBar.background_color} data="globalSetting_hideHeader">
        <div className="sidebarPreview">
          <div className="display_flex">
            <div className="display_flex sidebar_profile">
              <UserOutlined className="profileIcon" />
              <div className="display_flex profile_content">
                <strong>My Name</strong>
                <span>test@gmail.com</span>
              </div>
            </div>
            <CloseOutlined />
          </div>

          <ul className="sidebar_list">
           { sideBar.elements.map((menu, index)=><li style={{'fontSize':sideBar.font_size, 'color':sideBar.font_color}} key={index}>
              <UserOutlined /> {menu.title}
            </li>)}
          </ul>
          {sideBar.layout !== "layout_1"&&<img src="" alt="Image" />}
        </div>
      </PreviewCard>
      <EditSidebar sideBar={sideBar} setSidebar={setSidebar} />
    </div>
  );
}

export default SideBar;
