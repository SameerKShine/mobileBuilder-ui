import { notification } from "antd";

export const errToast = (res, placement, type) => {
  notification.error({
    message: `Notification ${placement}`,
    description: `${res}`,
    placement,
  });
};
export const sucessToast = (res, placement, type) => {
  notification.success({
    message: `Notification ${placement}`,
    description: `${res}`,
    placement,
  });
};