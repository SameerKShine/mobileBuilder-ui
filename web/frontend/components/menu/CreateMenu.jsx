import React, { useEffect, useState } from "react";
import { FieldsPreview } from "../../common/builder/FieldsPreview";
import EditMenu from "./edit/EditMenu";
import MenuOptions from "./MenuOptions";
import PreviewCard from "../../common/builder/PreviewCard";
import SaveChangesBar from "../../common/SaveChangesBar";
import {usePrevious} from "../../hooks";

function CreateMenu({ setMenu, menu, builderFields, app_apperance, app_bar, pageSelectFunction }) {
  // const [showTopbar, setShowTopbar] = useState(false);
  const checkVal = usePrevious(menu);
  // useEffect(() => {
  //   console.log("MENU USE EFFECT");
  //   if (checkVal !== undefined) {
  //     if (checkVal !== menu) {
  //       console.log("enter in if condition");
  //       console.log("checkVal  ==>", checkVal);
  //       console.log("menu  ==>", menu);
  //       setShowTopbar(true);
  //     } else {
  //       console.log("enter in ELSE condition");
  //       console.log("checkVal  ==>", checkVal);
  //       console.log("menu  ==>", menu);
  //       //  setShowBtn(false)
  //     }
  //   }
  // }, [menu]);
  return (
    <>

      <div className="SD-editSection">
        <MenuOptions menu={menu} setMenu={setMenu} />
        <PreviewCard  pageSelectFunction={pageSelectFunction}   primaryClass="SD-builderPreview" secondaryClass="white-bg-box mobile_preview" data={menu} app_bar={app_bar}  bgColor={app_apperance?.background_color}>
          {builderFields.map((eleType, index) => {
            return <div key={index}>{FieldsPreview(eleType, index, app_apperance)}</div>;
          })}
        </PreviewCard>
        <EditMenu menu={menu} setMenu={setMenu} />
      </div>
    </>
  );
}

export default CreateMenu;
