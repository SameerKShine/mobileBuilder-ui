import React, { useState, useEffect } from "react";
import {
  EditOutlined,
  LoadingOutlined,
  PlusCircleOutlined,
  DeleteFilled,
  CopyOutlined,
  CheckOutlined,
  FontColorsOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CommonModal from "../common/modal/CommonModal";
import postApi from "../utils/postApi";
import { useAPI } from "../globalState/getShop";
import axios from "axios";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Spin, Switch } from "antd";
import { sucessToast } from "../common/notification/notification";
import { useMemo } from "react";
import deleteApi from "../utils/deleteApi";
import { CommonInput } from "../common/elements/commonElements";
import PreviewModal from "../common/modal/PreviewModal";

function index() {
  const [templateList, setTemplatelist] = useState([]);
  const [showOption, setShowOption] = useState(false);
  const [error, setError] = useState(false);

  const [isLoading, setLoading] = useState(false);
  const [activeClass, setActiveClass] = useState("");
  const [duplicateName, setDuplicateName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevId, setPrevId] = useState("");

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

  const handleSelectDesign = (t, i, id) => {
    console.log(t);
    console.log(i);
    navigate({
      pathname: `/builder/${t}`,
      search: `?${t}=${i}`,
      hash: id,
    });
  };

  const handleCreateApp = () => {
    setShowOption(true);
  };

  const modalButton = useMemo(() => {
    console.log("activeClass ==>", activeClass);
    return (
      <CommonModal
        headerText={
          <div className="popup-head">
            <h2>Choose Design</h2>
            <p>Select The Default Design To Start With The Design Process.</p>
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
        icon={false}
        okFunc={() =>
          handleSelectDesign(
            "selected-template",
            activeClass,
            "selected-template"
          )
        }
        button={{ ok: "Create", cancel: "Cancel" }}
        buttonText={<div> Select Template</div>}
      />
    );
  }, [activeClass]);

  const showOptions = useMemo(() => {
    const content1 = [
      "iOS App",
      "Android App",
      "Enhance your mobile app with your custom fonts.",
      "Automate your push notification campaigns.",
    ];
    const content2 = [
      "iOS App",
      "Android App",
      "Free Templates",
      "Push Notifications",
    ];
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
              {content1.map((ele, index) => (
                <li key={index}>
                  <CheckOutlined />
                  {ele}
                </li>
              ))}
              {/* <li>
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
                <CheckOutlined />
                Android App
              </li> */}
            </ul>
            <h2
              onClick={() =>
                handleSelectDesign(
                  "create-theme",
                  "create-theme",
                  "create-theme"
                )
              }
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
            {content2.map((ele, index) => (
              <li key={index}>
                <CheckOutlined />
                {ele}
              </li>
            ))}
          </ul>
          {modalButton}
        </div>
      </div>
    );
  }, [activeClass]);

  const handleDelete = (id) => {
    setLoading(true);
    console.log(id);
    deleteApi(`deleteAppDesign/${id}`, app)
      .then((res) => {
        setLoading(false);
        setTemplatelist(res.data.data);
      })
      .catch((err) => setLoading(false));
  };

  const handleDuplicateDesign = (url, data) => {
    setLoading(true);
    data.design_name = duplicateName;
    console.log(data);
    postApi(`${url}/${data._id}`, data, app)
      .then((res) => {
        console.log(res.data)
        setTemplatelist(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleDuplicateName = (e, prevName) => {
    const newName = e.target.value;
    let validate = [];
    console.log(prevName);
    if (prevName) {
      if (prevName !== newName) {
        validate = templateList.filter((el) => el.design_name == newName);
      }
    } else {
      validate = templateList.filter((el) => el.design_name == newName);
    }
    if (validate.length > 0) {
      setError(true);
    } else {
      setError(false);
    }
    setDuplicateName(e.target.value);
  };
  /*---test--*/
  const createdDesigns = (ele, index) => {
    return (
      <div className="inner_mid_box">
        <div className="inner_mid_card_box">
          <div className="mydesign_section" key={index}>
            <div className="mn">
              <div className="designData">
                <span>{ele.design_name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="designCard_icons">
                <div class="design_edit_options">
                  <CommonModal
                    icon={true}
                    title={<h2>Are you sure you want to delete ?</h2>}
                    openBtn={ele.publish}
                    okFunc={() => handleDelete(ele._id)}
                    button={{ ok: "Delete", cancel: "Cancel" }}
                    buttonText={<DeleteFilled />}
                  />
                  <a
                    className="SD-icon"
                    onClick={() =>
                      handleSelectDesign("theme-edit", ele._id, ele.template_id)
                    }
                  >
                    <EditOutlined />
                  </a>

                  <a
                    onClick={() => {
                      setPrevId(ele._id);
                      setIsModalOpen(true);
                    }}
                    className="SD-icon"
                  >
                    <EyeOutlined />
                  </a>

                  <CommonModal
                    icon={true}
                    title={
                      <>
                        <CommonInput
                          label="Design Name"
                          // value={duplicateName}
                          onChange={(e) => handleDuplicateName(e, "")}
                          input={{
                            name: "duplicate _name",
                            placeholder: "Design Name",
                          }}
                        />
                        {error && (
                          <span style={{ color: "red" }}>
                            This Name is already taken
                          </span>
                        )}
                      </>
                    }
                    disableok={error}
                    okFunc={() => handleDuplicateDesign("duplicateDesign", ele)}
                    button={{ ok: "Create", cancel: "Cancel" }}
                    buttonText={<CopyOutlined />}
                  />
                  {/* <FontColorsOutlined /> */}
                  <CommonModal
                    icon={true}
                    title={
                      <>
                        <CommonInput
                          label="Design Name"
                          value={duplicateName}
                          onChange={(e) =>
                            handleDuplicateName(e, ele.design_name)
                          }
                          input={{
                            name: "design_name",
                            placeholder: "Design Name",
                          }}
                        />
                        {error && (
                          <span style={{ color: "red" }}>
                            This Name is already taken
                          </span>
                        )}
                      </>
                    }
                    disableok={error}
                    okFunc={() => handleDuplicateDesign("editName", ele)}
                    button={{ ok: "Change", cancel: "Cancel" }}
                    buttonText={
                      <FontColorsOutlined
                        onClick={() => setDuplicateName(ele.design_name)}
                      />
                    }
                  />
                </div>
              </div>
            </div>
            <div className="designName">
              <p> {ele.design_name} </p>
            </div>
            <div className="editDesignButton">
              <div
                className="update-date-template"
                onClick={() =>
                  handleSelectDesign("theme-edit", ele._id, ele.template_id)
                }
              >
                <p>Last Updated: </p>
                <strong>{new Date(ele?.updatedAt)?.toDateString()}</strong>
              </div>
              <div className="publishSection">
                <span>Publish</span>{" "}
                <Switch
                  checked={ele.publish}
                  onChange={(e) => handlePublish(e, ele._id)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  console.log(templateList.length);
  // const handleeClick = async () => {
  //   const res = postApi(`/api/storefront/customerCreate`, {}, app);
  //   res
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((Err) => console.log(Err));
  // };

  const handlePublish = (e, id) => {
    setLoading(true);
    const res = postApi("publishDesign", { publish: e, updateId: id }, app);
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
    <div className="inner_mid_box_MN">
      <Spin
        spinning={isLoading}
        indicator={
          <LoadingOutlined style={{ fontSize: "40px", color: "#7d2ae8" }} />
        }
        className="SD-dashboard "
      >
        {templateList.length >= 1 ? (
          <>
            <div style={{ textAlign: "right" }}>{modalButton}</div>
            <div className="card-section">
              <h2 className="SD-dashboard-headings">Published design</h2>
              <div className="inner_mid_box">
                {templateList.map(
                  (ele, index) => ele.publish && createdDesigns(ele, index)
                )}

                <div className="inner_mid_card_box">
                  <div
                    className="custom-create-button"
                    onClick={() =>
                      handleSelectDesign(
                        "create-theme",
                        "create-theme",
                        "create-theme"
                      )
                    }
                  >
                    <PlusCircleOutlined /> Create Custom Design
                  </div>
                </div>
              </div>
            </div>

            <div className="card-section">
              <h2 className="SD-dashboard-headings">My Designs</h2>
                    <div className="inner_mid_box_D_cover">
                {templateList.map(
                  (ele, index) => !ele.publish ? createdDesigns(ele, index) : 
                   <div className="inner_mid_box_D">
                      <div class='inner_mid_card_box_D'>
                      <div class='mydesign_section'>
                        <div class='mn'><div class='designData'>
                          <span>S</span>
                        </div>
                          <div class='designCard_icons'>
                            <div class='design_edit_options'>
                              <a class='SD-icon undefined' disabled=''>
                                <span role='img' aria-label='delete' class='anticon anticon-delete'>
                                  <svg viewBox='64 64 896 896' focusable='false' data-icon='delete' width='1em' height='1em' fill='currentColor' aria-hidden='true'>
                                    <path d='M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z'></path></svg></span></a><a class='SD-icon'><span role='img' aria-label='edit' class='anticon anticon-edit'><svg viewBox='64 64 896 896' focusable='false' data-icon='edit' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z'></path></svg></span></a><a class='SD-icon'><span role='img' aria-label='eye' class='anticon anticon-eye'><svg viewBox='64 64 896 896' focusable='false' data-icon='eye' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z'></path></svg></span></a><a class='SD-icon undefined'><span role='img' aria-label='copy' class='anticon anticon-copy'><svg viewBox='64 64 896 896' focusable='false' data-icon='copy' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z'></path></svg></span></a><a class='SD-icon undefined'><span role='img' aria-label='font-colors' tabindex='-1' class='anticon anticon-font-colors'><svg viewBox='64 64 896 896' focusable='false' data-icon='font-colors' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 006-12.4L573.6 118.6a9.9 9.9 0 00-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z'></path>
                                    </svg>
                                    </span>
                                    </a>
                                    </div>
                          </div>
                        </div>
                                  <div class='designName'>
                                    <p> Selected Design </p>
                                  </div>
                                <div class='editDesignButton'>
                                  <div class='update-date-template'>
                                    <p>Last Updated: </p>
                                    <strong>Thu Mar 02 2023</strong>
                                    </div><div class='publishSection'>
                                      <span>Publish</span> 
                                      <button type='button' role='switch' aria-checked='true' class='ant-switch css-dev-only-do-not-override-10ed4xt ant-switch-checked'>
                                        <div class='ant-switch-handle'></div><span class='ant-switch-inner'>
                                          <span class='ant-switch-inner-checked'></span><span class='ant-switch-inner-unchecked'></span></span></button></div></div></div>
                      </div>
                      <div class='inner_mid_card_box_D'>
                      <div class='mydesign_section'>
                        <div class='mn'><div class='designData'>
                          <span>S</span>
                        </div>
                          <div class='designCard_icons'>
                            <div class='design_edit_options'>
                              <a class='SD-icon undefined' disabled=''>
                                <span role='img' aria-label='delete' class='anticon anticon-delete'>
                                  <svg viewBox='64 64 896 896' focusable='false' data-icon='delete' width='1em' height='1em' fill='currentColor' aria-hidden='true'>
                                    <path d='M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z'></path></svg></span></a><a class='SD-icon'><span role='img' aria-label='edit' class='anticon anticon-edit'><svg viewBox='64 64 896 896' focusable='false' data-icon='edit' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z'></path></svg></span></a><a class='SD-icon'><span role='img' aria-label='eye' class='anticon anticon-eye'><svg viewBox='64 64 896 896' focusable='false' data-icon='eye' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z'></path></svg></span></a><a class='SD-icon undefined'><span role='img' aria-label='copy' class='anticon anticon-copy'><svg viewBox='64 64 896 896' focusable='false' data-icon='copy' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z'></path></svg></span></a><a class='SD-icon undefined'><span role='img' aria-label='font-colors' tabindex='-1' class='anticon anticon-font-colors'><svg viewBox='64 64 896 896' focusable='false' data-icon='font-colors' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 006-12.4L573.6 118.6a9.9 9.9 0 00-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z'></path>
                                    </svg>
                                    </span>
                                    </a>
                                    </div>
                          </div>
                        </div>
                                  <div class='designName'>
                                    <p> Selected Design </p>
                                  </div>
                                <div class='editDesignButton'>
                                  <div class='update-date-template'>
                                    <p>Last Updated: </p>
                                    <strong>Thu Mar 02 2023</strong>
                                    </div><div class='publishSection'>
                                      <span>Publish</span> 
                                      <button type='button' role='switch' aria-checked='true' class='ant-switch css-dev-only-do-not-override-10ed4xt ant-switch-checked'>
                                        <div class='ant-switch-handle'></div><span class='ant-switch-inner'>
                                          <span class='ant-switch-inner-checked'></span><span class='ant-switch-inner-unchecked'></span></span></button></div></div></div>
                      </div>
                      <div class='inner_mid_card_box_D'>
                      <div class='mydesign_section'>
                        <div class='mn'><div class='designData'>
                          <span>S</span>
                        </div>
                          <div class='designCard_icons'>
                            <div class='design_edit_options'>
                              <a class='SD-icon undefined' disabled=''>
                                <span role='img' aria-label='delete' class='anticon anticon-delete'>
                                  <svg viewBox='64 64 896 896' focusable='false' data-icon='delete' width='1em' height='1em' fill='currentColor' aria-hidden='true'>
                                    <path d='M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z'></path></svg></span></a><a class='SD-icon'><span role='img' aria-label='edit' class='anticon anticon-edit'><svg viewBox='64 64 896 896' focusable='false' data-icon='edit' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z'></path></svg></span></a><a class='SD-icon'><span role='img' aria-label='eye' class='anticon anticon-eye'><svg viewBox='64 64 896 896' focusable='false' data-icon='eye' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z'></path></svg></span></a><a class='SD-icon undefined'><span role='img' aria-label='copy' class='anticon anticon-copy'><svg viewBox='64 64 896 896' focusable='false' data-icon='copy' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M832 64H296c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496v688c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V96c0-17.7-14.3-32-32-32zM704 192H192c-17.7 0-32 14.3-32 32v530.7c0 8.5 3.4 16.6 9.4 22.6l173.3 173.3c2.2 2.2 4.7 4 7.4 5.5v1.9h4.2c3.5 1.3 7.2 2 11 2H704c17.7 0 32-14.3 32-32V224c0-17.7-14.3-32-32-32zM350 856.2L263.9 770H350v86.2zM664 888H414V746c0-22.1-17.9-40-40-40H232V264h432v624z'></path></svg></span></a><a class='SD-icon undefined'><span role='img' aria-label='font-colors' tabindex='-1' class='anticon anticon-font-colors'><svg viewBox='64 64 896 896' focusable='false' data-icon='font-colors' width='1em' height='1em' fill='currentColor' aria-hidden='true'><path d='M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 006-12.4L573.6 118.6a9.9 9.9 0 00-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z'></path>
                                    </svg>
                                    </span>
                                    </a>
                                    </div>
                          </div>
                        </div>
                                  <div class='designName'>
                                    <p> Selected Design </p>
                                  </div>
                                <div class='editDesignButton'>
                                  <div class='update-date-template'>
                                    <p>Last Updated: </p>
                                    <strong>Thu Mar 02 2023</strong>
                                    </div><div class='publishSection'>
                                      <span>Publish</span> 
                                      <button type='button' role='switch' aria-checked='true' class='ant-switch css-dev-only-do-not-override-10ed4xt ant-switch-checked'>
                                        <div class='ant-switch-handle'></div><span class='ant-switch-inner'>
                                          <span class='ant-switch-inner-checked'></span><span class='ant-switch-inner-unchecked'></span></span></button></div></div></div>
                      </div>
                   </div>                                     
                )}
                    </div>
                 {/* {templateList.map(
                  (ele, index) => console.log(" !ele.publish ",  !ele.publish) 
                )} */}
              
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
                <div className="no-app-message">
                  There is no app created yet
                </div>
              </div>
            )}
          </>
        )}
      </Spin>
      {isModalOpen && (
        <PreviewModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          id={prevId}
          page="index"
        />
      )}
    </div>
  );
}

export default index;
