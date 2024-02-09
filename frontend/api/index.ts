import axios from "axios";

const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
