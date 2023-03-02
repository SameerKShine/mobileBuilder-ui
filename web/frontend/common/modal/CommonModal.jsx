import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";

function CommonModal({ title, okFunc, button, openBtn, icon, openButtonClass, buttonText, modalWidth, visible, disableok }) {
    const [isModalVisible, setIsModalVisible] = useState(visible??false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      okFunc();
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  return (
    <>
         {
       icon ? 
       <Tooltip>
   <a className={`SD-icon ${openButtonClass}`} disabled={openBtn??false} onClick={showModal}>
      {buttonText}
    </a>
     </Tooltip>
     :
     <button disabled={openBtn??false} className={`SD-saveButton ${openButtonClass??""}` }onClick={showModal}>
      {buttonText}
    </button>
     }
   
    <Modal
     className="SD-ShowModal"
      width={modalWidth ?? 400}
      open={isModalVisible}
      footer={[
        button.cancel.length>1 && <Button key="back" onClick={handleCancel}>
          {button.cancel}
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="modalPopoOkBtn"
          disabled={disableok??false}
          onClick={handleOk}
        >
          {button.ok}
        </Button>,
      ]}
      closable={false}
      centered
      className="modalPopup"
    >
      {title}
    </Modal>
  </>
  )
}

export default CommonModal