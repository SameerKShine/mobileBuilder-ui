import React, {useState, useCallback} from "react";
import { useOutletContext } from "react-router-dom";
import CreatePage from "../components/landingPage/CreatePage";
import { useQuery } from "react-query";
import CreateMenu from "../components/menu/CreateMenu";
import axios from "axios";
import {useApi} from '../hooks'
import { useAppBridge } from "@shopify/app-bridge-react"  
import { getSessionToken } from "@shopify/app-bridge-utils";
import { Button, Checkbox } from "@shopify/polaris";
// import {ProductsCard} from '../components/ProductsCard'

export default function HomePage() {

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
    ],
    background_color: "",
  });

  const [step] = useOutletContext();
  // const step  = 0
  // const fetch = useAuthenticatedFetch();

  // const {
  //   data,
  //   refetch: refetchProductCount,
  //   isLoading: isLoadingCount,
  //   isRefetching: isRefetchingCount,
  // } = useGetCollection({
  //   url: "/api/admin/test",
  //   reactQueryOptions: {
  //     onSuccess: () => {
  //       setIsLoading(false);
  //     },
  //   },
  // });
// console.log(data)
const app = useAppBridge();
// // const apis = useApi('/api/admin/test')

const handleTest = async() => {
const sessionToken = await getSessionToken(app);
console.log(sessionToken)
  const config = {
    headers: { Authorization: `Bearer ${sessionToken}` }
  };
  // const { loading, data } = apis
  // console.log(data)
  axios
    .post('/api/admin/test', {data:'dfghj'}, config)
    .then(({ data: isData }) => {
      console.log(isData);
    })
    .catch(error => {
      console.log(error);
    });
}
// const [checked, setChecked] = useState(false);
// // const handleChange = useCallback((newChecked) => console.log(newChecked), []);
// const handleChange = (e,name) => {
// console.log(e,name)
// } 
  return (
    <>
    <button onClick={handleTest}>Click</button>
    {/* <div className="ploris_BUTTON">
    <Button class="Tetsinh the polris">Add product</Button>
    <Checkbox
      label="Basic checkbox"
      checked={checked}
      id="checking"
      name="chekboxname"
      onChange={(e,name)=>handleChange(e,name)}
    />
    </div> */}
    {/* <ProductsCard/> */}
    {/* <Button className="oloarisTestBtn">Click</Button> */}
      {step == 0 ? (
        <CreatePage
          setBuilderFields={setBuilderFields}
          builderFields={builderFields}
          menu={menu}
        />
      ) : step == 1 ? (
        <CreateMenu
          menu={menu}
          setMenu={setMenu}
          builderFields={builderFields}
        />
      ) : step == 2 ? (
        "theme"
      ) : step == 3 ? (
        "test"
      ) : null}
    </>
  );
}
