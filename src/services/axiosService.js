import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";
import bussinesExceptions from "./errorHandling";

const token = "dsadsdsad";
const env = config.ENV;
const baseURL = config.API_URL[env];

const axiosService = axios.create({
  baseURL,
  headers: {
    Authenticaation: `Bearer :${token}`,
  },
});

axiosService.interceptors.response.use(null, (error) => {
  if (!bussinesExceptions.isExpectedError(error)) {
    const errorMessage = error.toJSON().message;
    toast.error(`An unexcepted error occured: ${errorMessage}`);
  }

  if (bussinesExceptions.isServerError(error)) {
    toast(`Server error:\n${error.response.statusText}`);
  }

  return Promise.reject(error);
});



export { axiosService};
