import React, { useState } from "react";
import postApi from "../../utils/postApi";
import { useAppBridge } from "@shopify/app-bridge-react";
import CommonModal from "../modal/CommonModal";
import { useAPI } from "../../globalState/getShop";
import {
  DeleteOutlined
} from '@ant-design/icons';
import { sucessToast } from "../notification/notification";

function UploadPicture({
  label,
  handleAddIcon,
  disable,
  onuploadImage,
  className,
  name
}) {
  const [uploadFile, setUploadFile] = useState("");
  const [serverImg, setServerImg] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // console.log(disable);
  const {app} = useAPI();

  const handleUploadImage = async (e) => {
    // setUploadFile(URL.createObjectURL(e.target.files[0]));
    // const img = new Image();
    // img.src = uploadFile;
 const prevImg = URL.createObjectURL(e.target.files[0])
    console.log("enter in valid condition", e.target.files[0]);
    const formData = new FormData();
    setErrorMessage("");
    formData.append("menuIcon", e.target.files[0]);
    const res = postApi("uploadImage", formData, app);
    res
      .then((data) => {
        // console.log(data);
        setServerImg(data.url);
        setUploadFile(data.url)
        onuploadImage(data.url, e.target.name, prevImg)
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async () => {
    console.log(serverImg);
    const res =  postApi(
      "deleteImage",
      { file: serverImg },
      app
    );
    console.log(res);
    res.then((data) => {
      setServerImg('')
      setUploadFile('')
      onuploadImage("")
      sucessToast(data.msg,'top')
    }).catch((err)=>console.log(err))
  };
  return (
    <div className={className}>
      <label>{label ?? ""}</label>
      <input disabled={disable} type="file" name={name} onChange={handleUploadImage} />
      <div>
        {uploadFile !== "" && (
          <>
            {" "}
            <span>Preview Image</span>
            <img width="20%" src={uploadFile} />
            <CommonModal
              buttonText={<DeleteOutlined />}
              button={{ ok: "yes", cancel: "Cancel" }}
              okFunc={handleDelete}
              title={
                <h2 className="modalTitle" style={{ color: "red" }}>
                  Are you sure you want to delete parmanently
                </h2>
              }
            />
          </>
        )}
      </div>
      {/* <p style={{ color: "red" }}>{errorMessage}</p> */}
    </div>
  );
}

export default UploadPicture;
