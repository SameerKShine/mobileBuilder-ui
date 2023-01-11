import React, { useState } from "react";
// import { menu_icons } from "../../../common/icons";
import axios from "axios";
import { CommonInput } from "../../../common/elements/commonElements";
import UploadPicture from "../../../common/elements/UploadPicture";

function CustomiseIcon({ index, data, setMenu, setEditElement }) {
  const [getImageUrl, setImgUrl] = useState('')
  const handleChange = (value, name, iconUrl) => {
    console.log(value);
    console.log(name);
    const newD = { ...data };
    if (name == "display_icon") {
      newD.elements[index].icon_url = iconUrl;
    }
    newD.elements[index][name] = value;
    //
    setMenu(newD);
  };
  //   const uploadIcon = async(e) => {
  //     if(!image.name.match(/\.(jpg|jpeg|png|svg)$/)){
  //     if(e.target.files[0].size <= 1600 ){
  //       const formData = new FormData();
  //       formData.append('menuIcon',e.target.files[0]);
  //       // setUploadFile(URL.createObjectURL(e.target.files[0]))
  //       //300×150
  //       await axios
  //       .post(api_url, formData)
  //       .then((res)=>console.log(res))
  //       // setErrorMessage('')
  // }

  //    else{
  //       // setErrorMessage('Image Should be 150 X 150')
  //       // setUploadFile('')
  //   }
  //   }
  // }

  console.log(getImageUrl.length)
  const deleteImage = async() => {
      await axios
   .post("/api/deleteImage", {file:getImageUrl})
   .then((res)=>console.log(res))
   .catch((err)=>console.log(err))
  }
  const uploadImage = (e) =>{
    console.log(e)
    const newD = { ...data };
    newD.elements[index].icon_url = e;
    setMenu(newD);
  }
  console.log(data);
//   console.log(menu_icons[data.elements[index].id]);
  return (
    <div>
      {/* CustomiseIcon {index} */}
      <CommonInput
        className="editSection"
        value={data.elements[index].title}
        onChange={(e) => handleChange(e.target.value, e.target.name)}
        input={{
          name: "title",
          type: "text",
          placeholder: "Edit Text",
        }}
      />
      {/* <div className="menu_edit_icons">
        {menu_icons[data.elements[index].id.replace(/ /g, "_")].map(
          (img, i) => (
            <div
              key={i}
              onClick={() =>
                handleChange(
                  data.elements[index].id.replace(/ /g, "_") + i,
                  "display_icon",
                  img[data.elements[index].id.replace(/ /g, "_") + i]
                )
              }
            >
              <img
                width={20}
                src={img[data.elements[index].id.replace(/ /g, "_") + i]}
              />
            </div>
          )
        )}
      </div> */}
      <div>
        <UploadPicture onuploadImage = {uploadImage} disable={getImageUrl.length > 0 ? true:false} handleAddIcon={setImgUrl} />
        {getImageUrl.length > 0 &&<button onClick={deleteImage}>delete</button>}
      </div>
    </div>
  );
}

export default CustomiseIcon;
