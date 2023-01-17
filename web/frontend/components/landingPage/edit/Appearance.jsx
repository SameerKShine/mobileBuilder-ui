import React, { useState } from "react";
import { Slider_field, CommonInput, CommonSelect, Color_field } from "../../../common/elements/commonElements";
import { Icon } from "@shopify/polaris";
import {
  ButtonCornerPillMajor,
  ButtonCornerRoundedMajor,
  ButtonCornerSquareMajor,
} from "@shopify/polaris-icons";

function Appearance({
  elementType,
  handleEditElement,
  data,
  fieldIndex,
  setBuilderFields,
}) {

  const eleValue = data[fieldIndex]?.style
  const onChange = (newValue, flag) => {
    console.log(flag);
    let newData = [...data];
    console.log(newData[fieldIndex]);
    newData[fieldIndex].style[flag] = newValue;
    setBuilderFields(newData);
  };

  const margin_padding = () => {
    const center_margin = [
      { name: "margin_top", label: "Top" },
      { name: "margin_bottom", label: "Bottom" },
      { name: "margin_left", label: "Left" },
      { name: "margin_right", label: "Right" },
    ]
    return (
      <>
        <div className="SD-common-margin">
          <h2 className="SD-section-heading">Spacing</h2>
          <div className="margin_padding_fields">
            {center_margin.map((input, index) => (
              // <div  key={index}>
              <CommonInput
                label={input.label}
                value={data[fieldIndex]?.style[input.name] ?? "0"}
                onChange={(e) =>
                  handleEditElement(e.target.value, e.target.name)
                }
                input={{
                  name: input.name,
                  type: "number",
                  min: "0",
                }}
              />
              // </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  function colorField_group (options) {
return(
  <div className="SD-colorFieldSection SD-common-margin">
  <h2 className="SD-section-heading">Color</h2>
  <div className="color_fieldWrapper">
    {options.map((inp, index) => (
      <Color_field
        label={inp.label}
        value={eleValue[inp.name]}
        name={inp.name}
        onChange={(e) =>
          handleEditElement(e.target.value, e.target.name)
        }
      />
    ))}
  </div>
</div>
)
  }

  const styleTitle = () => {
    const titleStyle = () => {
      const colorFields = [
        { label: "Heading", name: "heading_color" },
        { label: "Sub heading", name: "subheading_color" },
      ];

      return (
        <>
        {colorField_group(colorFields)}
          <div className="SD-slider_group SD-common-margin">
            <h2 className="SD-section-heading">Font</h2>
            <Slider_field
            label = 'Heading'
            max_range = {28}
            min_range = {18}
            step = ''
            val = {eleValue.heading_size}
            onChange={(e) => onChange(e, 'heading_size')}
            />
            <Slider_field
            label = 'Subheading size'
            max_range = {24}
            min_range = {12}
            step = ''
            val = {eleValue.subheading_size}
            onChange={(e) => onChange(e, 'subheading_size')}
            />
             <Slider_field
            label = 'Heading weight'
            max_range = {900}
            min_range = {100}
            step = {100}
            val = {eleValue.heading_weight}
            onChange={(e) => onChange(e, 'heading_weight')}
            />
            <Slider_field
            label = 'Sub heading size'
            max_range = {900}
            min_range = {100}
            step = {100}
            val = {eleValue.subheading_weight}
            onChange={(e) => onChange(e, 'subheading_weight')}
            />
          </div>

          {margin_padding()}
        </>
      );
    };
    const dividerStyle = () => {
      return (
        <>
          <Color_field
            label="Border color"
            value={data[fieldIndex]?.style?.color}
            name="color"
            onChange={(e) => handleEditElement(e.target.value, e.target.name)}
          />
          <div className="SD-slider_group">
          <Slider_field
            label = 'Border size'
            max_range = {8}
            min_range = {1}
            step = {1}
            val = {eleValue.size}
            onChange={(e) => onChange(e, 'size')}
            />
                <Slider_field
            label = 'Border width'
            max_range = {100}
            min_range = {1}
            step = {1}
            val = {eleValue.width}
            onChange={(e) => onChange(e, 'width')}
            />
          </div>

          {margin_padding()}
        </>
      );
    };
    const border_radius = (label, field) => {
      return (
        <div className="SD-border_radius_edit">
          <label htmlFor="">{label}</label>
          <div className="border-radius-sec">
            <a
              className={
                data[fieldIndex]?.style[field] == "0" &&
                "border-radius-icon-active"
              }
              onClick={() => onChange("0", field)}
            >
              <Icon
                source={ButtonCornerSquareMajor}
                color={
                  data[fieldIndex]?.style[field] == "0" ? "interactive" : "base"
                }
              />
            </a>
            <a
              className={
                data[fieldIndex]?.style[field] == "5" &&
                "border-radius-icon-active"
              }
              onClick={() => onChange("5", field)}
            >
              <Icon
                source={ButtonCornerRoundedMajor}
                color={
                  data[fieldIndex]?.style[field] == "5" ? "interactive" : "base"
                }
              />
            </a>
            <a
              className={
                data[fieldIndex]?.style[field] == "20" &&
                "border-radius-icon-active"
              }
              onClick={() => onChange("20", field)}
            >
              <Icon
                source={ButtonCornerPillMajor}
                color={
                  data[fieldIndex]?.style[field] == "20"
                    ? "interactive"
                    : "base"
                }
              />
            </a>
          </div>
        </div>
      );
    };

    const hero_slider_style = () => {
      const options = [
        { label: "Small", value: "33%" },
        { label: "Medium", value: "66%" },
        { label: "Large", value: "90%" },
      ];
      const colorFields = [
        { label: "Button background", name: "button_background_color" },
        { label: "Button text", name: "button_text_color" },
        { label: "title", name: "title_color" },
        { label: "Subtitle", name: "subtitle_color" },
      ];

      return (
        <>
          <div className="btnSize_btnBorder SD-common-margin">
            <h2 className="SD-section-heading">Button</h2>
            <CommonSelect
              label="Size"
              onChange={(e) => handleEditElement(e.target.value, e.target.name)}
              className="editSection"
              name="button_size"
              value={data[fieldIndex]?.style?.button_size}
              option={options}
            />
            {border_radius("Border", "button_border")}
          </div>
          <div className="SD-slider_group SD-common-margin">
            <h2 className="SD-section-heading">Font</h2>
            <Slider_field
            label = 'Heading'
            max_range = {80}
            min_range = {24}
            step = ''
            val = {eleValue.heading_text_size}
            onChange={(e) => onChange(e, 'heading_text_size')}
            />
            <Slider_field
            label = 'Subtitle'
            max_range = {36}
            min_range = {18}
            step = ''
            val = {eleValue.subtitle_text_size}
            onChange={(e) => onChange(e, 'subtitle_text_size')}
            />
             <Slider_field
            label = 'Button text'
            max_range = {24}
            min_range = {12}
            step = ''
            val = {eleValue.button_text_size}
            onChange={(e) => onChange(e, 'button_text_size')}
            />

                <Slider_field
            label = 'Heading bold'
            max_range = {900}
            min_range = {100}
            step = {100}
            val = {eleValue.heading_weight}
            onChange={(e) => onChange(e, 'heading_weight')}
            />
                <Slider_field
            label = 'Subtitle bold'
            max_range = {900}
            min_range = {100}
            step = {100}
            val = {eleValue.subtitle_weight}
            onChange={(e) => onChange(e, 'subtitle_weight')}
            />
          </div>
          {colorField_group(colorFields)}
          {/* <div className="SD-colorFieldSection SD-common-margin">
            <h2 className="SD-section-heading">Color</h2>
            <div className="color_fieldWrapper">
              {colorFields.map((inp, index) => (
                <Color_field
                  label={inp.label}
                  value={data[fieldIndex]?.style[inp.name]}
                  name={inp.name}
                  onChange={(e) =>
                    handleEditElement(e.target.value, e.target.name)
                  }
                />
              ))}
            </div>
          </div> */}
          {margin_padding()}
        </>
      );
    };
    const countdownEdit = () => {
      const options = [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ];
      const val = data[fieldIndex];
      console.log(val);
      const gradiantClr = [
        { label: "Gradient Color 1", name: "gradient_color1" },
        { label: "Gradient Color 2", name: "gradient_color2" },
      ];
      // const colorFields = [{label:'', name:''}]
      return (
        <>
          <CommonSelect
            label="Text Position"
            onChange={(e) => handleEditElement(e.target.value, e.target.name)}
            name="text_alignment"
            value={val?.style?.text_alignment}
            option={options}
          />
          <div className="SD-common-margin">
            <h2 className="SD-section-heading">Background</h2>
            <div className="appearance_background_optn SD-common_input">
              <div
                className={
                  val.style.background_style.type === "image"
                    ? "active_bgType"
                    : ""
                }
                onClick={
                  val.style.background_style.type !== "image"
                    ? () => handleEditElement("image", "background_style")
                    : () => {}
                }
              >
                Image
              </div>
              <div
                onClick={
                  val.style.background_style.type !== "gradiant"
                    ? () => handleEditElement("gradiant", "background_style")
                    : () => {}
                }
                className={
                  val.style.background_style.type === "gradiant"
                    ? "active_bgType"
                    : ""
                }
              >
                Gradiant
              </div>
              <div
                onClick={
                  val.style.background_style.type !== "color"
                    ? () => handleEditElement("color", "background_style")
                    : () => {}
                }
                className={
                  val.style.background_style.type === "color"
                    ? "active_bgType"
                    : ""
                }
              >
                Color
              </div>
            </div>
          </div>
          {val?.style?.background_style?.type == "image" ? (
            <CommonInput
              label="Background Image URL"
              value={val?.style?.background_image}
              onChange={(e) => handleEditElement(e.target.value, e.target.name)}
              input={{
                name: "background_image",
                type: "text",
              }}
            />
          ) : val?.style?.background_style?.type == "color" ? (
            <Color_field
              label="Background Color"
              value={data[fieldIndex]?.style?.background_style.countdown_background_color}
              name="countdown_background_color"
              onChange={(e) => handleEditElement(e.target.value, e.target.name)}
            />
          ) : (
            <>
              {gradiantClr.map((inp, index) => (
                <div key={index} className=" ">
                  <Color_field
                    label={inp.label}
                    // value = {data[fieldIndex]?.style?.background_style[inp.name] ?? '#fff'}
                    name={inp.name}
                    onChange={(e) =>
                      handleEditElement(e.target.value, e.target.name)
                    }
                  />
                </div>
              ))}
            </>
          )}
          <Color_field
            label="Timer Text Color"
            value={data[fieldIndex]?.style?.timer_color}
            name="timer_color"
            onChange={(e) => handleEditElement(e.target.value, e.target.name)}
          />

          {val.choose_layout !== "layout_3" && (
            <Color_field
              label="Timer Background Color"
              value={data[fieldIndex]?.style?.timer_background_color}
              name="timer_background_color"
              onChange={(e) => handleEditElement(e.target.value, e.target.name)}
            />
          )}
          {val.choose_layout == "layout_2" && (
            <Color_field
              label="Sub Heading Color"
              value={data[fieldIndex]?.style?.sub_heading_color}
              name="sub_heading_color"
              onChange={(e) => handleEditElement(e.target.value, e.target.name)}
            />
          )}
          {val.choose_layout !== "layout_1" && (
            <Color_field
              label="Heading Color"
              value={data[fieldIndex]?.style?.heading_color}
              name="heading_color"
              onChange={(e) => handleEditElement(e.target.value, e.target.name)}
            />
          )}
          <div className="SD-slider_group">
            <h2 className="SD-section-heading"> Font Size </h2>
            {val.choose_layout !== "layout_1" &&
               <Slider_field
               label = 'Heading'
               max_range = {52}
               min_range = {12}
               step = ''
               val = {eleValue.heading_text_size}
               onChange={(e) => onChange(e, 'heading_text_size')}
               />}
            {val.choose_layout !== "layout_1" &&
              val.choose_layout !== "layout_3" &&
              <Slider_field
              label = 'Subtitle'
              max_range = {52}
              min_range = {12}
              step = ''
              val = {eleValue.subtitle_text_size}
              onChange={(e) => onChange(e, 'subtitle_text_size')}
              />}

            <h2 className="SD-section-heading"> Line Space </h2>
            {val.choose_layout !== "layout_1" &&
            <Slider_field
            label = 'Heading'
            max_range = {2.0}
            min_range = {0.2}
            step = {0.1}
            val = {eleValue.heading_line_height}
            onChange={(e) => onChange(e, 'heading_line_height')}
            />}
            {val.choose_layout !== "layout_1" &&
              val.choose_layout !== "layout_3" &&
              <Slider_field
            label = 'Subtitle'
            max_range = {1.9}
            min_range = {0.2}
            step = {0.1}
            val = {eleValue.subtitle_line_height}
            onChange={(e) => onChange(e, 'subtitle_line_height')}
            />}
          </div>
          {val.choose_layout !== "layout_1" &&
            val.choose_layout !== "layout_3" &&
            border_radius("Counter Box Radius", "box_radius")}

          {margin_padding()}
        </>
      );
    };
    return (
      <>
        {elementType === "header" ? (
          titleStyle()
        ) : elementType === "divider" ? (
          dividerStyle()
        ) : elementType === "text_divider" ? (
          <Color_field
            label="Text Color"
            value={data[fieldIndex]?.style?.color}
            name="color"
            onChange={(e) => handleEditElement(e.target.value, e.target.name)}
          />
        ) : elementType === "featured_product" ? (
          <>
            <div className="SD-colorFieldSection">
              <h2 className="SD-section-heading">Color</h2>{" "}
              <div className="color_fieldWrapper">
                {[
                  { label: "Heading", name: "heading_color" },
                  { label: "Subtitle", name: "subtitle_color" },
                ].map((inp, index) => {
                  return (
                    <Color_field
                      label={inp.label}
                      value={data[fieldIndex]?.style[inp.name]}
                      name={inp.name}
                      onChange={(e) =>
                        handleEditElement(e.target.value, e.target.name)
                      }
                    />
                  );
                })}
              </div>
            </div>

            <div className="SD-slider_group SD-common-margin">
              <h2 class="SD-section-heading">Heading</h2>
              <Slider_field
            label = 'Header Size'
            max_range = {24}
            min_range = {12}
            step = ''
            val = {eleValue.header_size}
            onChange={(e) => onChange(e, 'header_size')}
            />
              <Slider_field
            label = 'Subtitle Size'
            max_range = {24}
            min_range = {12}
            step = ''
            val = {eleValue.subtitle_size}
            onChange={(e) => onChange(e, 'subtitle_size')}
            />
            </div>
            {margin_padding()}
          </>
        ) : elementType === "countdown_offer" ? (
          <>{countdownEdit()}</>
        ) : elementType === "video" ? (
          <>{margin_padding()}</>
        ) : elementType === "hero_slider" || elementType === "offer" ? (
          <> {hero_slider_style()} </>
        ) : elementType === "products" ||
          elementType === "collection_list" ||
          elementType === "collections" ? (
          <> {margin_padding()}</>
        ) : elementType === "announcement_bar" ? (
          <>
            <div className="SD-colorFieldSection">
              <h2 className="SD-section-heading">Color</h2>
              <div className="color_fieldWrapper">
                {[
                  { label: "Background", name: "background_color" },
                  { label: "Text", name: "text_color" },
                ].map((inp, index) => {
                  return (
                    <Color_field
                      label={inp.label}
                      value={data[fieldIndex]?.style[inp.name]}
                      name={inp.name}
                      onChange={(e) =>
                        handleEditElement(e.target.value, e.target.name)
                      }
                    />
                  );
                })}
              </div>
            </div>
            {margin_padding()}
          </>
        ) : (
          "style"
        )}
      </>
    );
  };
  return <div>{styleTitle()}</div>;
}

export default Appearance;
