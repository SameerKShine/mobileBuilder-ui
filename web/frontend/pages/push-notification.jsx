import React, { useState } from "react";
import CreateNotification from "../components/pushNotificaton/CreateNotification";
import NotificationList from "../components/pushNotificaton/NotificationList";

function PushNotification() {
  const [openCreatePage, setCreatepage] = useState(false);
  return (
    <>
      <div classname="createNotificationBtn" style={{ textAlign: "right" }}>
        {" "}
        <button
          className="SD-saveButton"
          onClick={() => setCreatepage(!openCreatePage)}
        >
          {openCreatePage?"Notification List":"Create Notification"}
        </button>
      </div>
      {!openCreatePage && <NotificationList />}
      {openCreatePage && <CreateNotification />}
    </>
  );
}

export default PushNotification;
