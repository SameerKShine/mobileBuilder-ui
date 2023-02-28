import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import DummyImage from "../../assets/images/dummyImages/dummyImage.png";
import { ArrowRightOutlined } from "@ant-design/icons";

function CollectionDesign({viewData, app_appearance}) {

  let primary_color = "#000"
  let secondary_color = "#000"
  if(app_appearance){
     primary_color = app_appearance?.primary_color??"#000"
     secondary_color = app_appearance?.secondary_color??"#000"
  }
 
    return (
        <>
          <div className="jstBtwn">
            {viewData.show_heading && <h2 style={{"color":primary_color??"#000"}}>{viewData.heading ?? "Collection"}</h2>}
            {viewData.show_viewAll &&<a>{viewData.viewAll ?? "View All"}</a>}
          </div>
    
          {viewData.data.length > 0 ? (
            viewData.choose_layout == "layout_1" ? (
              <div className="collection_swiper_lay_1">
                <Swiper
                  slidesPerView={10}
                  spaceBetween={40}
                  centeredSlides={true}
                  className="mySwiper"
                >
                  {viewData.data.map((ele, index) => (
                    <SwiperSlide key={index}>
                      <div className="custom_slide_section">
                        <img width={100} src={ele?.image?.url ?? DummyImage} />
    
                        {viewData.show_collection_title && <span style={{"color":secondary_color??"#000"}}>{ele.label}</span>}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : viewData.choose_layout == "layout_2" ? (
              <div className="CollectionListElement">
                <div className="SD-grid_slide">
                  <div className="grid_section">
                    {viewData.data.slice(0, 3).map((ele, index) => (
                      <div key={index} className={`pro-item ${index == 2 ? "w100" : "w50"}`}>
                        <figure>
                          <img
                            src={ele?.image?.url ?? DummyImage}
                            alt="pro img"
                            className="img-fluid"
                          />
                        </figure>
                        <p style={{"color":secondary_color??"#000"}}>{ele.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : viewData.choose_layout == "layout_3" ? (
              <div className="layout3_swiper">
                <Swiper
                  className="slider layout_3"
                  spaceBetween={10}
                  slidesPerView={1.4}
                  centeredSlides
                  loop
                >
                  {viewData.data.map((ele, index) => (
                    <SwiperSlide key={index}>
                      <div className="grdClr_sldr"></div>
                      <img width={100} src={ele?.image?.url ?? DummyImage} />
    
                      <div className="SwiperSlideTxt">
                        {viewData.show_collection_title && <h3>{ele.label}</h3>}
                        <p  style={{"color":secondary_color??"#000"}}>Oversized Turtleneck Sweater</p>
                        <button>Shop</button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : viewData.choose_layout == "layout_4" ? (
              <>
                {viewData.data.slice(0, 3).map((ele, index) => (
                  <div key={index} className="cat-landscape4">
                    <div className="pro-item">
                      <div className="proItemBx">
                        <div className="proItemBxImg">
                          <img
                            src={ele?.image?.url ?? DummyImage}
                            alt="pro img"
                            className="img-fluid"
                          />
                        </div>
                        <div className="proItemBxText">
                          <div>
                            {viewData.show_collection_title && <h3>{ele.label}</h3>}
                            <p style={{"color":secondary_color??"#000"}}>Collection Description</p>
                          </div>
    
                          <span className="proItemBxIcn">
                            <ArrowRightOutlined className="arrowIcn" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              "No Style Found"
            )
          ) : // Below Dummy Data
          viewData.choose_layout == "layout_1" ? (
            <Swiper slidesPerView={4} spaceBetween={30} className="mySwiper">
              {" "}
              {Array.from({ length: 5 }).map((ele, index) => (
                <SwiperSlide key={index}>
                  <div className="custom_slide_section">
                    <img width={100} src={DummyImage} />
    
                    {viewData.show_collection_title && <span style={{"color":secondary_color??"#000"}}>Add here2</span>}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : viewData.choose_layout == "layout_2" ? (
            <div className="CollectionListElement">
              <div className="SD-grid_slide">
                <div className="grid_section">
                  <div className="pro-item w50">
                    <figure>
                      <img src={DummyImage} alt="pro img" className="img-fluid" />
                    </figure>
                    <p style={{"color":secondary_color??"#000"}}>Test</p>
                  </div>
    
                  <div className="pro-item w50">
                    <figure>
                      <img src={DummyImage} alt="pro img" className="img-fluid" />
                    </figure>
                    <p style={{"color":secondary_color??"#000"}}>Test</p>
                  </div>
    
                  <div className="pro-item w100">
                    <figure>
                      <img src={DummyImage} alt="pro img" className="img-fluid" />
                    </figure>
                    <p style={{"color":secondary_color??"#000"}}>Test</p>
                  </div>
                </div>
              </div>
            </div>
          ) : viewData.choose_layout == "layout_3" ? (
            <div className="layout3_swiper">
              <Swiper
                className="slider layout_3"
                spaceBetween={10}
                slidesPerView={1.4}
                centeredSlides
                loop
              >
                {Array.from({ length: 5 }).map((ele, index) => (
                  <SwiperSlide key={index}>
                    <div className="grdClr_sldr"></div>
                    <img width={100} src={DummyImage} />
                    <div className="SwiperSlideTxt">
                      {viewData.show_collection_title && <h3>Collection Title</h3>}
                      <p style={{"color":secondary_color??"#000"}}>Collection Description</p>
                      <button>Shop Now</button>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            Array.from({ length: 3 }).map((ele, index) => (
              <div className="cat-landscape4" key={index}>
                <div className="pro-item">
                  <div className="proItemBx">
                    <div className="proItemBxImg">
                      <img src={DummyImage} alt="pro img" className="img-fluid" />
                    </div>
                    <div className="proItemBxText">
                      <div>
                        <h3 style={{"color":secondary_color??"#000"}}>Collection Title</h3>
                        <p>Collection Description</p>
                      </div>
    
                      <span className="proItemBxIcn">
                        <ArrowRightOutlined className="arrowIcn" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </>
      );
}

export default CollectionDesign