import React, { useState, useEffect } from "react";
import { Button, Spin, Input, Checkbox, Card, Avatar } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";
// import { useAPI } from "../globalState/getShopData";

function ProductandCollectionPicker({
  elementType,
  setOpen,
  onSelect,
  checkedIDs,
  selectedCollectionId,
  // getShop
}) {
  const [searchData, setSearchData] = useState("");
  const [serachCursor, setSearchCursor] = useState("");

  const [serachNextPage, setSearchNextPage] = useState("");
  const [loading, setLoading] = useState(false);

  const [timer, setTimer] = useState(null);
  const [productCollection, setProductCollection] = useState([]);

console.log(elementType)
const app = useAppBridge();
  useEffect(() => {
    getData();
  }, []);
  async function getData(intialCursor, initialPage) {
   const sessionToken = await getSessionToken(app);
   console.log(sessionToken)
    console.log(serachCursor);
    console.log(serachNextPage);
    console.log("Getdata function");
    setLoading(true);
    let data = {
      cursor: intialCursor ?? serachCursor,
      nextPage: initialPage ?? serachNextPage,
      // shop: getShop,
    };
    let GET_URL = "";
    if (elementType == "products") {
      GET_URL = "/api/admin/getProduct";
    } else {
      GET_URL = "/api/admin/getCollections";
    }
        const config = {
          headers: { Authorization: `Bearer ${sessionToken}` },
        };

    await axios
      .post(GET_URL, data, config )
      .then((res) => {
        console.log(res.data);
        setProductCollection((prev) => [...prev, ...res.data.response]);
        setSearchCursor(res.data.nextPageCursor);
        setSearchNextPage(res.data.hasNextPage);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }

  //get products and collections by search
  async function getDataBySearch(e, newCursor, newPage) {
    const sessionToken = await getSessionToken(app);
    console.log(sessionToken)
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    setLoading(true);
    console.log("nahid");
    let data = {
      search: e,
      cursor: newCursor,
      nextPage: newPage,
      // shop: getShop,
    };
    let SEARCH_URL = "";
    clearTimeout(timer);
    if (elementType == "products") {
      SEARCH_URL = "/api/admin/getProduct";
    }  else {
      SEARCH_URL = "/api/admin/getCollections";
    }
    if (e != "") {
      console.log("enter in search api");
      const newTime = setTimeout(() => {
        axios
          .post(SEARCH_URL, data, config)
          .then((res) => {
            setSearchNextPage(res.data.hasNextPage);
            console.log(res.data.response);
            setProductCollection(res.data.response);
            setSearchCursor(res.data.nextPageCursor);
          })
          .catch((err) => console.log(err));
        setLoading(false);
      }, 1000);
      setTimer(newTime);
    }
  }

  //search by name
  const handleSearch = async (e) => {
    setLoading(true);
    setSearchNextPage("");
    setSearchCursor("");
    setSearchData(e.target.value);
    if (e.target.value == "") {
      setProductCollection([]);
      getData("", "");
    } else {
      console.log("enter in filled state");
      setProductCollection([]);
      getDataBySearch(e.target.value, "", "");
    }
  };

  //api hit on scroll
  const handleScroll = (event) => {
    let e = event.target;
    if (serachNextPage) {
      console.log(serachNextPage);
      if (e.scrollHeight - e.scrollTop === e.clientHeight) {
        setLoading(true);
        getData();
      }
    }
  };

  //selected product and collection
  const handleSelected = (e, data, id) => {
    console.log("clicked");
    onSelect(e, data, id);
  };
  return (
    <div className="prdct-slct">
      <div className="cross">
        <p>Select {elementType}</p>
        <CloseOutlined onClick={() => setOpen(false)} />
      </div>
      <Spin spinning={loading}>
        <div className="sd-total-products">
          <div className="sd-filter-product">
            <Input
              prefix={<SearchOutlined />}
              onChange={handleSearch}
              value={searchData}
            />
          </div>
          <div
            className="sd-productLists"
            onScroll={handleScroll}
            style={{ height: "750px", overflowY: "scroll" }}
          >
            <Checkbox.Group
              style={{
                width: "100%",
              }}
              value={checkedIDs}
            >
              {productCollection?.map((ele, index) => (
                <Card className="prdct-card" key={index}>
                  {/* <div className="sd-product-main">
                    <div className="sd-product-picker">
                      <div className="sd-product-select"> */}
                        <Checkbox
                        className="picker_list"
                          onChange={(e) => handleSelected(e, ele, ele.id)}
                          value={ele.id}
                        >
                          
                              <Avatar src={ele?.image?.url} />
                            <strong className="">
                              {ele?.label}
                            </strong>
                        </Checkbox>
                      {/* </div>
                    </div> 
                  </div> */}
                </Card>
              ))}
            </Checkbox.Group>
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default ProductandCollectionPicker;
