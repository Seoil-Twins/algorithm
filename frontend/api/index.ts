import { CustomException } from "@/app/api";

const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.NEXT_PUBLIC_FRONT_API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_FRONT_API_URL_DEVELOPMENT;
export const IMAGE_URL = `${API_URL}/display?filename=`;

export type Body = Record<string, any>;

const getCookie = async () => {
  const isSSR = typeof window === "undefined";

  if (isSSR) {
    const { headers } = await import("next/headers");
    const requestHeaders = new Headers(headers());
    return requestHeaders;
  }

  return undefined;
};

const getHeaders = async (
  contentType: string = "application/json",
): Promise<Headers> => {
  const headers = await getCookie();
  if (headers) {
    headers.set("Content-Type", contentType);
    return headers;
  }

  return new Headers({
    "Content-Type": contentType,
  });
};

export const API_INSTANCE = {
  GET: async (url: string, cache?: RequestCache): Promise<Response> => {
    const headers = await getHeaders();
    const response = await fetch(API_URL + url, {
      method: "GET",
      headers,
      credentials: "include",
      cache,
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },

  POST: async (
    url: string,
    body?: Body,
    contentType: string = "application/json",
  ): Promise<Response> => {
    const headers = await getHeaders(contentType);
    const response = await fetch(API_URL + url, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
      cache: "no-store",
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },

  POST_FORMDATA: async (url: string, formData: FormData): Promise<Response> => {
    /**
     * 브라우저에서 자동 감지 하도록 변경
     * formData의 getBoundary()도 사라지면서, 현재로썬 브라우저가 자동 감지하여 넣는게 최선
     */
    const headers = await getCookie();
    const response = await fetch(API_URL + url, {
      method: "POST",
      credentials: "include",
      headers,
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },

  PATCH: async (url: string, body?: Body): Promise<Response> => {
    const headers = await getHeaders();
    const response = await fetch(API_URL + url, {
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },

  PATCH_FORMDATA: async (
    url: string,
    formData: FormData,
  ): Promise<Response> => {
    /**
     * 브라우저에서 자동 감지 하도록 변경
     * formData의 getBoundary()도 사라지면서, 현재로썬 브라우저가 자동 감지하여 넣는게 최선
     */
    const headers = await getCookie();
    const response = await fetch(API_URL + url, {
      method: "PATCH",
      credentials: "include",
      headers,
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },

  PUT: async (url: string, body?: Body): Promise<Response> => {
    const headers = await getHeaders();
    const response = await fetch(API_URL + url, {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },

  DELETE: async (url: string, body?: Body): Promise<Response> => {
    const headers = await getHeaders();
    const response = await fetch(API_URL + url, {
      method: "DELETE",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error: CustomException = await response.json();
      throw new CustomException(
        error.status,
        error.errorCode,
        error.error,
        error.message,
        error.code,
        error.timestamp,
      );
    }

    return response;
  },
};
