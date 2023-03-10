import React from "react";
import { Col, InputNumber, Row, Slider } from "antd";

export function CommonInput(props) {
  return (
    <div key={props.uniqueKey} className={`common_input  ${props.className}`}>
      {props.label&&<label>{props.label}</label>}
      <input
        className={"SD-common_input " + props.className}
        onChange={props.onChange}
        //   style={props.style}
        value={props.value}
        {...props.input}
        autoComplete="off"
      />
    </div>
  );
}

export function CommonSelect(props) {
  return (
    <>
      <div className={`common_input  ${props.className}`}>
        <label>{props.label}</label>
        <select
          className="form-control SD-common_input "
          onChange={props.onChange ?? ""}
          name={props.name}
          value={props.value}
        >
          {props.option.map((opt, index) => (
            <option key={index} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export const Color_field = (props) => {
  return (
    <div className={`SD-color_field SD-countdown ${props.mainClass ?? ""}`}>
      <label>{props.label}</label>
      <div className="color_fieldDiv backGroundSection SD-common_input">
        <input
          type="color"
          value={props.value ?? "#fff"}
          name={props.name ?? "color"}
          onChange={props.onChange}
        />
        <span>{props.value ?? "#fff"}</span>
      </div>
    </div>
  );
};

export const Slider_field = (props) => {
    return (
        <Row>
          <Col span={16}>{props.label}</Col>
          <Col span={16}>
            <Slider
              min={props.min_range ?? 1}
              max={props.max_range}
              step={props.step ?? ""}
            //   onChange={(e) => onChange(e, flag)}
              onChange={props.onChange}
              // value={typeof inputValue === 'number' ? inputValue : 0}
              value={props.val}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              className="SD-slider_input"
              min={props.min_range ?? 1}
              max={props.max_range}
              style={{
                margin: "0 16px",
              }}
              // value={inputValue}
              value={props.val}
              onChange={props.onChange}
            />
          </Col>
        </Row>
      );
}