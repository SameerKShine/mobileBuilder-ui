import express from "express";

const webhook = express.Router();
webhook.post("/update", (req, res)=>{
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
});


  export default webhook;