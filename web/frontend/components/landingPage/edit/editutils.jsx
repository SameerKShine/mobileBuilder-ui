import React, { useCallback } from "react";
import {  Popover, ActionList } from "@shopify/polaris";
import { Collapse, Switch, TimePicker, DatePicker, Space } from "antd";
import {
  DeleteOutlined,
  CopyOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { CommonInput, CommonSelect } from "../../../common/elements/commonElements";
import ProductandCollectionPicker from "../../../common/elements/ProductCollectionPicker";
// import { errToast } from "../../../common/notification/notification";
import UploadImage from "../../../common/elements/UploadPicture";
import CommonPopover from "../../../common/elements/CommonPopover";
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

// const [selectedId, setSelectedID] = useState('')
export const commonToggle = (
  label,
  field,
  builderFields,
  elementIndex,
  setBuilderFields
) => {
  const onChange = (checked) => {
    let newArr = [...builderFields];
    newArr[elementIndex][field] = checked;
    setBuilderFields(newArr);
  };
  return (
    <>
      <div className="SD-switch appreance_bar_icon">
        <label>{label}</label>
        <Switch
          checked={builderFields[elementIndex][field]}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export const editHeader = (
  builderFields,
  elementIndex,
  handleEditElement,
  setBuilderFields
) => {
  const options = [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ];
  return (
    <div className="edit_headerSection">
      <CommonInput
        label="Heading"
        className=" "
        value={builderFields[elementIndex].heading_text}
        onChange={handleEditElement}
        input={{
          name: "heading_text",
          type: "text",
          placeholder: "Edit Heading",
        }}
      />
      <div className="SD-toggle-margin">
        {commonToggle(
          "Sub heading",
          "show_subheading",
          builderFields,
          elementIndex,
          setBuilderFields
        )}
        {builderFields[elementIndex].show_subheading && (
          <CommonInput
            value={builderFields[elementIndex].subheading_text}
            onChange={handleEditElement}
            input={{
              name: "subheading_text",
              type: "text",
              placeholder: "Edit Sub-Heading",
            }}
          />
        )}
      </div>

      <CommonSelect
        label="Text alignment"
        onChange={handleEditElement}
        name="text_alignment"
        value={builderFields[elementIndex].text_alignment}
        option={options}
      />
    </div>
  );
};

export const editDivider = (data, index, editHandle) => {
  const options = [
    { label: "Solid", value: "solid" },
    { label: "Dotted", value: "dotted" },
    { label: "Dashed", value: "dashed" },
  ];
  return (
    <>
      <CommonSelect
        label="Divider type"
        className="mb25"
        onChange={editHandle}
        name="divider_type"
        value={data}
        option={options}
      />
    </>
  );
};

export const editHeroSlider = (
  builderFields,
  elementIndex,
  setBuilderFields,
  handleEditElement,
  open,
  setOpen
) => {
  console.log(builderFields[elementIndex].data);
  const handleEditFields = (e, index) => {
    let arr = [...builderFields];
    arr[elementIndex].data[index][e.target.name] = e.target.value;
    setBuilderFields(arr);
  };
  const handleAddBtn = () => {
    let arr = [...builderFields];
    if (builderFields[elementIndex].data.length < 3) {
      arr[elementIndex].data.push({
        title_text: "New Slider",
        sub_title: "example Subtitle",
        image:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      });
      setBuilderFields(arr);
    } else {
      // errToast("Cannont add More than 3 sliders", "top");
    }
  };

  const handleDuplicate = (id) => {
    if (builderFields[elementIndex].data.length < 3) {
      const duplicate_obj = builderFields[elementIndex].data[id];
      const newDuplicate = JSON.parse(JSON.stringify(duplicate_obj));
      const newarry = [...builderFields];
      newarry[elementIndex].data.splice(id + 1, 0, {
        ...newDuplicate,
      });
      setBuilderFields(newarry);
    } else {
      // errToast("Cannont add More than 3 sliders", "top");
    }
  };
  const handleDelete = (id) => {
    let prevData = [...builderFields];
    if (id !== -1) {
      prevData[elementIndex].data.splice(id, 1);
      setBuilderFields(prevData);
    }
  };

  const commonFields = [
    { name: "title_text", label: "Title" },
    { name: "sub_title", label: "Subtitle" },
    { name: "image", label: "Enter image Url" },
    { name: "button_text", label: "Buttom text" },
  ];
  const options = [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ];
  const handleType = (type, index) => {
    let prevData = [...builderFields];
    prevData[elementIndex].data[index].link_type = type;
    setBuilderFields(prevData);
    setOpen(true);
  };
  return (
    <>
      <div className="hroSldrTglBtns">
        {commonToggle(
          "Dots",
          "show_dots",
          builderFields,
          elementIndex,
          setBuilderFields
        )}
        {commonToggle(
          "Autoplay",
          "autoplay",
          builderFields,
          elementIndex,
          setBuilderFields
        )}
      </div>

      <Collapse ghost={true} accordion collapsible="icon">
        {builderFields[elementIndex].data.map((ele, index) => {
          return (
            <>
              <Panel
                collapsible="header"
                header={
                  <div className="SD_heroSliderHeader"> Slider {index + 1}</div>
                }
                key={index}
                extra={
                  <div className="SD_heroSliderHeaderBtn">
                    {" "}
                    <DeleteOutlined
                      style={{ fontSize: "16px", color: "#344054" }}
                      onClick={() => handleDelete(index)}
                    />
                    <CopyOutlined
                      style={{ fontSize: "16px", color: "#344054" }}
                      onClick={() => handleDuplicate(index)}
                    />
                  </div>
                }
              >
                {commonFields.map((input, key) => {
                  return (
                    <div key={key}>
                      <CommonInput
                        label={input.label}
                        value={ele[input.name]}
                        onChange={(e) => handleEditFields(e, index)}
                        input={{
                          name: input.name,
                          type: "text",
                          placeholder: input.label,
                        }}
                      />
                    </div>
                  );
                })}
                <CommonPopover
                    handleType={handleType}
                    val={ele?.selected_item?.label}
                    index={index}
                />
                {open && (
                  <ProductandCollectionPicker
                    // show = {open}
                    checkedIDs={[ele?.selected_item?.id ?? ""]}
                    onSelect={(e, ele, id) => {
                      const arr = [...builderFields];
                      if (e.target.checked) {
                        if (!ele?.selected_item) {
                          arr[elementIndex].data[index].selected_item = ele;
                          setBuilderFields(arr);
                          setOpen(false);
                        } else {
                          errToast(
                            "Only 1 Product can be selected for one slider",
                            "top"
                          );
                        }
                      } else {
                        arr[elementIndex].data[index].selected_item = {};
                        setBuilderFields(arr);
                      }
                    }}
                    setOpen={setOpen}
                    elementType={
                      builderFields[elementIndex].data[index].link_type
                    }
                  />
                )}
                <CommonSelect
                  label="Text alignment"
                  onChange={(e) => handleEditFields(e, index)}
                  name="text_alignment"
                  value={ele.text_alignment}
                  option={options}
                />
                {commonToggle(
                  "Content",
                  "show_content",
                  builderFields,
                  elementIndex,
                  setBuilderFields
                )}
              </Panel>
            </>
          );
        })}
      </Collapse>
      {/* </Space> */}
      <div className="SelectedPrdctBtn" onClick={handleAddBtn}>
        <button>
          {" "}
          <PlusCircleOutlined /> Add New Slider
        </button>
      </div>
    </>
  );
};

export function editcountDown(
  builderFields,
  elementIndex,
  handleEditElement,
  setBuilderFields
) {
  const onChange = (dates, dateStrings, flag) => {
    console.log(flag);
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      // console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
      let newArr = [...builderFields];
      newArr[elementIndex].countdown_date = {
        ...newArr[elementIndex].countdown_date,
        ["start_" + flag]: dateStrings[0],
        ["end_" + flag]: dateStrings[1],
      };
      setBuilderFields(newArr);
    } else {
      console.log("Clear");
    }
  };
  const options = [
    { label: "Layout 1", value: "layout_1" },
    { label: "Layout 2", value: "layout_2" },
    { label: "Layout 3", value: "layout_3" },
  ];
  const commonFields = [
    { name: "day_text", label: "Day text" },
    { name: "hours_text", label: "Hours text" },
    { name: "min_text", label: "Minute text" },
    { name: "sec_text", label: "Second text" },
  ];
  return (
    <>
      <CommonSelect
        label="Designs"
        className=" "
        onChange={handleEditElement}
        name="choose_layout"
        value={builderFields[elementIndex].choose_layout}
        option={options}
      />
      {commonFields.map((input, key) => {
        return (
          <div className=" " key={key}>
            <CommonInput
              label={input.label}
              value={builderFields[elementIndex][input.name]}
              onChange={handleEditElement}
              input={{
                name: input.name,
                type: "text",
                placeholder: input.label,
              }}
            />
          </div>
        );
      })}
      {builderFields[elementIndex].choose_layout !== "layout_1" && (
        <>
          <CommonInput
            label="Add Heading"
            value={builderFields[elementIndex].heading1}
            className="mb10"
            onChange={handleEditElement}
            input={{
              name: "heading1",
              type: "text",
              placeholder: "Edit First Heading",
            }}
          />
          {builderFields[elementIndex].choose_layout !== "layout_3" && (
            <CommonInput
              label="Add Sub Heading"
              value={builderFields[elementIndex].paragraph1}
              onChange={handleEditElement}
              input={{
                name: "paragraph1",
                type: "text",
                placeholder: "Edit First Heading",
              }}
            />
          )}
        </>
      )}
      <div className="countdownSetDate SD-common_input">
        <label>Set Date</label>
        <RangePicker
          size="large"
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          format="YYYY/MM/DD"
          onChange={(dates, dateStrings) =>
            onChange(dates, dateStrings, "date")
          }
        />
      </div>
      <div className="SD-common_input">
        <label>Set Time</label>
        <TimePicker.RangePicker
          size="large"
          onChange={(dates, dateStrings) =>
            onChange(dates, dateStrings, "time")
          }
        />
      </div>
    </>
  );
}
export const editVideo = (builderFields, elementIndex, handleEditElement) => {
  return (
    <CommonInput
      label="Enter Video URL"
      value={builderFields[elementIndex].video_url}
      onChange={handleEditElement}
      input={{
        name: "video_url",
        type: "text",
        placeholder: "Enter Video URL",
      }}
    />
  );
};

export function featuredProduct(
  open,
  setOpen,
  builderFields,
  elementIndex,
  setBuilderFields,
  handleEditElement
) {
  const options = [
    { label: "Left", value: "left" },
    { label: "Center", value: "center" },
    { label: "Right", value: "right" },
  ];
  return (
    <>
      <label>Select featured product</label>
      <div
        className="SD-featured_product SD-common_input"
        onClick={() => setOpen(true)}
      >
        {builderFields[elementIndex]?.featured_product
          ? builderFields[elementIndex].featured_product?.label
          : "Select Featured"}
      </div>
      <CommonInput
        label="Title"
        value={builderFields[elementIndex].featured_title}
        onChange={handleEditElement}
        input={{
          name: "featured_title",
          type: "text",
          placeholder: "Enter Title",
        }}
      />

      <CommonInput
        label="Subtitle"
        value={builderFields[elementIndex].subtitle_text}
        onChange={handleEditElement}
        input={{
          name: "subtitle_text",
          type: "text",
          placeholder: "Enter Subtitle",
        }}
      />
      <CommonSelect
        label="Text alignment"
        onChange={handleEditElement}
        name="text_align"
        value={builderFields[elementIndex].text_align}
        option={options}
      />
      {open && (
        <ProductandCollectionPicker
          // show = {open}
          checkedIDs={[builderFields[elementIndex]?.featured_product?.id ?? ""]}
          onSelect={(e, ele, id) => {
            const arr = [...builderFields];
            if (e.target.checked) {
              console.log(arr[elementIndex]);
              arr[elementIndex].featured_product = ele;
              setBuilderFields(arr);
              setOpen(false);
            } 
          }}
          setOpen={setOpen}
          elementType="products"
        />
      )}
    </>
  );
}

export function editAnnouncemenrBar(
  builderFields,
  elementIndex,
  setBuilderFields,
  handleEditElement,
  setOpen,
  open
) {
  const annimationOptions = [
    { label: "Select Option", value: "" },
    { label: "Left-Right", value: "right" },
    { label: "Right-Left", value: "left" },
  ];
  const handleType = (type, index) => {
    let prevData = [...builderFields];
    prevData[elementIndex].redirect_to = type;
    setBuilderFields(prevData);
    setOpen(true);
  };
  return (
    <>
      <CommonInput
        label="Title"
        value={builderFields[elementIndex].title}
        onChange={handleEditElement}
        input={{
          name: "title",
          type: "text",
          placeholder: "Enter Text",
        }}
      />
      <div className="SD-common_input">
        {commonToggle(
          "Icon",
          "show_icon",
          builderFields,
          elementIndex,
          setBuilderFields
        )}
        {builderFields[elementIndex].show_icon && <UploadImage className="" />}
      </div>

      <CommonSelect
        label="Animation"
        onChange={handleEditElement}
        name="animation_type"
        value={builderFields[elementIndex].animation_type}
        option={annimationOptions}
      />
      <CommonPopover
        handleType={handleType}
        val={builderFields[elementIndex]?.selected_item?.label}
        index={elementIndex}
      />
      {open && (
        <ProductandCollectionPicker
          checkedIDs={[builderFields[elementIndex]?.selected_item?.id ?? ""]}
          onSelect={(e, ele, id) => {
            const arr = [...builderFields];
            if (e.target.checked) {
              console.log(arr[elementIndex]);
              arr[elementIndex].selected_item = ele;
              setBuilderFields(arr);
              setOpen(false);
            }
          }}
          setOpen={setOpen}
          elementType={builderFields[elementIndex].redirect_to}
        />
      )}
    </>
  );
}
