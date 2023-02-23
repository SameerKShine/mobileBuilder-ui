import React, { useState } from "react";
import { Button, Modal, Tooltip } from "antd";

function CommonModal({ title, okFunc, button, openBtn, buttonText, modalWidth, visible }) {
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
    <div className="SD-ShowModal">
    {/* <Tooltip title={tooltip}> */}
  { !visible&& <button disabled={openBtn??false} className="SD-saveButton" onClick={showModal}>
      {buttonText}
      {/* <Icon source={icon} color={iconColor} /> */}
    </button>}
    {/* </Tooltip> */}
    <Modal
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
  </div>
  )
}

export default CommonModal