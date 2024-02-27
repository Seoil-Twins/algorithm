import axios, { AxiosError } from "axios";

const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_API_URL_DEVELOPMENT;

export const IMAGE_URL = `${API_URL}/display?filename=`;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export type ActionResponse<T = any> = {
  status: number;
  data: T;
};

export type ActionError = {
  status: number;
  data: string;
};

export const errorHandler = (error: any): ActionError => {
  if (error instanceof AxiosError) {
    return {
      status: error.response?.data.errorCode || error.response?.status || 500,
      data:
        (typeof error.response?.data === "object"
          ? error.response?.data.message
          : error.response?.data) || "서버와의 통신 중 오류가 발생했습니다.",
    };
  }

  return {
    status: 500,
    data: "서버와의 통신 중 오류가 발생했습니다.",
  };
};

/**
 * Next js에서 페이지를 렌더링할 때 쿠키가 제공되지만 그 후에는 제공되지 않음.
 * 그렇기에, 다음 요청부터는 서버에 직접 쿠키를 전달해줘야 함.
 */
axiosInstance.interceptors.request.use(async (config) => {
  const isSSR = typeof window === "undefined";

  if (isSSR) {
    const { cookies } = await import("next/headers");
    const key = (process.env.NEXT_PUBLIC_SESSION_KEY as string) || "JSESSIONID";
    const sessionId = cookies().get(key)?.value;

    if (sessionId) {
      config.headers.set("cookie", `${key}=${sessionId}`);
    }
  }

  return config;
});
