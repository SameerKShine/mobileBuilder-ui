import React from "react";
import { Draggable } from "react-drag-and-drop";
import { Icon } from "@shopify/polaris";
import {
  TitleMinor,
  SlideshowMajor,
  CollectionsMajor,
  ProductsMajor,
  FoodMajor,
  ClockMajor,
  PlayCircleMajor,
  SearchMajor,
  MinusMinor,
  BuyButtonMajor,
} from "@shopify/polaris-icons";

function ElementList(props) {
  const elementList = [
    {
      type: "announcement_bar",
      label: "Announcement Bar",
      icon: BuyButtonMajor,
    },
    // { type: "search_bar", label: "Search", icon: SearchMajor },
    { type: "header", label: "Header", icon: TitleMinor },
    { type: "hero_slider", label: "Hero Slider", icon: SlideshowMajor },
    {
      type: "collection_list",
      label: "Collections List",
      icon: CollectionsMajor,
    },
    { type: "collections", label: "Collection", icon: CollectionsMajor },
    { type: "products", label: "Products", icon: ProductsMajor },
    { type: "divider", label: "Divider", icon: MinusMinor },
    { type: "text_divider", label: "Text Divider", icon: "divider" },
    { type: "offer", label: "Offer", icon: FoodMajor },
    {
      type: "featured_product",
      label: "Featured Product",
      icon: ProductsMajor,
    },
    { type: "countdown_offer", label: "Countdown offer", icon: ClockMajor },
    // { type: "video", label: "Video", icon: PlayCircleMajor },
  ];

  //drag and drop
  const handleAddElement = (type) => {
    if (type == "mouse Down") {
      props.setDropHere(true);
    } else {
      props.setDropHere(false);
    }
  };
  return (
    <div className="SD-builderElementList">
    {elementList.map((ele, index) => (
      <div
        className="SD-builderElementListTag"
        key={index}
        onClick={() => props.handleAddElements(ele.type, "PUSH")}
        onMouseDown={() => handleAddElement("mouse Down")}
        onMouseUp={() => handleAddElement("mouse Up")}
      >
        <Draggable type="string" data={ele.type}>
          <a className="sidebar-menu-item top-bar">
            <span className="polaricIcon">
              <Icon source={ele.icon} color="base" />
            </span>
            <span className="sidebar-menu-text">{ele.label}</span>
          </a>
        </Draggable>
      </div>
    ))}
  </div>
  );
}

export default ElementList;
