import React from "react";

function CountDown({ eleType, style }) {

  let mainDivStyle = {
    margin: `${style.margin_top}px  ${style.margin_right}px  ${style.margin_bottom}px  ${style.margin_left}px `,
    padding: `${style.padding_top}px  ${style.padding_right}px  ${style.padding_bottom}px  ${style.padding_left}px `,
  };

  if(style.background_style.type == "color"){
    mainDivStyle ={
      ...mainDivStyle,
      backgroundColor: style.background_style.countdown_background_color
    }
  } else if(style.background_style.type == "gradiant") {
      mainDivStyle={
        ...mainDivStyle,
        backgroundImage: `linear-gradient(${style.background_style.countdown_gradient_color1}, ${style.background_style.countdown_gradient_color2})`,
      }
  } else if(style.background_style.type == "image"){
    mainDivStyle={
      ...mainDivStyle,
      backgroundImage: `url(${style.background_style.countdown_background_image})`,
    }
  }
  const headingTyle = {
    color: style.heading_color,
    fontSize: style.heading_text_size,
    lineHeight: style.heading_line_height,
  };
  const subheading_style = {
    color: style.sub_heading_color,
    fontSize: style.subtitle_text_size,
    lineHeight: style.subtitle_line_height,
  };
  const li_style = {
    backgroundColor: style.timer_background_color,
    color: style.timer_color,
  };
  return (
    <div>
      {eleType.choose_layout == "layout_1" ? (
        <>
          <div className="countDown_layout_1" style={mainDivStyle}>
            <div id="countdown" style={{ textAlign: style.text_alignment }}>
              <ul>
                <li style={li_style}>
                  <span id="days">3</span>
                  {eleType.day_text}
                </li>
                <li style={li_style}>
                  <span id="hours">12</span>
                  {eleType.hours_text}
                </li>
                <li style={li_style}>
                  <span id="minutes">45</span>
                  {eleType.min_text}
                </li>
                <li style={li_style}>
                  <span id="minutes">10</span>
                  {eleType.sec_text}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : eleType.choose_layout == "layout_2" ? (
        <>
          <div className="countDown_layout_2" style={mainDivStyle}>
            <div id="countdown" style={{ textAlign: style.text_alignment }}>
              <h2 style={headingTyle}>{eleType.heading1}</h2>
              <p style={subheading_style}>{eleType.paragraph1}</p>
              <ul>
                <li style={li_style}>
                  <span id="days">3</span>
                  {eleType.day_text}
                </li>
                <li style={li_style}>
                  <span id="hours">12</span>
                  {eleType.hours_text}
                </li>
                <li style={li_style}>
                  <span id="minutes">45</span>
                  {eleType.min_text}
                </li>
                <li style={li_style}>
                  <span id="minutes">10</span>
                  {eleType.sec_text}
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="countDown_layout_3" style={mainDivStyle}>
            <div id="countdown" style={{ textAlign: style.text_alignment }}>
              <h2 style={headingTyle}>{eleType.heading1}</h2>
              <ul>
                <li
                  style={{
                    color: style.timer_color,
                  }}
                >
                  <span style={{ borderColor: style.timer_color }} id="days">
                    3
                  </span>
                  {eleType.day_text}
                </li>
                <li
                  style={{
                    color: style.timer_color,
                  }}
                >
                  <span style={{ borderColor: style.timer_color }} id="hours">
                    12
                  </span>
                  {eleType.hours_text}
                </li>
                <li
                  style={{
                    color: style.timer_color,
                  }}
                >
                  <span style={{ borderColor: style.timer_color }} id="minutes">
                    45
                  </span>
                  {eleType.min_text}
                </li>
                <li
                  style={{
                    color: style.timer_color,
                  }}
                >
                  <span style={{ borderColor: style.timer_color }} id="minutes">
                    10
                  </span>
                  {eleType.sec_text}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CountDown;
