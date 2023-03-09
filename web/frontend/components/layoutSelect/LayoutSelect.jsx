import React, { useState } from "react";

function LayoutSelect(props) {

  console.log(props.step)
  const [activeClass, setActiveClass] = useState("");
  let selectArry = []
  let heading = ""
  let tag = ""
  if(props.step == 3){
    heading = "Profile Page"
    tag = "profile_page_design"
    selectArry = [
      {
        name: "Profile Page 1",
        id: "profile_1",
        cover_img: "/assets/images/profile/ProfileStyle_1.png",
      },
      {
        name: "Profile Page 1",
        id: "profile_2",
        cover_img: "/assets/images/profile/ProfileStyle_2.png",
      },
      {
        name: "Profile Page 1",
        id: "profile_3",
        cover_img: "/assets/images/profile/ProfileStyle_3.png",
      },
      {
        name: "Profile Page 4",
        id: "profile_4",
        cover_img: "/assets/images/profile/ProfileStyle_4.png",
      },
    ];
  } else if(props.step == 4){
    heading = "Cart Page"
    tag = "cart_page_design"
    selectArry = [
      {
        name: "Cart Page 1",
        id: "cart_1",
        cover_img: "/assets/images/cart/cart1.png",
      },
      {
        name: "Cart Page 1",
        id: "cart_2",
        cover_img: "/assets/images/cart/cart2.png",
      },
      {
        name: "Cart Page 1",
        id: "cart_3",
        cover_img: "/assets/images/cart/cart3.png",
      }
    ];
  }else{
    heading = "Product Detail Page"
    tag = "product_detail_page_design"
    selectArry = [
      {
        name: "Product Detail Page 1",
        id: "product_detail_1",
        cover_img: "/assets/images/product_detail/pdp1.jpg",
      },
      {
        name: "Product Detail Page 1",
        id: "product_detail_2",
        cover_img: "/assets/images/product_detail/pdp2.jpg",
      },
      {
        name: "Product Detail Page 1",
        id: "product_detail_3",
        cover_img: "/assets/images/product_detail/pdp3.jpg",
      },
    ];
  }
const handleSelectLayout = (id) => {
    props.setLayoutSelect({...props.layoutSelection, [tag]:id})
}
console.log(props.layoutSelection)
  return (
    <div className="SD-publish_app">
      {props.pageSelectFunction}
      <h2 className="SD-section-heading">Select {heading} Design</h2>{" "}
      <div className="SD-profile-templates">
        {" "}
        <div className="profile-temp">
          {" "}
          {selectArry.map((temp, index) => (
            <div
              key={index}
              className="prfile-design"
              onClick={() => handleSelectLayout(temp.id)}
            >
              {" "}
              <h3>{temp.name}</h3>{" "}
              <img
                className={`${temp.id == props.layoutSelection[tag] && " active"}`}
                src={temp.cover_img}
              ></img>{" "}
            </div>
          ))}
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default LayoutSelect;
