import React from 'react'
import DummyImage from '../../assets/images/dummyImages/dummyImage.png'

function ProductDesign({ viewData, app_appearance }) {
  let primary_color = "#000"
  let secondary_color = "#000"
  if(app_appearance){
     primary_color = app_appearance?.primary_color??"#000"
     secondary_color = app_appearance?.secondary_color??"#000"
  }
    const layOut = viewData.choose_layout;
    let className = "";
    if (layOut == "layout_1") {
      className = "lay1";
    } else if (layOut == "layout_2") {
      className = "lay2";
    } else if (layOut == "layout_3") {
      className = "lay3";
    } else {
      className = "lay4";
    }
    console.log(viewData)
  return (
    <>
    <div className="jstBtwn">
      {viewData.show_heading && <h2 style={{"color":primary_color??"#000"}}>{viewData.heading ?? "Products"}</h2>}
      {viewData.show_viewAll &&<a>{viewData.viewAll ?? "View All"}</a>}
    </div>
    <>
      <div className="grid-container">
        {viewData.data.length > 0 ? (
          viewData.data.map((ele, index) => (
            <div key={index} className={`grid-item ${className}`}>
              <img width={100} src={ele?.image?.url ?? DummyImage} />
              <div className="product-text">
                <h6 style={{"color":secondary_color??"#000"}}>{ele.label}</h6>
                {viewData?.show_price && <p>$ {ele?.amount}</p>}
              </div>
            </div>
          ))
        ) : (
          <>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6  style={{"color":secondary_color??"#000"}}>Title</h6>
                {viewData?.show_price && <p  style={{"color":secondary_color??"#000"}}>$ 345</p>}
              </div>
            </div>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6  style={{"color":secondary_color??"#000"}}>Title</h6>
                {viewData?.show_price && <p  style={{"color":secondary_color??"#000"}}>$ 345</p>}
              </div>
            </div>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6  style={{"color":secondary_color??"#000"}}>Title</h6>
                {viewData?.show_price && <p  style={{"color":secondary_color??"#000"}}>$ 345</p>}
              </div>
            </div>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6  style={{"color":secondary_color??"#000"}}>Title</h6>
                {viewData?.show_price && <p  style={{"color":secondary_color??"#000"}}>$ 345</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  </>
  )
}

export default ProductDesign