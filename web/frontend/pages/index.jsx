import React, { useState, useEffect } from "react";
import { EditOutlined, LoadingOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CommonModal from "../common/modal/CommonModal";
import postApi from "../utils/postApi";
import { useAPI } from "../globalState/getShop";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Spin, Switch } from "antd";
import { sucessToast } from "../common/notification/notification";
import { useMemo } from "react";

function index() {
  const [templateList, setTemplatelist] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("");

  const navigate = useNavigate();

  const { app } = useAPI();

  async function getData() {
    setLoading(true);
    const sessionToken = await getSessionToken(app);
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    axios
      .get(`/api/admin/getDesignsList`, config)
      .then((res) => {
        console.log(res.data.data);
        setTemplatelist(res.data.data);
        setLoading(false);
      })
      .catch((Err) => setLoading(false));
  }
  useEffect(() => {
    getData();
  }, []);

  const preDefineTemplate = [
    {
      name: "Template 1",
      id: "template_1",
      cover_img: "assets/images/templates/template_1.png",
    },
    {
      name: "Template 2",
      id: "template_2",
      cover_img: "assets/images/templates/template_2.png",
    },
    {
      name: "Template 3",
      id: "template_3",
      cover_img: "assets/images/templates/template_2.png",
    },
  ];

  const handleSelectDesign = (t, i) => {
    // navigate(`/builder/${t}`)
    navigate({
      pathname: `/builder/${t}`,
      search: `?${t}=${i}`,
    });
  };

  const handleCreateApp = () => {
    setShowOption(true);
  };

  const modalButton = useMemo(()=>{
   return <CommonModal
    headerText={
      <div className="popup-head">
        <h2>Choose Design</h2>
        <p>
          Select The Default Design To Start With The Design Process.
        </p>
      </div>
    }
    modalWidth={1500}
    title={
      <div className="SD-template-popup">
        {preDefineTemplate.map((temp, index) => (
          <div
            className={`createNewDesign ${
              temp.id == activeClass && " active"
            }`}
            key={index}
          >
            <div onClick={() => setActiveClass(temp.id)}>
              <img src={temp.cover_img} /> <h6>{temp.name}</h6>
            </div>
          </div>
        ))}
      </div>
    }
    okFunc={() => handleSelectDesign("selected-template", activeClass)}
    button={{ ok: "Create", cancel: "Cancel" }}
    buttonText={<div> Please select Template</div>}
  />
  })

  const showOptions = useMemo(() => {
    const content = [{}];
    return (
      <div className="SD-select-option">
        <div className="createNewDesign">
          <div>
            <img src="assets/images/templates/custumCover.png" />
            <p>
              You can create your own design with the help of given builder
              modules within the app.
            </p>
            <ul className="plan-list">
              <li>
                <span className="check-plan-icon">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                      fill="#70D158"
                    ></path>
                  </svg>
                </span>
                iOS App
              </li>
              <li>
                <span className="check-plan-icon">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                      fill="#70D158"
                    ></path>
                  </svg>
                </span>
                Android App
              </li>
              <li>
                <span className="check-plan-icon">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                      fill="#70D158"
                    ></path>
                  </svg>
                </span>
                Enhance your mobile app with your custom fonts.
              </li>
              <li>
                <span className="check-plan-icon">
                  <svg
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                      fill="#70D158"
                    ></path>
                  </svg>
                </span>
                Automate your push notification campaigns.
              </li>
            </ul>
            <h2
              onClick={() => handleSelectDesign("create-theme", "create-theme")}
            >
              Create Custom Design
            </h2>
          </div>
        </div>
        <div className="createNewDesign">
          <img src="assets/images/templates/templateCover.png" alt="" />
          <p>
            Please select template of your choice and customize according to
            your vision.
          </p>
          <ul className="plan-list">
            <li>
              <span className="check-plan-icon">
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                    fill="#70D158"
                  ></path>
                </svg>
              </span>
              iOS App
            </li>
            <li>
              <span className="check-plan-icon">
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                    fill="#70D158"
                  ></path>
                </svg>
              </span>
              Android App
            </li>
            <li>
              <span className="check-plan-icon">
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                    fill="#70D158"
                  ></path>
                </svg>
              </span>
              Free Templates
            </li>
            <li>
              <span className="check-plan-icon">
                <svg
                  width="26"
                  height="20"
                  viewBox="0 0 26 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.3476 14.3772C13.7758 9.94895 18.1879 5.54014 22.5967 1.12486C22.8623 0.859235 23.1927 0.729659 23.5329 0.62276C23.6657 0.580648 23.8212 0.596845 23.9702 0.57093C24.0576 0.554733 24.1581 0.606563 24.252 0.613042C24.3492 0.61952 24.4464 0.61952 24.5371 0.664872C24.6148 0.703744 24.699 0.723181 24.78 0.758814C24.8675 0.794447 24.9647 0.817123 25.0359 0.875432C25.2821 1.06656 25.5089 1.2674 25.6903 1.53303C25.8393 1.75007 25.8944 1.99626 25.9786 2.22949C26.0304 2.38175 25.9689 2.56963 25.9916 2.73484C26.0239 2.96483 25.8911 3.16244 25.8847 3.37948C25.7842 3.48638 25.7421 3.62567 25.6709 3.74876C25.6028 3.86862 25.5024 3.97228 25.4052 4.0727C20.5429 8.93826 15.6741 13.8071 10.8053 18.6694C10.5786 18.8961 10.3194 19.0937 9.99871 19.1747C9.87562 19.2071 9.75576 19.2622 9.62294 19.2557C9.57759 19.2557 9.529 19.2784 9.48365 19.2816C9.40267 19.2881 9.32492 19.2913 9.24394 19.2881C9.21478 19.2881 9.18563 19.2557 9.15647 19.2557C8.80338 19.2719 8.51508 19.0937 8.21381 18.948C8.16522 18.922 8.11987 18.8799 8.081 18.8411C5.5478 16.3079 3.0146 13.7779 0.484642 11.2415C0.264364 11.0179 0.138028 10.7361 0.0570436 10.4251C-0.0142228 10.1498 -0.0109834 9.8712 0.0246498 9.60557C0.0700012 9.25248 0.212534 8.91882 0.465206 8.64671C0.533233 8.57221 0.610978 8.50418 0.679005 8.42967C0.879847 8.22235 1.12928 8.1025 1.39167 7.99884C1.67674 7.8887 1.97476 7.85954 2.2663 7.90489C2.64207 7.96644 3.00164 8.08306 3.30615 8.34869C3.51347 8.5301 3.71431 8.72122 3.90867 8.91558C5.68709 10.6908 7.46228 12.4659 9.23746 14.2444C9.27957 14.2865 9.31196 14.3351 9.3476 14.3772Z"
                    fill="#70D158"
                  ></path>
                </svg>
              </span>
              Push Notifications
            </li>
          </ul>
          {modalButton}
        </div>
      </div>
    );
  }, []);

  const createdDesigns = (ele, index) => {
    return (
      <div className="mydesign_section" key={index}>
        <div className="publishSection">
          <span>publish</span>{" "}
          <Switch
            checked={ele.publish}
            onChange={(e) => handlePublish(e, ele._id)}
          />
        </div>
        <div className="designData">
          {ele.design_name}
          <span>
            Last Updated at :{" "}
            <strong>{new Date(ele?.updatedAt)?.toDateString()}</strong>
          </span>
        </div>
        <div
          className="editDesignButton"
          onClick={() => handleSelectDesign("theme-edit", ele.template_id)}
        >
       <span> <EditOutlined className="icon-edit"/> Edit</span>
        </div>
      </div>
    );
  };

  console.log(templateList.length);
  const handleeClick = async () => {
    const res = postApi(`/api/storefront/customerCreate`, {}, app);
    res
      .then((data) => {
        console.log(data);
      })
      .catch((Err) => console.log(Err));
  };

  const handlePublish = (e, id) => {
    setLoading(true);
    const res = postApi(
      "/api/admin/publishDesign",
      { publish: e, updateId: id },
      app
    );
    res
      .then((data) => {
        console.log(data);
        if (data.message == "succcess") {
          sucessToast("Your design is published sucessfully", "top");
          setTemplatelist(data.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <Spin
      spinning={isLoading}
      indicator={
        <LoadingOutlined style={{ fontSize: "40px", color: "#7d2ae8" }} />
      }
      className="SD-dashboard"
    >
      {templateList.length >= 1 ? (
        <>
          <div style={{ textAlign: "right" }}>
       
            {modalButton}
          </div>
          <h2 className="SD-dashboard-headings">Published design</h2>
          <div className="myDesigns">
            {templateList.map(
              (ele, index) => ele.publish && createdDesigns(ele, index)
            )}
            <div>
              <div className="custom-create-temp">
                <div
                  className="custom-create-button"
                  onClick={() =>
                    handleSelectDesign("create-theme", "create-theme")
                  }
                >
                  <PlusCircleOutlined /> Create Custom Design
                </div>
              </div>
            </div>
          </div>
          <h2 className="SD-dashboard-headings">My Designs design</h2>
          <div className="myDesigns">
            {templateList.map(
              (ele, index) => !ele.publish && createdDesigns(ele, index)
            )}
          </div>
        </>
      ) : (
        <>
          {showOption && showOptions}
          {!showOption && (
            <div className="SD-createapp">
              <div className="createAppInitial">
                <button onClick={handleCreateApp}>Create App</button>
              </div>
              <div className="no-app-message">There is no app created yet</div>
            </div>
          )}
        </>
      )}
    </Spin>
  );
}

export default index;
