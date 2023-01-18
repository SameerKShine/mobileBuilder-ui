import multer from "multer";
import path from "path";
import fs from 'fs'

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(req, "hhhhhh");

    cb(null, "");
  },

  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];

    // console.log(req.body.shop, "hhhhhh");

    const shop = req.body.shop;

    cb(
      null,

      `./public/uploads/-${file.fieldname}-${Date.now()}.${ext}`
      // file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

 const upload = multer({
   
  storage: multerStorage,

  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/svg+xml" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);

      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
}).single("menuIcon");

export const UploadImage = async(req, res) => {
console.log('enter here in upload function')
  upload(req, res, (err) => {
    if (err) {
      return res.send({
        status: false,
        
        error: err,
      });
    } else if (req.file) {
    }
    // console.log(req.file,"hahahah")

    res.send({ status: true, url: req.file.filename });
  });
}

//delete image

export async function deleteimg(req, res) {
  console.log(req.body)

  if (req.body.file.length != 0) {
    fs.unlinkSync(req.body.file);

    // console.log("successfully deleted");

    res.send({ status: true, msg: "Successfully! Image has been Deleted" });
  } else res.send({ status: false, msg: "no image" });
}