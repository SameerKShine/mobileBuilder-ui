import React from "react";
import CommonModal from "../modal/CommonModal";
import { CommonInput } from "../elements/commonElements";

function SaveBar({
  handleSave,
  flag,
  errorName,
  handleEditTitle,
  design_name,
  handleDiscard
}) {
  return (
    <>
      <div className={flag == "builder"?"SD-builderToBar":"SD-builderToBar SD-builderToBarCondition"}>
        <div className="SD-topbar-logo">
          <img src="https://cdn.shopify.com/shopifycloud/web/assets/v1/f5416ec27e17f00a67f8c2d6603088baa6635c7bc2071b4f6533c8d260fc8644.svg" />
        </div>
        <div className="SD-topbar-center">Unsaved changes</div>
        <div className="small-mobile-view top-bar SD-topbar-right">
          {flag == "builder" ? (
            <>
              {" "}
              <CommonInput
                onChange={handleEditTitle}
                value={design_name}
                input={{
                  placeholder: "Enter Template Title",
                  name: "builder_title",
                }}
              />
              <span style={{ color: "#ffffff" }}>{errorName}</span>
            </>
          ) : (
            ""
          )}
          <CommonModal
            title={
              <h4 className="modalTitle">
                Are you sure you want Discard Your Changes
              </h4>
            }
            okFunc={handleDiscard}
            button={{ ok: "yes", cancel: "Cancel" }}
            buttonText="Discard"
          />
          {flag == "builder" ? (
            <button
              className={`SD-saveButton ${
                design_name.length < 1 || errorName.length > 0
                  ? " disableBtnClr"
                  : ""
              }`}
              disabled={
                design_name.length < 1 || errorName.length > 0 ? true : false
              }
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button onClick={handleSave} className="SD-saveButton">
              Save
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default SaveBar;
