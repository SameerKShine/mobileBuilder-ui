import React, { useState } from "react";
import DragDrop from "../../common/elements/DragDrop";
import CustomiseIcon from "../menu/edit/CustomiseIcon";
import CommonModal from "../../common/modal/CommonModal";
import { useMemo } from "react";
import {
  CommonInput,
  Slider_field,
} from "../../common/elements/commonElements";
import UploadPicture from "../../common/elements/UploadPicture";

function EditSidebar({ sideBar, setSidebar }) {
  const [selectedIndex, setSelectedIndex] = useState();
  const [editElement, setEditElement] = useState(false);
  const [adNewItem, setnewItem] = useState({
    title: "",
    font_size: 18,
    font_weight: "",
    icon_url: "",
    link_to: "",
  });

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

  const handleAddMenu = () => {
    let menuList = { ...sideBar };
    menuList.elements.push(adNewItem);
    setSidebar(menuList);
  };

  const handleitemvalue = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setnewItem({ ...adNewItem, [e.target.name]: e.target.value });
  };
  const newItem = useMemo(() => {
    return (
      <>
        <CommonInput
          label="Page name"
          value={adNewItem.title}
          input={{ name: "title", placeholder: "Page name" }}
          onChange={handleitemvalue}
        />
        <Slider_field
          label="Font Size"
          val={adNewItem.font_size}
          max_range={28}
          min_range={18}
          onChange={(e) => setnewItem({ ...adNewItem, font_size: e })}
        />
        <Slider_field
          label="Font Weight"
          val={adNewItem.font_weight}
          name="font_weight"
          onChange={(e) =>
            setnewItem({ ...adNewItem, font_weight: e.toString() })
          }
        />
        <UploadPicture
          label="Upload Icon"
          name="icon_url"
          onuploadImage={handleitemvalue}
        />
        <CommonInput
          label="Link to"
          input={{ name: "link_to", placeholder: "Link to" }}
          value={adNewItem.link_to}
          onChange={handleitemvalue}
        />
      </>
    );
  }, [adNewItem]);
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
          {/* <button onClick={handleAddMenu}>Add menu item</button> */}
          <CommonModal
            headerText={
              <div className="popup-head">
                <h2>Choose Design</h2>
                <p>
                  Select The Default Design To Start With The Design Process.
                </p>
              </div>
            }
            title={<div className="  ">{newItem}</div>}
            icon={false}
            okFunc={handleAddMenu}
            button={{ ok: "Add", cancel: "Cancel" }}
            buttonText={<div>Add menu item</div>}
          />
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
