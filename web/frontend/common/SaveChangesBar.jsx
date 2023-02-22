import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { errToast, sucessToast } from "./notification/notification";
import { useAPI } from "../globalState/getShop";
import { getSessionToken } from "@shopify/app-bridge-utils";
import SaveBar from "./navigation/SaveBar";
import postApi from "../utils/postApi";

function SaveChangesBar({ data, setDesignName, flag, navigate, step, setStep }) {
  const [allNames, setAllNames] = useState([]);
  const [errorName, setErrorName] = useState("");
  
  const { app } = useAPI();
  // const getShop = 'test-updatedpre.myshopify.com'
  // useEffect(()=>{
  //   console.log(checkVal, ' checkVal')
  //   if(checkVal !== builderFields){
  //     setShowBtn(true)
  //   } else{
  //     setShowBtn(false)
  //   }
  // }, [builderFields])
  async function getAllNames() {
    const sessionToken = await getSessionToken(app);
    // console.log(sessionToken)
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    let newArr = [];
    axios
      .get("/api/admin/getAllDesignNames", config)
      .then((res) => {
        res.data.result.map((names) => {
          newArr.push(names.design_name);
        });
      })
      .catch((err) => console.log(err));
    setAllNames(newArr);
  }
  useEffect(() => {
    getAllNames();
  }, []);


  const handleSaveBuilder = async () => {
    console.log(data)
    const res = postApi(`/api/admin/builderData`, data, app);
    res
      .then((res) => {
        console.log("res", res);
        if (res.message == "succcess") {
          console.log("enter IN SUCESS CONDITION")
          sucessToast(res.data, "top");
            navigate("/");
        } else {
          console.log("enter in error condition")
          errToast(res.data, "top");
        }
      })
      .catch((err) => console.log(err));
  };
  const handleDiscard = () => {
    setShowTopbar(false);
  };
  const handleEditTitle = (e) => {
    const delIndex1 = allNames.indexOf(data.delName);
    console.log(delIndex1);
    if (delIndex1 >= 0) {
      allNames.splice(delIndex1, 1);
    }
    var found = allNames.includes(e.target.value);
    if (found) {
      setErrorName("This Name is Already Given");
      setDesignName(e.target.value);
    } else if (e.target.value.length == 0) {
      setErrorName("Name Should Not Be empty");
      setDesignName(e.target.value);
    } else {
      setErrorName("");
      setDesignName(e.target.value);
    }
  };
  // const handlePage = useCallback((e) => {
  //   setStep(e);
  //   // setSideBar(0)
  // }, []);
  const handleExit = useCallback((e) => {
    navigate("/");
    setStep(0);
    // setSideBar(0);
  }, []);

  return (
    <SaveBar
      handleSave={handleSaveBuilder}
      handleEditTitle={handleEditTitle}
      handleDiscard={handleDiscard}
      // handlePage={handlePage}
      handleExit={handleExit}
      design_name={data?.design_name ?? ""}
      flag={flag}
      errorName={errorName}
      // step={step}
    />
    
  );
}

export default SaveChangesBar;
