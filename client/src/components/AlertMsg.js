import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      stacked
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnHover
      // theme="colored"
    />
  );
};

export default AlertMsg;
