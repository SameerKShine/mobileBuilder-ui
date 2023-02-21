import React from 'react'
import { Carousel } from "antd";

function HeroSlider({ viewData }) {
    // console.log(viewData);
    const contentStyle = {
      height: "160px",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79",
      width: "120px",
    };
    const buttonStyle = {
      width: viewData.style.button_size,
      backgroundColor:viewData.style.button_background_color,
      color:viewData.style.button_text_color,
      borderRadius:viewData.style.button_border+'px',
      fontSize: viewData.style.button_text_size
    }
    const titleStyle = {
      color:viewData.style.title_color,
      fontSize: viewData.style.heading_text_size,
      fontWeight: viewData.style.heading_weight
    }
    const subtitle_titleStyle = {
      color:viewData.style.subtitle_color,
      fontSize: viewData.style.subtitle_text_size,
      fontWeight: viewData.style.subtitle_weight
    }
    
    return (
      <div className="positionRelative">
        <Carousel
          autoplay={viewData?.autoplay ?? false}
          dots={viewData?.show_dots ?? false}
          dotsClass=""
        >
          {viewData.data.map((ele, index) => (
            <div style={contentStyle} key={index} className="hroSldrBx">
              <img width="100%" src={ele.image ?? Test} />
              {viewData.show_content && (
                <div
                  style={{ textAlign: ele.text_alignment }}
                  className="hroSldrTxt"
                >
                  <span style={titleStyle}>{ele.title_text}</span>
                  <span style={subtitle_titleStyle}>{ele.sub_title}</span>
                  <button style={buttonStyle}>{ele.button_text}</button>
                </div>
              )}
            </div>
          ))}
        </Carousel>
      </div>
    );
  }

export default HeroSlider