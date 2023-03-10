import React, { useState } from "react";
import { UsergroupAddOutlined, AppstoreOutlined } from "@ant-design/icons";
import { DatePicker, Input, Switch, Checkbox, Tabs } from "antd";
import postApi from "../utils/postApi";
import { useAPI } from "../globalState/getShop";
import ProductandCollectionPicker from "../common/elements/ProductCollectionPicker";
import UploadPicture from "../common/elements/UploadPicture";
import { CommonSelect, CommonInput } from "../common/elements/commonElements";
import PreviewCard from "../common/builder/PreviewCard";
import bckndImg from "../../public/images/menuIcon-1675851983457.png"

const { TextArea } = Input;
function PushNotification() {
  const [notificationData, setNotificationData] = useState({
    title: "",
    message: "",
    selected_media: "",
    delivery: "",
    audience :"",
    custom_image:"",
    url:"",
    type:"products"
  });
  const [open, setOpen] = useState(false);
  const [imgTest, setImageTest] = useState("");
  const onChange = (e) => {
    if (e.target.value == "immediately") {
      setNotificationData({
        ...notificationData,
        time: "",
      });
    }
    setNotificationData({
      ...notificationData,
      [e.target.name]: e.target.value,
    });
  };
  const onChange1 = (e, f, g) => {
    console.log(typeof f);
    console.log(f);
    setNotificationData({
      ...notificationData,
      time: f,
    });
  };
  const { app } = useAPI();
  const handleSendNotification = () => {
    console.log(notificationData);
    // postApi("/api/admin/pushNotification", notificationData, app);
  };
  const onswitch = (e, i) => {
    setNotificationData({
      ...notificationData,
      delivery: i,
    });
    // console.log(e);
    // console.log(i);
  };
const uploadImage = (img, name) =>{
  console.log(img,  "imgggg")
  console.log(name, "img nmae")
  setImageTest(img)
}
  const option = [
    { value: "all_users", label: "All users" },
    { value: "abandoned_cart", label: "Abandoned Cart" },
    { value: "hight_purchases", label: "Hight Purchases Intent Audience" },
    { value: "new_users", label: "New Users" },
  ];
  const tabContent = (type) => {
    const condition = type == "collection" || type == "products";
    return (
      <div>
        {type == "url" && (
          <>
            <CommonInput label="URL" onChange={onChange} value={notificationData.url} Input={{name:"url", placeholder:"Enter Url"}} />
            <Checkbox onChange={onChange}>Open Outside the App</Checkbox>
          </>
        )}
        {condition ? <h3>Select {type}</h3> : ""}
        <div className="selectMedia">
          {condition ? (
            <div onClick={() => setOpen(true)}>
              <AppstoreOutlined
                style={{ fontSize: "30px", color: "#5a5a5a" }}
              />
            </div>
          ) : (
            ""
          )}
          <UploadPicture onuploadImage={uploadImage} name="custom_image" />
          <img src={imgTest} />
          
        </div>
        {open && (
          <ProductandCollectionPicker
            className="pushNotificationPicker"
            checkedIDs={[]}
            onSelect={(e, ele, id) => {
              setNotificationData({
                ...notificationData,
                selected_media: ele,
              });
              setOpen(false);
            }}
            setOpen={setOpen}
            elementType={type}
          />
        )}

        <label>Title</label>
        <Input name="title" showCount maxLength={50} onChange={onChange} />
        <label>Message</label>
        <TextArea
          name="message"
          showCount
          maxLength={200}
          onChange={onChange}
        />
        <CommonSelect label="Audience" option={option} onChange={onChange} name="audience" value={notificationData.audience} />
        <div className="pushNotification_delivery">
          <label>Send immediately</label>
          <Switch checked={notificationData.delivery == 'send_immediately'? true:false} onChange={(e)=>onswitch(e,"send_immediately")} />
        </div>
        <div className="pushNotification_delivery">
          <label>Send in a particular time</label>
          <Switch checked={notificationData.delivery == 'particular_time'? true:false} name="test" defaultChecked onChange={(e)=>onswitch(e,"particular_time")} />
        </div>
       { notificationData.delivery == 'particular_time' && <DatePicker
          style={{
            width: 100,
            marginLeft: 10,
          }}
          name="particular_time"
          onChange={(dates, dateStrings) =>
            onChange1(dates, dateStrings, "date")
          }
          value={notificationData?.particular_time}
          showTime
        />}
        <div className="pushNotification_delivery">
          <div>
            <UsergroupAddOutlined className="subscriber_icon" style={{'color':'#7d2ae8', 'fontSize':'17px'}} />
            you have 0 push subscriber
          </div>

          <button
            onClick={handleSendNotification}
            className="send_notification"
          >
            Send Notification
          </button>
        </div>
      </div>
    );
  };
  const items = [
    {
      label: <span>Products</span>,
      key: "products",
      children: tabContent("products"),
    },
    {
      label: <span> Collections</span>,
      key: "collections",

      children: tabContent("collection"),
    },
    {
      label: <span> Abandoned Cart</span>,
      key: "abandoned_cart",

      children: tabContent("abandoned_Cart"),
    },
    {
      label: <span> URL</span>,
      key: "url",

      children: tabContent("url"),
    },
  ];
  return (
    <div className="pushNotificationSection">
      <div className="SD-pushNotifiction">
        Create Notification
        <Tabs
          className="SD-tabs"
          defaultActiveKey="products"
          animated={true}
          items={items}
          type="card"
          onTabClick={(e)=>{  setNotificationData({
            ...notificationData,
            type: e,
          });}}
        />
      </div>
      <PreviewCard
        className="globalSettingView"
        data="globalSetting_hideHeader"
      >
        <div className="notificationPrev">
          <div>
           <h2> {notificationData.title ||"Title"} </h2>
          </div>
          <div>
           <p> {notificationData.message ||"Message"} </p>
          </div>
        </div>
      </PreviewCard>
    </div>
  );
}

export default PushNotification;
