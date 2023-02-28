import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { errToast, sucessToast } from "./notification/notification";
import { useAPI } from "../globalState/getShop";
import { getSessionToken } from "@shopify/app-bridge-utils";
import SaveBar from "./navigation/SaveBar";
import postApi from "../utils/postApi";

function SaveChangesBar({ data, setDesignName, setLoading, navigate, step, setStep,sideBar,setSideBar, children }) {
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
    setLoading(true)
    console.log(data)
    const res = postApi(`builderData`, data, app);
    res
      .then((res) => {
        console.log("res", res);
        if (res.message == "succcess") {
          console.log("enter IN SUCESS CONDITION")
          sucessToast(res.data, "top");
          setLoading(false)
            navigate("/");
        } else {
          console.log("enter in error condition")
          errToast(res.data, "top");
          setLoading(false)
        }
      })
      .catch((err) =>{
        setLoading(false)
        console.log(err)
        });
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
    setSideBar(0);
  }, []);

  return (
      <SaveBar
        handleSave={handleSaveBuilder}
        handleEditTitle={handleEditTitle}
        handleDiscard={handleDiscard}
        // handlePage={handlePage}
        setSideBar={setSideBar}
        sideBar={sideBar}
        handleExit={handleExit}
        design_name={data?.design_name ?? ""}
        errorName={errorName}
        children={children}
      />

    //     //<>

    //     {/* <div style={{'width':'250px'}}>
    //   <div class="Polaris-Frame Polaris-Frame--hasTopBar" data-polaris-layer="true">
    //     <div class="Polaris-Frame__Skip">
    //       <a href="#AppFrameMain">Skip to content</a>
    //     </div>
    //     <div class="Polaris-Frame__TopBar" data-polaris-layer="true" data-polaris-top-bar="true" id="AppFrameTopBar">
    //       <div class="Polaris-TopBar">
    //         <button type="button" class="Polaris-TopBar__NavigationIcon" aria-label="Toggle menu">
    //           <div class="Polaris-TopBar__IconWrapper">
    //             <span class="Polaris-Icon">
    //               <span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //               </span>
    //               <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
    //                 <path d="M19 11h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0-7h-18a1 1 0 0 1 0-2h18a1 1 0 1 1 0 2zm0 14h-18a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2z">
    //                 </path>
    //               </svg>
    //             </span>
    //           </div>
    //         </button>
    //         <div class="Polaris-TopBar__LogoContainer Polaris-TopBar__LogoDisplayControl">
    //           <a class="Polaris-TopBar__LogoLink" style={{'width':"124px"}} href="#" data-polaris-unstyled="true">
    //             <img alt="Jaded Pixel" src="https://cdn.shopify.com/s/files/1/0446/6937/files/jaded-pixel-logo-color.svg?6215648040070010999" class="Polaris-TopBar__Logo" style={{'width':'124px'}}/>
    //             </a>
    //           </div>
    //           <div class="Polaris-TopBar__Contents">
    //             <div class="Polaris-TopBar__SearchField">
    //               <div class="Polaris-TopBar-SearchField">
    //                 <span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //                   <label for="PolarisSearchField1">Search</label>
    //                 </span>
    //                 <input id="PolarisSearchField1" class="Polaris-TopBar-SearchField__Input" placeholder="Search" type="search" autocapitalize="off" autocomplete="off" autocorrect="off" value=""/>
    //                 <span class="Polaris-TopBar-SearchField__Icon">
    //                   <span class="Polaris-Icon">
    //                     <span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //                     </span>
    //                     <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
    //                       <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293-4.82-4.82a5.968 5.968 0 0 0 1.113-3.473 6 6 0 0 0-12 0 6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z">
    //                       </path>
    //                     </svg>
    //                   </span>
    //                 </span>
    //                 <div class="Polaris-TopBar-SearchField__Backdrop Polaris-TopBar-SearchField__BackdropShowFocusBorder">
    //                 </div>
    //               </div>
    //               <div class="Polaris-TopBar-Search">
    //                 <div class="Polaris-TopBar-Search__SearchContent">
    //                   <div class="Polaris-TopBar-Search__Results">
    //                     <div class="Polaris-Box">
    //                       <ul class="Polaris-Box Polaris-Box--listReset" style={{"--pc-box-padding-block-end-xs":"var(--p-space-2)","--pc-box-padding-block-start-xs":"var(--p-space-2)","--pc-box-padding-inline-start-xs":"var(--p-space-2)","--pc-box-padding-inline-end-xs":"var(--p-space-2)"}} tabindex="-1">
    //                         <li>
    //                           <button type="button" class="Polaris-ActionList__Item">
    //                             <div class="Polaris-Inline" style={{"--pc-inline-align":"start","--pc-inline-block-align":"center","--pc-inline-wrap":"wrap","--pc-inline-gap-xs":"var(--p-space-0)"}}>
    //                               <span class="Polaris-ActionList__Text">Shopify help center</span>
    //                             </div>
    //                           </button>
    //                         </li>
    //                         <li>
    //                           <button type="button" class="Polaris-ActionList__Item">
    //                             <div class="Polaris-Inline" style={{"--pc-inline-align":"start","--pc-inline-block-align":"center","--pc-inline-wrap":"wrap","--pc-inline-gap-xs":"var(--p-space-0)"}}>
    //                               <span class="Polaris-ActionList__Text">Community forums</span>
    //                             </div>
    //                           </button>
    //                         </li>
    //                       </ul>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div class="Polaris-TopBar__SecondaryMenu">
    //               <div>
    //                 <div class="Polaris-TopBar-Menu__ActivatorWrapper">
    //                   <button type="button" class="Polaris-TopBar-Menu__Activator" tabindex="0" aria-controls="Polarispopover1" aria-owns="Polarispopover1" aria-expanded="false">
    //                     <span>
    //                       <span class="Polaris-Icon">
    //                         <span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //                         </span>
    //                         <svg viewBox="0 0 20 20" class="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
    //                           <path fill-rule="evenodd" d="M0 10c0-5.522 4.478-10 10-10 5.523 0 10 4.478 10 10 0 5.523-4.477 10-10 10-5.522 0-10-4.477-10-10zm11.125 2.002h-2.136v-.141c.01-1.966.492-2.254 1.374-2.782.093-.056.19-.114.293-.178.73-.459 1.292-1.038 1.292-1.883 0-.948-.743-1.564-1.666-1.564-.851 0-1.657.398-1.712 1.533h-2.266c.06-2.294 1.876-3.487 3.99-3.487 2.306 0 3.894 1.447 3.894 3.488 0 1.382-.695 2.288-1.805 2.952l-.238.144c-.79.475-1.009.607-1.02 1.777v.139zm.17 3.012a1.344 1.344 0 0 1-1.327 1.328 1.32 1.32 0 0 1-1.328-1.328 1.318 1.318 0 0 1 1.328-1.316c.712 0 1.322.592 1.328 1.316z">
    //                           </path>
    //                         </svg>
    //                       </span>
    //                       <span class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">Secondary menu</span>
    //                     </span>
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //             <div>
    //               <div class="Polaris-TopBar-Menu__ActivatorWrapper">
    //                 <button type="button" class="Polaris-TopBar-Menu__Activator" tabindex="0" aria-controls="Polarispopover2" aria-owns="Polarispopover2" aria-expanded="false">
    //                   <div class="Polaris-MessageIndicator__MessageIndicatorWrapper">
    //                     <span aria-label="Avatar with initials D" role="img" class="Polaris-Avatar Polaris-Avatar--sizeSmall Polaris-Avatar--shapeRound Polaris-Avatar--styleFour">
    //                       <span class="Polaris-Avatar__Initials">
    //                         <svg class="Polaris-Avatar__Svg" viewBox="0 0 40 40">
    //                           <text class="Polaris-Avatar__Text" x="50%" y="50%" dy="0.35em" fill="currentColor" text-anchor="middle">D</text>
    //                         </svg>
    //                       </span>
    //                     </span>
    //                   </div>
    //                   <span class="Polaris-TopBar-UserMenu__Details">
    //                     <p class="Polaris-Text--root Polaris-Text--bodyMd Polaris-Text--medium Polaris-Text--block Polaris-Text--start Polaris-Text--truncate">Dharma</p>
    //                     <p class="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--block Polaris-Text--start Polaris-Text--subdued Polaris-Text--truncate">Jaded Pixel</p>
    //                   </span>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //       <div class="Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade">
    //       </div>
    //       <main class="Polaris-Frame__Main" id="AppFrameMain" data-has-global-ribbon="false">
    //         <div class="Polaris-Frame__Content">
    //         </div>
    //       </main>
    //     </div>
    //   </div>

    //     <div className="Polaris-Frame" data-polaris-layer="true">
    //   <div className="Polaris-Frame__Skip">
    //     <a href="#AppFrameMain">Skip to content</a>
    //   </div>
    //   <div className="Polaris-Frame__ContextualSaveBar Polaris-Frame-CSSAnimation--startFade">
    //   </div>
    //   <main className="Polaris-Frame__Main" id="AppFrameMain" data-has-global-ribbon="false">
    //     <div className="Polaris-Frame__Content">
    //       <nav className="Polaris-Navigation">
    //         <div className="Polaris-Navigation__PrimaryNavigation Polaris-Scrollable Polaris-Scrollable--vertical Polaris-Scrollable--horizontal" data-polaris-scrollable="true">
    //           <ul className="Polaris-Navigation__Section">
    //             <li className="Polaris-Navigation__ListItem">
    //               <div className="Polaris-Navigation__ItemWrapper">
    //                 <div className="Polaris-Navigation__ItemInnerWrapper Polaris-Navigation__ItemInnerWrapper--selected">
    //                   <a className="Polaris-Navigation__Item Polaris-Navigation__Item--selected Polaris-Navigation--subNavigationActive" tabindex="0" href="#" data-polaris-unstyled="true">
    //                     <div className="Polaris-Navigation__Icon">
    //                       <span className="Polaris-Icon">
    //                         <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //                         </span>
    //                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
    //                           <path d="M10.555 3.168a1 1 0 0 0-1.11 0l-5.554 3.702a2 2 0 0 0-.891 1.665v6.465a2 2 0 0 0 2 2h2a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h2a2 2 0 0 0 2-2v-6.465a2 2 0 0 0-.89-1.664l-5.555-3.703Z">
    //                           </path>
    //                         </svg>
    //                       </span>
    //                     </div>
    //                     <span className="Polaris-Navigation__Text">Home</span>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="Polaris-Navigation__ListItem">
    //               <div className="Polaris-Navigation__ItemWrapper">
    //                 <div className="Polaris-Navigation__ItemInnerWrapper">
    //                   <a className="Polaris-Navigation__Item" tabindex="0" href="#" data-polaris-unstyled="true">
    //                     <div className="Polaris-Navigation__Icon">
    //                       <span className="Polaris-Icon">
    //                         <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //                         </span>
    //                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
    //                           <path d="M3.735 5.507a3 3 0 0 1 2.96-2.507h6.61a3 3 0 0 1 2.96 2.507l.735 4.493v5a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-5l.735-4.493Zm2.96-.507a1 1 0 0 0-.987.836l-.708 4.164v1h1.394a3 3 0 0 1 1.665.504l.832.555a2 2 0 0 0 2.218 0l.832-.555a3 3 0 0 1 1.666-.504h1.393v-1l-.708-4.164a1 1 0 0 0-.986-.836h-6.612Z">
    //                           </path>
    //                         </svg>
    //                       </span>
    //                     </div>
    //                     <span className="Polaris-Navigation__Text">Orders</span>
    //                     <div className="Polaris-Navigation__Badge">
    //                       <span className="Polaris-Badge Polaris-Badge--statusNew">
    //                         <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">New</span>
    //                         <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--medium">15</span>
    //                       </span>
    //                     </div>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //             <li className="Polaris-Navigation__ListItem">
    //               <div className="Polaris-Navigation__ItemWrapper">
    //                 <div className="Polaris-Navigation__ItemInnerWrapper">
    //                   <a className="Polaris-Navigation__Item" tabindex="0" href="#" data-polaris-unstyled="true">
    //                     <div className="Polaris-Navigation__Icon">
    //                       <span className="Polaris-Icon">
    //                         <span className="Polaris-Text--root Polaris-Text--bodySm Polaris-Text--regular Polaris-Text--visuallyHidden">
    //                         </span>
    //                         <svg viewBox="0 0 20 20" className="Polaris-Icon__Svg" focusable="false" aria-hidden="true">
    //                           <path d="M10.408 3h5.592a1 1 0 0 1 1 1v5.592a2 2 0 0 1-.57 1.399l-5.162 5.277a2.5 2.5 0 0 1-3.536 0l-4-4a2.5 2.5 0 0 1 0-3.536l.008-.008 5.27-5.154a2 2 0 0 1 1.397-.57Zm3.092 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z">
    //                           </path>
    //                         </svg>
    //                       </span>
    //                     </div>
    //                     <span className="Polaris-Navigation__Text">Products</span>
    //                   </a>
    //                 </div>
    //               </div>
    //             </li>
    //           </ul>
    //         </div>
    //       </nav>
    //     </div>
    //   </main>
    // </div> */}
    // //</>
  );
}

export default SaveChangesBar;
