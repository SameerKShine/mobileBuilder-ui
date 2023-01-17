import React, { useState } from "react";
// import { menu_icons } from "../../../common/icons";
import axios from "axios";
import { CommonInput } from "../../../common/elements/commonElements";
import UploadPicture from "../../../common/elements/UploadPicture";
import ProductandCollectionPicker from "../../../common/elements/ProductCollectionPicker";

function CustomiseIcon({ index, data, setMenu, setEditElement }) {
  const [getImageUrl, setImgUrl] = useState('')
  const [open, setOpen] = useState(false)
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

  const selectCollection =(
    <>
    {
      data.elements[index].id == 'Collections' &&
      <>
      <label>Select Collection</label>
      <div
        className="SD-featured_product SD-common_input"
        onClick={() => setOpen(true)}
      >
        {data.elements[index]?.collection_details
          ? data.elements[index]?.collection_details?.label
          : "Select Collection"}
      </div>
      </>
    }
    </>
  )
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
      {selectCollection}
      {open && (
        <ProductandCollectionPicker
          // show = {open}
          checkedIDs={[data.elements[index]?.collection_details?.id??""]}
          onSelect={(e, ele, id) => {
            const arr = {...data};
            if (e.target.checked) {
              console.log(arr.elements[index]);
              arr.elements[index].collection_details = ele;
              setMenu(arr);
              setOpen(false);
            } 
          }}
          setOpen={setOpen}
          elementType="collections"
        />
      )}
    </div>
  );
}

export default CustomiseIcon;
