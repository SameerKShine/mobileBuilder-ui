import React, { useState } from "react";
import DragDrop from "../../common/elements/DragDrop";
import CustomiseIcon from "../menu/edit/CustomiseIcon";

function EditSidebar({ sideBar, setSidebar }) {
  const [selectedIndex, setSelectedIndex] = useState();
  const [editElement, setEditElement] = useState(false);
  const handleDrag = ({ source, destination }) => {
    console.log(source);
    console.log(destination);
    if (destination) {
      const items = { ...sideBar };
      const newItems = Array.from(items.elements);
      console.log(newItems);

      const [temp] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, temp);
      setSidebar({ ...sideBar, elements: newItems });
      return newItems;
    }
  };
  const handleDeleteElement = (index) => {
    console.log("handle delete", index);
    if (index > -1) {
      let newObj = { ...sideBar };
      newObj.elements.splice(index, 1);
      setSidebar(newObj);
    }
  };
  const handleEditIcon = (index) => {
    setSelectedIndex(index);
    setEditElement(true);
  };

  const handleAddMenu =()=>{
    const newEle = {
      icon: "",
      title: "Products",
      id: "Products",
      display_icon: "Products",
      icon_url: "/assets/images/menu/home.svg",
    }
    let menuList = {...sideBar}
      menuList.elements.push(newEle)
    setSidebar(menuList)
  }
  return (
    <div className="SD-editMenu">
      {editElement ? (
        <CustomiseIcon
          index={selectedIndex}
          setMenu={setSidebar}
          data={sideBar}
          setEditElement={setEditElement}
        />
      ) : (
        <>
        <button onClick={handleAddMenu}>Add menu item</button>
          <DragDrop
            handleDrag={handleDrag}
            data={sideBar.elements}
            handleDeleteElement={handleDeleteElement}
            handleEditIcon={handleEditIcon}
          />
        </>
      )}
    </div>
  );
}

export default EditSidebar;
