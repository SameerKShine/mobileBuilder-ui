import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { errToast } from "../../../common/notification/notification";
import ProductandCollectionPicker from "../../../common/elements/ProductCollectionPicker";
import { CommonInput, CommonSelect } from "../../../common/elements/commonElements";
import { commonToggle } from "./editUtils";
import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";

function EditCollectionProduct({
  values,
  elementType,
  handleEditElement,
  elementIndex,
  setBuilderFields,
  setOpen,
  open,
}) {
  const app = useAppBridge();
  // console.log(values);
  const [checkedIDs, setCheckedIds] = useState([]);
  // const [checkSingleIDs, setCheckSingleIds] = useState([]);
  // const [selectApiType, setSelectApiType] = useState(elementType);
  console.log(elementType);
  //get all products and collections
//   const { getShop } = useAPI();
const  getShop  = 'test-updatedpre.myshopify.com'
  useEffect(() => {
    console.log("entering in effect when index changes");
    setCheckedIds([]);
    if (values[elementIndex]?.data?.length > 0) {
      values[elementIndex]?.data?.map((ele) => {
        setCheckedIds((prev) => [...prev, ele.id]);
        // console.log(ele.id)
      });
    } else {
      console.log("enter in else");
      setCheckedIds([]);
    }
  }, [elementIndex]);

  //products of specific collection
  async function getProductsOfCollection(collectionId) {
    const sessionToken = await getSessionToken(app);
    console.log(sessionToken)
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    const arr = [...values];
    console.log(collectionId);
    await axios
      .post("/api/admin/collectionProducts", { id: collectionId }, config)
      .then((res) => {
        console.log(res.data.response);
        arr[elementIndex].data = res.data.response.slice(0, 4);
        setBuilderFields(arr);
      })
      .catch((err) => console.log(err));
  }

  //open collection or product screen
  const showDrawer = () => {
    // setSelectApiType(elementType);
    setOpen(!open);
  };

  //deleting product or collection which is selected
  const handleDeleteSelectedData = (e, index) => {
    let mainArry = [...values];
    let checked = [...checkedIDs];
    mainArry[elementIndex].data.splice(index, 1);
    checked.splice(index, 1);
    setCheckedIds(checked);
    setBuilderFields(mainArry);
  };

  //function for selecting collection to get products
  function handleProductByCollection(e, ele, id) {
    console.log("enter in collection");
    console.log(ele);
    const arr = [...values];
    if (e.target.checked) {
      arr[elementIndex].selected_collection = ele;
      arr[elementIndex].data = [];
      getProductsOfCollection(e.target.value);
      setBuilderFields(arr);
      setCheckedIds([id]);
      setOpen(false);
    } else {
      arr[elementIndex].selected_collection = {};
      setCheckedIds([]);
      setBuilderFields(arr);
    }
  }

  const val = values[elementIndex];
  const options = [
    { label: "Layout 1", value: "layout_1" },
    { label: "Layout 2", value: "layout_2" },
    { label: "Layout 3", value: "layout_3" },
  ];
  return (
    <>
      <div className="PrdctDtlFrm">
        {open ? (
          <ProductandCollectionPicker
            show={open}
            checkedIDs={checkedIDs}
            onSelect={(e, ele, id) => {
              if (elementType == "collections") {
                handleProductByCollection(e, ele, id);
              } else {
                let validation = 12;
                if (elementType == "collection_list") {
                  if (
                    val.choose_layout == "layout_2" ||
                    val.choose_layout == "layout_4"
                  ) {
                    validation = 3;
                  }
                } else {
                  validation = 12;
                }

                const arr = [...values];
                if (e.target.checked) {
                  console.log(validation);
                  if (checkedIDs.length < validation) {
                    console.log(checkedIDs.length);
                    setCheckedIds((prev) => [...prev, e.target.value]);
                    arr[elementIndex].data.push(ele);
                    setBuilderFields(arr);
                  } else {
                    console.log("enter in Else length exceeded");
                    errToast(
                      `Maximum ${validation} Products can be Selected`,
                      "top"
                    );
                  }
                } else {
                  let arr1 = [...checkedIDs];
                  const index = arr[elementIndex].data.indexOf(ele);
                  const index1 = arr1.indexOf(id);
                  arr[elementIndex].data.splice(index, 1);
                  arr1.splice(index1, 1);
                  setCheckedIds(arr1);
                  setBuilderFields(arr);
                }
              }
            }}
            setOpen={setOpen}
            elementType={elementType}
            // elementType="products"
          />
        ) : (
          <>
            <div className="form-group mb20">
              <div className="tgleBx">
                {elementType == "collection_list"
                  ? val.choose_layout == "layout_1" &&
                    commonToggle(
                      "Show title",
                      "show_collection_title",
                      values,
                      elementIndex,
                      setBuilderFields
                    )
                  : ""}
                {elementType == "products" || elementType == "collections"
                  ? commonToggle(
                      "Show price",
                      "show_price",
                      values,
                      elementIndex,
                      setBuilderFields
                    )
                  : ""}
                {commonToggle(
                  "Show heading",
                  "show_heading",
                  values,
                  elementIndex,
                  setBuilderFields
                )}
              </div>
            </div>

            {val.show_heading && (
              <CommonInput
                label="Heading"
                value={val.heading ?? ""}
                onChange={handleEditElement}
                input={{
                  name: "heading",
                  type: "text",
                  placeholder: "Enter Heading here...",
                }}
              />
            )}
            <CommonSelect
              label="Designs"
              className="mb10"
              onChange={handleEditElement}
              name="choose_layout"
              value={val.choose_layout}
              option={options}
            />

            {elementType == "collections" && (
              <div className="SelectProductsBtn">
                <label>Selected collection</label>
                <div className="SD-featured_product" onClick={showDrawer}>
                  {val?.selected_collection
                    ? val.selected_collection?.label ??
                      "" + " (Click to Change the Collection)"
                    : "Click To Select Collection"}
                </div>
              </div>
            )}

            {elementType !== "collections" && val.data.length > 0 ? (
              <>
                <label>Selected {elementType}</label>
                <div className="SD-selectedTags">
                  {val.data.map((ele, index) => (
                    <div key={index} className="SD-select_tag">
                      <img src={ele?.image?.url} />
                      <span>{ele.label}</span>
                      <CloseOutlined
                        onClick={() => handleDeleteSelectedData(ele, index)}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
            {elementType !== "collections" && (
              <div className="SelectedPrdctBtn">
                <Button onClick={showDrawer}>
                  {" "}
                  <PlusCircleOutlined /> Add{" "}
                  {elementType == "collection_list"
                    ? "Collections"
                    : elementType}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default EditCollectionProduct;
