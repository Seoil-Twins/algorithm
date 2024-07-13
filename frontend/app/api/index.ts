import { Body } from "@/api";

const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.BACKEND_API_URL_PRODUCT
    : process.env.BACKEND_API_URL_DEVELOPMENT;
const sessionId = process.env.NEXT_PUBLIC_SESSION_KEY;

export class CustomException {
  status: number;
  errorCode: number;
  error: string;
  message: string;
  code: string;
  timestamp: string;

  constructor(
    status: number,
    errorCode: number,
    error: string,
    message: string,
    code: string,
    timestamp: string,
  ) {
    this.status = status;
    this.errorCode = errorCode;
    this.error = error;
    this.message = message;
    this.code = code;
    this.timestamp = timestamp;
  }
}

export const ErrorCode = {
  NOT_MATCH_PASSWORD: 40010,
  VERIFIED_EMAIL: 40020,
  EXPIRED_TIME_EMAIL: 40030,
  NOT_MATCH_VERIFY_CODE: 40040,
  BROKEN_IMAGE: 40050,
  INVALID_COOKIE: 40110,
  BLANK_COOKIE: 40120,
  NOT_VERIFIED_EMAIL: 40310,
  DELETED_USER: 40330,
  NOT_FOUND_USER: 40410,
  NOT_FOUND_BOARD_TYPE: 40470,
  NOT_FOUND_EMAIL_VERIFIED: 40480,
  DUPLICATE_PARAMETER_NICKNAME: 40910,
  DUPLICATE_PARAMETER_EMAIL: 40920,
  ERROR_EMAIL_SENDER: 50020,
  ERROR_IMAGE_UPLOAD: 50030,
} as const;

export type CustomResponse = {
  data: any;
  headers: Headers;
};

export const createNextApiError = (error: any) => {
  const response: CustomException = new CustomException(
    500,
    500,
    "Next API Error",
    error ? error : "알 수 없는 오류가 발생하였습니다.",
    "UNKNOWN ERROR",
    new Date(Date.now()).toString(),
  );

  return response;
};

export const handleUnAuthorization = (
  exception: CustomException,
  headers: Headers,
) => {
  if (
    exception.errorCode === ErrorCode.INVALID_COOKIE ||
    exception.errorCode === ErrorCode.BLANK_COOKIE
  ) {
    headers.delete(sessionId || "JSESSIONID");
  }

  return headers;
};

const updateCookie = (response: Response): Headers => {
  const cookie = response.headers.get("set-cookie");
  const headers = new Headers();
  if (cookie) {
    headers.set("Set-Cookie", cookie);
  }

  return headers;
};

const handleResponse = async (
  response: Response,
  hasResponseData: boolean,
): Promise<CustomResponse> => {
  if (response.ok) {
    const responseHeaders = updateCookie(response);
    const data = hasResponseData ? await response.json() : null;

    return { data, headers: responseHeaders };
  } else {
    const error = (await response.json()) as CustomException;
    if (!error.message) {
      error.message = "알 수 없는 오류가 발생하였습니다.";
    }

    throw error;
  }
};

const fetchWithHandling = async (
  url: string,
  options: RequestInit,
  hasResponseData: boolean,
): Promise<CustomResponse> => {
  let response;
  try {
    response = await fetch(API_URL + url, options);
  } catch (error: any) {
    throw createNextApiError(error.message);
  }

  return await handleResponse(response, hasResponseData);
};

export const API_INSTANCE = {
  GET: async (url: string, headers: Headers): Promise<CustomResponse> => {
    const options: RequestInit = {
      method: "GET",
      headers,
    };
    return await fetchWithHandling(url, options, true);
  },

  POST: async (
    url: string,
    headers: Headers,
    body?: Body,
    hasResponseData: boolean = false,
  ): Promise<CustomResponse> => {
    headers.delete("Content-Length");

    const options: RequestInit = {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    };
    return await fetchWithHandling(url, options, hasResponseData);
  },

  PATCH: async (
    url: string,
    headers: Headers,
    body?: Body,
    hasResponseData: boolean = false,
  ): Promise<CustomResponse> => {
    headers.delete("Content-Length");

    const options: RequestInit = {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    };
    return await fetchWithHandling(url, options, hasResponseData);
  },

  PATCH_FORMDATA: async (
    url: string,
    headers: Headers,
    formData: FormData,
    hasResponseData: boolean = false,
  ): Promise<CustomResponse> => {
    headers.delete("Content-Length");
    // 브라우저가 자동으로 지정하게 설정
    // 라이브러리 사용하지 않고는 최선의 방법
    headers.delete("Content-Type");

    const options: RequestInit = {
      method: "PATCH",
      headers,
      body: formData,
    };
    return await fetchWithHandling(url, options, hasResponseData);
  },
};
