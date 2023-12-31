const enviroment = process.env.ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.API_URL_PRODUCT
    : process.env.API_URL_DEVELOPMENT;

export default API_URL;
