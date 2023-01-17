import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  DragOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";
import CustomiseIcon from "./CustomiseIcon";
import { Color_field } from "../../../common/elements/commonElements";
import TabScreen from "../../../common/elements/TabScreen";

const element_types = [
  {
    icon: "",
    title: "Home",
    id: "Home",
    display_icon: "Home0",
    icon_url: "/assets/images/menu/home.svg",
  },
  {
    icon: "",
    title: "Recently View",
    id: "Recently View",
    display_icon: "Recently_View0",
    icon_url: "/assets/images/menu/recently_view.svg",
  },
  {
    icon: "",
    title: "Cart",
    id: "Cart",
    display_icon: "Cart0",
    icon_url: "/assets/images/menu/cart.svg",
  },
  {
    icon: "",
    title: "My Orders",
    id: "My Orders",
    display_icon: "My_Orders0",
    icon_url: "/assets/images/menu/account.svg",
  },
  {
    icon: "",
    title: "All Products",
    id: "All Products",
    display_icon: "All_Products0",
    icon_url: "/assets/images/menu/product.svg",
  },
  {
    icon: "",
    title: "Collections",
    id: "Collections",
    display_icon: "Sub_Collections0",
    icon_url: "/assets/images/menu/collections.svg",
  },
  {
    icon: "",
    title: "My Account",
    id: "My Account",
    display_icon: "My_Account0",
    icon_url: "/assets/images/menu/account.svg",
  },
  {
    icon: "",
    title: "Contact Us",
    id: "Contact Us",
    display_icon: "Contact_Us0",
    icon_url: "/assets/images/menu/contact-us.svg",
  },
  {
    icon: "",
    title: "FAQs",
    id: "FAQs",
    display_icon: "FAQs0",
    icon_url: "/assets/images/menu/faqs.svg",
  },
];
function EditMenu({ setMenu, menu }) {
  const [editElement, setEditElement] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState("");

  const results = element_types.filter(
    ({ id: id1 }) => !menu.elements.some(({ id: id2 }) => id2 === id1)
  );

  //  console.log(ele_types)
  const handleAddElement = (index, name) => {
    const d = element_types.find((el) => el.id == name);
    console.log(d);
    setMenu({ ...menu, elements: [...menu.elements, d] });
  };
  const handleDeleteElement = (index) => {
    console.log("handle delete", index);
    if (index > -1) {
      let newObj = { ...menu };
      newObj.elements.splice(index, 1);
      setMenu(newObj);
    }
  };

  const handleDrag = ({ source, destination }) => {
    console.log(source);
    console.log(destination);
    if (destination) {
      const items = { ...menu };
      const newItems = Array.from(items.elements);
      console.log(newItems);

      const [temp] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, temp);
      setMenu({ ...menu, elements: newItems });
      return newItems;
    }
  };
  const handleEditIcon = (index) => {
    setSelectedIndex(index);
    setEditElement(true);
  };
  const handleEditMenu = (name, value) => {
    setMenu({ ...menu, [name]: value });
  };
  const color_optn = [
    { label: "Background Color", name: "bgClr" },
    { label: "Menu Text Color", name: "text_color" },
    { label: "Menu Icon Color", name: "icon_color" },
  ];

  function listPreview(mapData, className, add) {
    return (
      <ul className="SD-menuLists">
        {mapData.map((ele, index) => (
          <li
            key={index}
            className={className}
            onClick={
              add == "" ? () => {} : () => handleAddElement(index, ele.id)
            }
          >
            <div className="editMenu_selectedIcon">
              <img src={ele.icon_url} /> <span> {add == ""?ele.title:ele.id} </span>
            </div>{" "}
          </li>
        ))}
      </ul>
    );
  }

  const firstTabData = (
    <>
      <div className="">
        <div>
          <h2 className="SD-sidebarOptn">Menu Types</h2>
          <ul className="SD-menuLists">
            <DragDropContext onDragEnd={handleDrag}>
              <Droppable droppableId="characters">
                {(provided) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {menu.elements.map((ele, index) => {
                        return (
                          <Draggable
                            className="sd-ado-maindnd"
                            key={index}
                            draggableId={index.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <li
                                  className="selected_menu"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  style={
                                    snapshot.isDragging
                                      ? {
                                          background: "",
                                          ...provided.draggableProps.style,
                                        }
                                      : provided.draggableProps.style
                                  }
                                >
                                  <div className="editMenu_selectedIcon">
                                    <img src={ele?.icon_url} />
                                    <span> {ele.title} </span>
                                  </div>
                                  <div>
                                    <Tooltip title="Delete">
                                      <DeleteOutlined
                                        onClick={() =>
                                          handleDeleteElement(index)
                                        }
                                      />{" "}
                                    </Tooltip>

                                    <Tooltip title="Edit">
                                      <EditOutlined
                                        onClick={() => handleEditIcon(index)}
                                      />
                                    </Tooltip>

                                    <Tooltip title="Drag">
                                      <DragOutlined
                                        {...provided.dragHandleProps}
                                      />
                                    </Tooltip>
                                  </div>
                                </li>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
          </ul>

          {listPreview(results, "", "add")}
        </div>
      </div>
      <h2 className="SD-sidebarOptn">Side Menu Options</h2>
      {listPreview(menu.elements.slice(5), "selected_menu", "")}
    </>
  );
  const secondTabData = color_optn.map((clr, index) => (
    <div key={index} className="clr-appear">
      <Color_field
        label={clr.label}
        value={menu[clr.name]}
        name={clr.name}
        onChange={(e) => handleEditMenu(e.target.name, e.target.value)}
      />
    </div>
  ));
  return editElement == false ? (
    <div className="SD-editMenu">
      <TabScreen firstTab={firstTabData} secondTab={secondTabData} />
    </div>
  ) : (
    <div>
      <div className="closeBtn_editForm" onClick={() => setEditElement(false)}>
        <CloseOutlined />
      </div>
      <CustomiseIcon
        index={selectedIndex}
        setMenu={setMenu}
        data={menu}
        setEditElement={setEditElement}
      />
    </div>
  );
}

export default EditMenu;
