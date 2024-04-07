import toast from "react-hot-toast";

export const showNotification = (message) => {
  toast.success(message, {
    duration: 2000,
    style: {
      minWidth: "18rem",
      minHeight: "3.5rem",
      marginTo: "2rem",
    },
  });
};
