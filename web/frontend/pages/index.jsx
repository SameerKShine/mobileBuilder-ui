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
    console.log("activeClass +==>", activeClass);
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
        // buttonText={<div> Select Template </div>}
        buttonText="Select Template"
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
          <div className="card_body">
            <div className="select-option_imagebox">
              <img src="assets/images/templates/custumCover.png" />
            </div>
            <p> You can create your own design with the help of given builder
              modules within the app. </p>
            <ul className="plan-list">
              {content1.map((ele, index) => (
                <li key={index}>
                  <CheckOutlined />
                  {ele}
                </li>
              ))}
             
            </ul>            
          </div>
          <div className="card-footer">
              <button
                className="SD-saveButton"
                onClick={() =>
                handleSelectDesign(
                  "create-theme",
                  "create-theme",
                  "create-theme"
                  )
                }
              > 
              Create Custom Design
              </button>
          </div>
        </div>
        <div className="createNewDesign">
          <div className="card_body">
              <div className="select-option_imagebox">
                <img src="assets/images/templates/templateCover.png" alt="" />
              </div>  
              <p> Please select template of your choice and customize according to
              your vision. </p>
              <ul className="plan-list">
              {content2.map((ele, index) => (
                <li key={index}>
                  <CheckOutlined />
                  {ele}
                </li>
              ))}
            </ul>
            {/* {modalButton} */}
          </div>
          <div className="card-footer">
          {modalButton}
          </div>
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
    if(newName.length < 1){
      setError(true);
    }
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
  const createdDesigns = (ele, index, mainclass) => {
    return (
      <div className="inner_mid_box">
        <div className={"inner_mid_card_box "+mainclass}>
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
                    buttonText={<DeleteFilled style={{'color':!ele.publish&&"#57229c"}} />}
                  />
                  <a
                    className="SD-icon"
                    onClick={() =>
                      handleSelectDesign("theme-edit", ele._id, ele.template_id)
                    }
                  >
                    <EditOutlined  style={{'color':"#57229c"}}  />
                  </a>

                  <a
                    onClick={() => {
                      setPrevId(ele._id);
                      setIsModalOpen(true);
                    }}
                    className="SD-icon"
                  >
                    <EyeOutlined style={{'color':"#57229c"}} />
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
                    buttonText={<CopyOutlined style={{'color':"#57229c"}}  />}
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
                      style={{'color':"#57229c"}} 
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
                  (ele, index) => ele.publish && createdDesigns(ele, index, "publishedesign")
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
                  (ele, index) => !ele.publish ? createdDesigns(ele, index, "unpublishedesign") : ""                                  
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
