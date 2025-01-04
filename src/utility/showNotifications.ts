import toast from "react-hot-toast";

import { Theme, Toast } from "../types";

export const showNotification = (
  message: string,
  type: Toast,
  theme: Theme
) => {
  const baseStyle = {
    minWidth: "18rem",
    minHeight: "3.5rem",
    marginTop: "0.25rem",
    ...(theme === "dark" && {
      background: "#333",
      color: "#fff",
    }),
  };

  const toastFunction = type === "success" ? toast.success : toast.error;

  toastFunction(message, {
    duration: 2000,
    style: baseStyle,
  });
};
