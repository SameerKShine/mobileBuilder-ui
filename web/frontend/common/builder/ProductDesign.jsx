import React from 'react'
import DummyImage from '../../assets/images/dummyImages/dummyImage.png'

function ProductDesign({ viewData }) {
    console.log(viewData);
    console.log("Products File");
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
  return (
    <>
    <div className="jstBtwn">
      {viewData.show_heading && <h2>{viewData.heading ?? "Products"}</h2>}
      <a>View All</a>
    </div>
    <>
      <div className="grid-container">
        {viewData.data.length > 0 ? (
          viewData.data.map((ele, index) => (
            <div key={index} className={`grid-item ${className}`}>
              <img width={100} src={ele?.image?.url ?? DummyImage} />
              <div className="product-text">
                <h6>{ele.label}</h6>
                {viewData?.show_price && <p>$ {ele?.price?.amount}</p>}
              </div>
            </div>
          ))
        ) : (
          <>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6>Title</h6>
                {viewData?.show_price && <p>$ 345</p>}
              </div>
            </div>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6>Title</h6>
                {viewData?.show_price && <p>$ 345</p>}
              </div>
            </div>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6>Title</h6>
                {viewData?.show_price && <p>$ 345</p>}
              </div>
            </div>
            <div className={`grid-item ${className}`}>
              <img width={100} src={DummyImage} />
              <div className="product-text">
                <h6>Title</h6>
                {viewData?.show_price && <p>$ 345</p>}
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