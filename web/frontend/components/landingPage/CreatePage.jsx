import React, { useState, useEffect, useRef } from "react";
import PreviewCard from "../../common/builder/PreviewCard";
import ElementList from "./ElementList";
import Droppable from "react-drag-and-drop/lib/Droppable";
import BuilderPreview from "./BuilderPreview";
import EditSection from "./edit/EditSection";
import { useElementVal, useApi } from "../../hooks";
import SaveChangesBar from "../../common/SaveChangesBar";

function CreatePage({ builderFields, setBuilderFields, menu, app_apperance, app_bar, pageSelectFunction, restValues }) {
  const [dropHere, setDropHere] = useState(false);
  const [openEditForm, setEditForm] = useState(true);

  const [elementIndex, setElementIndex] = useState(0);
  const [elementType, setElementType] = useState("header");

  const [activeClass, setActiveClass] = useState(0);
  const [showTopbar, setShowTopbar] = useState(false);

  //hide drop here box on preview
  useEffect(() => {
    document.body.addEventListener("dragend", function (e) {
      // Prevent default to allow drop.
      e.preventDefault();
      setDropHere(false);
    });
  }, []);


  const bottomRef = useRef(null)
  //add new elemnt in main array and open edit componet of recent add
  const handleAddElements = (data, flag, id) => {
    const addEle = useElementVal(data);
    let newArry = [...builderFields];
    if (flag == "TOP_DRAG") {
      newArry.unshift(addEle);
      setElementIndex(0);
    } else if (flag == "PUSH") {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      newArry.push(addEle);
      setElementIndex(builderFields.length);
      setActiveClass(builderFields.length);
    } else {
      newArry.splice(id + 1, 0, addEle);
      setElementIndex(id + 1);
    }
    setBuilderFields(newArry);
    setElementType(data);
    setEditForm(true);
    setShowTopbar(true);
  };

  //open edit component
  const handleOpenEdit = (id, eleType) => {
    console.log("clicked");
    console.log(eleType);
    setElementIndex(id);
    setElementType(eleType);
    setEditForm(true);
  };

  //delete element
  const handleRemoveEle = (elementIndex) => {
    console.log(elementIndex);
    let prevData = [...builderFields];
    if (elementIndex !== -1) {
      prevData.splice(elementIndex, 1);
    }
    setBuilderFields(prevData);
    setEditForm(false);
  };
  
  return (
    <>
      <div className="SD-editSection">
        <ElementList
          setDropHere={setDropHere}
          handleAddElements={handleAddElements}
        />
        <PreviewCard pageSelectFunction={pageSelectFunction}  primaryClass="SD-builderPreview" secondaryClass="white-bg-box mobile_preview"
         data={menu} bottomRef={bottomRef}
          app_bar={app_bar}
           bgColor={app_apperance?.background_color}>
          <Droppable
            types={["string"]}
            onDrop={(data) => handleAddElements(data.string, "TOP_DRAG")}
          >
            <div className="Smoothie">
              <div
                className={dropHere ? "dropableBox" : "hideDropBox"}
                id="txtInput2"
                placeholder="Drop here"
              >
                Drop here
              </div>
            </div>
          </Droppable>
          <BuilderPreview
            dropHere={dropHere}
            builderFields={builderFields}
            activeClass={activeClass}
            setBuilderFields={setBuilderFields}
            bottomRef={bottomRef}
            app_apperance={app_apperance}
            setElementIndex={setElementIndex}
            handleRemoveEle={handleRemoveEle}
            handleOpenEdit={handleOpenEdit}
            handleAddElements={handleAddElements}
            setActiveClass={setActiveClass}
          />
        </PreviewCard >
     
        {openEditForm && (
          <EditSection
            elementIndex={elementIndex}
            elementType={elementType}
            builderFields={builderFields}
            setBuilderFields={setBuilderFields}
            restValues={restValues}
            handleRemoveEle={handleRemoveEle}
            setEditForm={setEditForm}
            setShowTopbar={setShowTopbar}
          />
        )}
      </div>
    </>
  );
}

export default CreatePage;
