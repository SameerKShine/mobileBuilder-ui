import React from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip } from "antd";
import {
    EditOutlined,
    DragOutlined,
    DeleteOutlined,
    CloseOutlined,
  } from "@ant-design/icons";

function DragDrop({data, handleDrag, handleDeleteElement, handleEditIcon, }) {
    console.log("data  ==>", data)
  return (
    <ul className="SD-menuLists">
    <DragDropContext onDragEnd={handleDrag}>
      <Droppable droppableId="characters">
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((ele, index) => {
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
  )
}

export default DragDrop