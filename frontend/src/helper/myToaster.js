import { toast } from "react-toastify";


/**
 * @params message : message to show on toaster
 * @params type : type of notifications
 * 1 : info
 * 2 : success
 * 3 : warning
 * 4 : error
 */


const myToaster = (message, type, id) => {
  const options = {
    toastId: id,
    position: "top-right",
    autoClose: 500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    maxOpened: 1,
    preventDuplicate: 1,
  };

  const toastTypes = {
    1: toast.info.bind(null, message, options),
    2: toast.success.bind(null, message, options),
    3: toast.warn.bind(null, message, options),
    4: toast.error.bind(null, message, options),
  };

  if(message !== null) {
    toastTypes[type].call()
  }
};

export default myToaster;
