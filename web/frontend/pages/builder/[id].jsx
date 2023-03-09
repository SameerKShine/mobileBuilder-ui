import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  // useOutletContext,
  useParams,
  useNavigate,
  useSearchParams,
  useLocation 
} from "react-router-dom";
import CreatePage from "../../components/landingPage/CreatePage";
import CreateMenu from "../../components/menu/CreateMenu";
import axios from "axios";
import { useAPI } from "../../globalState/getShop";
import getApi from "../../utils/getApi";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import templateData from "../../templateData.json";
import SaveChangesBar from "../../common/SaveChangesBar";
import AppApperance from "../../components/appApperance/AppApperance";
import AppBar from "../../components/appBar/AppBar";
import LayoutSelect from "../../components/layoutSelect/LayoutSelect";
import SideBar from "../../components/sidebar/SideBar";
import { CommonSelect } from "../../common/elements/commonElements";
// import {ProductsCard} from '../components/ProductsCard'

export default function HomePage() {
  const params = useParams();

  const [builderFields, setBuilderFields] = useState([
    {
      type: "header",
      id: "0",
      heading_text: "Welcome to your Store",
      subheading_text: "Enter Subheading Here",
      text_alignment: "left",
      show_subheading: true,
      style: {
        margin_top: "0",
        margin_bottom: "0",
        margin_left: "0",
        margin_right: "0",
      },
    },
  ]);

  const [menu, setMenu] = useState({
    layout: "menu_1",
    elements: [
      {
        icon: "",
        title: "Home",
        id: "Home",
        display_icon: "Home0",
        icon_url: "/assets/images/menu/home.svg",
      },
      {
        icon: "",
        title: "Recently View",
        id: "Recently View",
        display_icon: "Recently_View0",
        icon_url: "/assets/images/menu/recently_view.svg",
      },
      {
        icon: "",
        title: "Cart",
        id: "Cart",
        display_icon: "Cart0",
        icon_url: "/assets/images/menu/cart.svg",
      },
      {
        icon: "",
        title: "My Orders",
        id: "My Orders",
        display_icon: "My_Orders0",
        icon_url: "/assets/images/menu/account.svg",
      },
      {
        icon: "",
        title: "FAQs",
        id: "FAQs",
        display_icon: "FAQs0",
        icon_url: "/assets/images/menu/faqs.svg",
      },
    ],
    background_color: "",
  });
  const [sideBar_data, setSidebar] = useState({
    layout: "layout_1",
    background_color:"#000",
    font_color:"#ffffff",
    font_size:"25",
    elements: [
      {
        icon: "",
        title: "My Profile",
        id: "My Profile",
        display_icon: "My_Profile0",
        icon_url: "/assets/images/menu/home.svg",
      },
      {
        icon: "",
        title: "Contact Us",
        id: "Contact Us",
        display_icon: "Contact_Us0",
        icon_url: "/assets/images/menu/recently_view.svg",
      },
      {
        icon: "",
        title: "My Cart",
        id: "My Cart",
        display_icon: "My_Cart0",
        icon_url: "/assets/images/menu/cart.svg",
      },
      {
        icon: "",
        title: "Favorites",
        id: "Favorites",
        display_icon: "Favorites0",
        icon_url: "/assets/images/menu/account.svg",
      },
    ],
  });

  const [design_name, setDesignName] = useState("");
  const [app_apperance, setApp_apperance] = useState({
    primary_color: "",
    secondary_color: "",
    background_color: "",
    font_family: "",
    font_size: "",
    splash_screen: "",
  });
  const [app_bar, setAppBar] = useState({
    bar_color: "#ffffff",
    notification_icon: false,
    search_icon: true,
    cart_icon: true,
    favorite_icon: false,
    bottom_radius: "4",
    shadow: "",
    app_logo: "",
  });
  const [layoutSelection, setLayoutSelect] = useState({
    profile_page_design:"",
    cart_page_design:"",
    product_detail_page_design:""
  })
  const [loading, setLoading] = useState(false);

  const [step, setStep] = useState(0);
  const [sideBar, setSideBarView] = useState(0);
  const [delName, setDelName] = useState("");
  const [updateId, setUpDateId] = useState("");

  // const [step, sideBar] = useOutletContext();
  // console.log("sideBar ", sideBar)
  // const step = 0
  // const sideBar = 0
  const { app } = useAPI();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  useEffect(() => {
    
   
    const _id = params.id;
    const searchParam = searchParams.get(_id);
    setLoading(true);
    if (_id == "theme-edit") {
      const builder_id = hash.slice(1)
      console.log(builder_id)
      // getApi(`/api/admin/getMobileData/${{temp :builder_id, id:searchParam}}`, app)
      getApi(`/api/admin/getMobileData/${searchParam}`, app)
        .then((res) => {
          // console.log("res", res.result);
          setDesignName(res.result.design_name);
          setDelName(res.result.design_name);
          setBuilderFields(res.result.landing_page);
          setMenu(res.result.menu_data);
          setUpDateId(res.result._id);
          setApp_apperance(res.result.app_apperance);
          setAppBar(res.result.app_bar);
          setSidebar(res.result.side_bar);
          setLayoutSelect({
            cart_page_design : res.result.cart_page_design,
            product_detail_page_design : res.result.product_detail_page_design,
            profile_page_design : res.result.profile_page_design,
          })
          setLoading(false);
        })
        .catch((err) => {
          // console.log("ENTER IN ERRORRRRRRRRRRRRR", err)
          setLoading(false);
          navigate("/");
        });
    } else if (_id == "create-theme") {
      return setLoading(false);
    } else if (_id == "selected-template") {
      // console.log(templateData[searchParam]);
      if (templateData[searchParam]) {
        setDelName(templateData[searchParam].design_name);
        setDesignName("");
        setBuilderFields(templateData[searchParam].landing_page);
        // setMenu(templateData[_id].menu_data)
        setApp_apperance(templateData[searchParam].builder_apperance);
      } else {
        // console.log("enter in else condition")
        navigate({
          pathname: `/`,
          search: ``,
        });
      }
      setLoading(false);
    } else {
      navigate({
        pathname: `/`,
        search: ``,
      });
    }
  }, []);

  // const step  = 0
  // const fetch = useAuthenticatedFetch();

  // const {
  //   data,
  //   refetch: refetchProductCount,
  //   isLoading: isLoadingCount,
  //   isRefetching: isRefetchingCount,
  // } = useTest({
  //   url: "/api/admin/test",
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       // setIsLoading(false);
  //     },
  //   },
  // });
  // console.log(data)
  // // const apis = useApi('/api/admin/test')

  const handleTest = async () => {
    const sessionToken = await getSessionToken(app);
    // console.log(sessionToken);
    const config = {
      headers: { Authorization: `Bearer ${sessionToken}` },
    };
    // const { loading, data } = apis
    // console.log(data)
    axios
      .post("/api/admin/test", { data: "dfghj" }, config)
      .then(({ data: isData }) => {
        // console.log(isData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

    const handlePage = useCallback((e) => {
    setStep(e);
    setSideBarView(0)
  }, []);

 

    const pageSelectFunction = useMemo(()=>{
      const pagesDropDown = 
      [
        {label:"Landing Page", value:0},
        {label:"Bottom Bar", value:1},
        {label:"App Bar", value:2},
        {label:"Profile Pag", value:3},
        {label:"Cart Page", value:4},
        {label:"Product Detail Page", value:5},
        {label:"Side Bar", value:6},
      ]
      return <div className="topbar_select">
      <CommonSelect
       //  name="font_family"
        value={step}
        option={pagesDropDown}
        onChange={(e) => handlePage(e.target.value)}
      />
   </div>
    },[step])
  return (
    <Spin spinning={loading} indicator={
      <LoadingOutlined style={{ fontSize: "40px", color: "#7d2ae8" }} />
    }>
     
        <SaveChangesBar
          data={{
            builderFields,
            design_name,
            menu,
            delName,
            updateId,
            app_apperance,
            app_bar,
            layoutSelection,
            sideBar_data
          }}
          step={step}
          setStep={setStep}
          sideBar={sideBar}
          setSideBar={setSideBarView}
          setLoading={setLoading}
          navigate={navigate}
          setDesignName={setDesignName}
        >
          <div>
           {/* <div className="topbar_select">
             <CommonSelect
              //  name="font_family"
               value={step}
               option={pagesDropDown}
               onChange={(e) => handlePage(e.target.value)}
             />
          </div> */}
      {sideBar == 0 ? (
        step == 0 ? (
          <CreatePage
            setBuilderFields={setBuilderFields}
            pageSelectFunction={pageSelectFunction}
            builderFields={builderFields}
            menu={menu}
            app_apperance={app_apperance}
            app_bar={app_bar}
          />
        ) : step == 1 ? (
          <CreateMenu
          pageSelectFunction={pageSelectFunction}
            menu={menu}
            setMenu={setMenu}
            builderFields={builderFields}
            app_apperance={app_apperance}
            app_bar={app_bar}
          />
        ) : step == 2 ? (
          <AppBar pageSelectFunction={pageSelectFunction} app_bar={app_bar} setAppBar={setAppBar} />
        ) : step == 3 || step == 4 || step == 5 ? (
          <LayoutSelect pageSelectFunction={pageSelectFunction} step={step} layoutSelection={layoutSelection} setLayoutSelect={setLayoutSelect} />
        ) : step == 6 ? (
         <SideBar pageSelectFunction={pageSelectFunction} sideBar={sideBar_data} setSidebar={setSidebar}/>
        )
        : null
      ) : sideBar == 1 ? (
        <AppApperance
          app_appearance={app_apperance}
          app_bar={app_bar}
          setapp_appearance={setApp_apperance}
        />
      ) : (
        "No Preview"
      )}
      </div>
        </SaveChangesBar>
         
    </Spin>
  );
}
