const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

export default API_URL;
