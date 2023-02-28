import React, { useState, useRef, useEffect } from "react";
import Droppable from "react-drag-and-drop/lib/Droppable";
import {
  DragDropContext,
  Droppable as InDroppable,
  Draggable,
} from "react-beautiful-dnd";
import { DragOutlined, CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { FieldsPreview } from "../../common/builder/FieldsPreview";
function BuilderPreview({
  handleOpenEdit,
  handleAddElements,
  builderFields,
  dropHere,
  app_apperance,
  setBuilderFields,
  activeClass,
  setActiveClass,
  handleRemoveEle,
  setElementIndex,
}) {

  // const bottomRef = useRef(null)
  //adding element acc to drop position
  const onDrop = (data, eleType) => {
    const id = builderFields.indexOf(eleType);
    handleAddElements(data.string, "DRAG_BETWEEN", id);
    setActiveClass(id + 1);
  };

  // useEffect(()=> {
  //   console.log(document.body.clientHeight, 'height', window.innerHeight)
    
  // }, [builderFields])

  const handleDrag = ({ source, destination }) => {
    // console.log(source);
    console.log(destination);
    if (destination) {
      const items = [...builderFields];
      const newItems = Array.from(items);
      const [temp] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, temp);
      setBuilderFields(newItems);
      setActiveClass(destination.index);
      setElementIndex(destination.index);
      return newItems;
    }
  };

  const handleOpenEditActive = (index, type) => {
    setActiveClass(index);
    handleOpenEdit(index, type);
  };

  const handleDuplicate = (id) => {
    const duplicate_obj = builderFields[id];
    const newDuplicate = JSON.parse(JSON.stringify(duplicate_obj));
    const newarry = [...builderFields];
    // console.log(newDuplicate, "datanew");
    newarry.splice(id + 1, 0, {
      ...newDuplicate
    });
    // newarry.push({ ...duplicate_obj, id: getNextId().toString() });
    setBuilderFields(newarry);
    setActiveClass(id + 1);
    setElementIndex(id + 1);
  };
console.log("builderFields == >", builderFields)
  const Dragging = () => {
    return (
      <>      <DragDropContext onDragEnd={handleDrag}>
        <InDroppable droppableId="root">
          {(provided) => {
            return (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {builderFields.map((eleType, index) => {
                  return (
                    <Draggable
                      className="sd-ado-maindnd"
                      key={index}
                      draggableId={index.toString()}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
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
                            <div
                              id={index.toString()}
                              key={index}
                              data-col={eleType.index}
                              className="inputDatadiv"
                            >
                              <Droppable
                                types={["string"]}
                                onDrop={(data) => onDrop(data, eleType)}
                              >
                                {activeClass == index && (
                                  <div className="SD-editIcons">
                                    <Tooltip title="Delete">
                                      <DeleteOutlined
                                        onClick={() => handleRemoveEle(index)}
                                      />
                                    </Tooltip>
                                    <Tooltip title="Duplicate">
                                      <CopyOutlined
                                        onClick={() => handleDuplicate(index)}
                                      />
                                    </Tooltip>
                                    <Tooltip title="Drag">
                                      {" "}
                                      <DragOutlined
                                        {...provided.dragHandleProps}
                                      />
                                    </Tooltip>
                                  </div>
                                )}
                                <div
                                  onClick={
                                    () =>
                                      handleOpenEditActive(index, eleType.type)
                                    // handleOpenEdit(index, eleType.type)
                                  }
                                  className={
                                    activeClass == index
                                      ? "selected_element"
                                      : "SD-previewSection"
                                  }
                                >
                                  {FieldsPreview(eleType, index, app_apperance)}
                                </div>
                                <div className="Smoothie">
                                  <div
                                    className={
                                      dropHere ? "dropableBox" : "hideDropBox"
                                    }
                                    id="txtInput2"
                                    placeholder="Drop here"
                                  >
                                    Drop here
                                  </div>
                                </div>
                              </Droppable>
                            </div>
                           
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
             
            );
          }}
        </InDroppable>
      </DragDropContext>
      {/* <div ref={bottomRef}>
                               
                               </div> */}
      </>
    );
  };

  return <div>{Dragging()}</div>;
}

export default React.memo(BuilderPreview);
