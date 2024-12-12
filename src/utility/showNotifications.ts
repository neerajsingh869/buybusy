import toast from "react-hot-toast";

export const showNotification = (message: string) => {
  toast.success(message, {
    duration: 2000,
    style: {
      minWidth: "18rem",
      minHeight: "3.5rem",
      marginTop: "0.25rem",
    },
  });
};
