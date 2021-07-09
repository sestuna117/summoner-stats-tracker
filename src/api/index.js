import axios from "axios";

export const axiosConfig = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
});
