import React, {useState, useEffect} from "react";
import TabScreen from "../../../common/elements/TabScreen";
import { CloseOutlined } from "@ant-design/icons";
import Appearance from "./Appearance";
import {  editHeader,
  editDivider,
  editHeroSlider,
  editcountDown,
  editVideo,
  featuredProduct,
  editAnnouncemenrBar,} from './editutils'
  import { CommonInput } from "../../../common/elements/commonElements";
import EditCollectionProduct from "./EditCollectionPProduct";

function EditSection({
  elementIndex,
  elementType,
  setEditForm,
  builderFields,
  setBuilderFields,
  handleRemoveEle,
  setShowTopbar,
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log("useEffect working ", elementIndex);
    setOpen(false);
  }, [elementIndex]);

  //edit element Appearence tab data
  const handleEditAppearance = (e, name) => {
    console.log(typeof(e));
    console.log(name);
    setShowTopbar(true);
    const arr = [...builderFields];
    if (name == "background_style") {
      if(e == 'gradiant'){
        console.log
        arr[elementIndex].style.background_style = {
          countdown_gradient_color1:"#d28e8e",countdown_gradient_color2:"#7c3636"
        }
      } else{
        arr[elementIndex].style.background_style = {
          countdown_background_color:"#d24747"
        }
        } 
     
     arr[elementIndex].style.background_style = {
      ...arr[elementIndex].style.background_style,
        type: e,
      };
    } 

    else if (
      name == "countdown_background_color" ||
      name == "countdown_background_image" ||
      name == "countdown_gradient_color1" ||
      name == "countdown_gradient_color2"
    ) {
      arr[elementIndex].style.background_style = {
        ...arr[elementIndex].style.background_style,
        [name]: e,
      };
    } 
    else {
      arr[elementIndex].style[name] = e;
    }
    setBuilderFields(arr);
  };

  //edit element Option tab data
  const handleEditElement = (e) => {
    setShowTopbar(true);
    const condition = e.target.name;
    const arr = [...builderFields];
    switch (condition) {
      case "divider_type":
        return (
          {
            ...arr[elementIndex],
            ...(arr[elementIndex].divider_type = e.target.value),
          },
          setBuilderFields(arr)
        );
      default:
        return (
          (arr[elementIndex][e.target.name] = e.target.value),
          // arr[elementIndex] = { ...arr[elementIndex], title_text: e.target.value }
          setBuilderFields(arr)
        );
    }
  };

  const handleRestValues = () => {
    const resetVal = useElementVal(elementType);
    console.log("handle reset");
    const arr = [...builderFields];
    console.log(arr[elementIndex]);
    arr[elementIndex] = resetVal;
    setBuilderFields(arr);
  };

  //show edit fields
  const childrenData =
    elementType == "header" ? (
      editHeader(
        builderFields,
        elementIndex,
        handleEditElement,
        setBuilderFields
      )
    ) : elementType == "collection_list" ||
      elementType == "products" ||
      elementType == "collections" ? (
      <>
        <EditCollectionProduct
          open={open}
          setBuilderFields={setBuilderFields}
          values={builderFields}
          elementIndex={elementIndex}
          elementType={elementType}
          setOpen={setOpen}
          handleEditElement={handleEditElement}
        />
      </>
    ) : elementType == "offer" ? (
      <>
        {editHeroSlider(
          builderFields,
          elementIndex,
          setBuilderFields,
          handleEditElement,
          open,
          setOpen
        )}
      </>
    ) : elementType == "divider" ? (
      <>
        {editDivider(
          builderFields[elementIndex].divider_type,
          elementIndex,
          handleEditElement
        )}
      </>
    ) : elementType == "text_divider" ? (
      <CommonInput
        label="Divider Text"
        value={builderFields[elementIndex].divider_text}
        onChange={handleEditElement}
        input={{
          name: "divider_text",
          type: "text",
          placeholder: "Edit Text",
        }}
      />
    ) : elementType == "hero_slider" ? (
      <>
        {editHeroSlider(
          builderFields,
          elementIndex,
          setBuilderFields,
          handleEditElement,
          open,
          setOpen
        )}
      </>
    ) : elementType == "countdown_offer" ? (
      <>
        {" "}
        {editcountDown(
          builderFields,
          elementIndex,
          handleEditElement,
          setBuilderFields
        )}{" "}
      </>
    ) : elementType == "featured_product" ? (
      <>
        {featuredProduct(
          open,
          setOpen,
          builderFields,
          elementIndex,
          setBuilderFields,
          handleEditElement
        )}
      </>
    ) : elementType == "video" ? (
      editVideo(builderFields, elementIndex, handleEditElement)
    ) : elementType == "announcement_bar" ? (
      editAnnouncemenrBar(
        builderFields,
        elementIndex,
        setBuilderFields,
        handleEditElement,
        setOpen,
        open
      )
    ) : (
      "No Data"
    );
  return (
    <>
      <div className="rightSidebar open-right-sidebar">
        <div className="rightSide-inner side-slct">
          <div className="right-inner-wrapper">
            <strong>
              {" "}
              {elementType.charAt(0).toUpperCase() +
                elementType.slice(1).replace(/_/g, " ")}
            </strong>
            <div
              className="closeBtn_editForm"
              onClick={() => setEditForm(false)}
            >
              <CloseOutlined />
            </div>
            <TabScreen
              firstTab={childrenData}
              secondTab={
                <Appearance
                  elementType={elementType}
                  fieldIndex={elementIndex}
                  data={builderFields}
                  setBuilderFields={setBuilderFields}
                  handleEditElement={handleEditAppearance}
                />
              }
            />
            {!open && (
              <div className="SD-delete_reset">
                <button
                className="reset_btn"
                  onClick={handleRestValues}
                >
                  Reset
                </button>
                <button
                className="delete_btn"
                  onClick={() => handleRemoveEle(elementIndex)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditSection;
