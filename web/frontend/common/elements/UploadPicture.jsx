import React, {useState} from 'react'
import axios from 'axios'

function UploadPicture({
    label,
    handleAddIcon,
    disable,
    onuploadImage,
    className,
  }) {

    const [uploadFile, setUploadFile] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    console.log(disable);
    const handleUploadImage = async (e) => {
      console.log(e.target.files[0]);
      onuploadImage(URL.createObjectURL(e.target.files[0]));
      if (e.target.files[0].size <= 1600) {
        console.log("enter in valid condition", e.target.files[0]);
        const formData = new FormData();
        setErrorMessage("");
        formData.append("menuIcon", e.target.files[0]);
        setUploadFile(URL.createObjectURL(e.target.files[0]));
        //300×150
        await axios
          .post("/api/admin/uploadImage", formData)
          .then((res) => handleAddIcon(res.data.url));
      } else {
        console.log("enter in Else");
        setErrorMessage("Image Should be 150 X 150");
        setUploadFile("");
      }
    };
  
    console.log(uploadFile);
  return (
    <div className={className}>
    <label>{label ?? ""}</label>
    <input disabled={disable} type="file" onChange={handleUploadImage} />
    <div>
      {uploadFile !== "" && <span>Preview Image</span>}
      <img width="20%" src={uploadFile} />
    </div>
    {/* <p style={{ color: "red" }}>{errorMessage}</p> */}
  </div>
  )
}

export default UploadPicture