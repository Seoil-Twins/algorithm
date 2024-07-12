const enviroment = process.env.NEXT_PUBLIC_ENVIROMENT;
const API_URL =
  enviroment === "product"
    ? process.env.NEXT_PUBLIC_FRONT_API_URL_PRODUCT
    : process.env.NEXT_PUBLIC_FRONT_API_URL_DEVELOPMENT;
export const IMAGE_URL = `${API_URL}/display?filename=`;

export type Body = Record<string, any>;

export const API_INSTANCE = {
  getHeaders: async (): Promise<Headers> => {
    const isSSR = typeof window === "undefined";

    if (isSSR) {
      const { headers } = await import("next/headers");
      const requestHeaders = new Headers(headers());
      requestHeaders.append("Content-Type", "application/json");
      return requestHeaders;
    }

    return new Headers({
      "Content-Type": "application/json",
    });
  },

  GET: async (url: string): Promise<Response> => {
    const headers = await API_INSTANCE.getHeaders();
    const response = await fetch(API_URL + url, {
      method: "GET",
      headers,
      credentials: "include",
    });

    return response;
  },

  POST: async (url: string, body?: Body): Promise<Response> => {
    const headers = await API_INSTANCE.getHeaders();
    const response = await fetch(API_URL + url, {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
      cache: "no-cache",
    });

    return response;
  },

  PATCH: async (url: string, body?: Body): Promise<Response> => {
    const headers = await API_INSTANCE.getHeaders();
    const response = await fetch(API_URL + url, {
      method: "PATCH",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
      cache: "no-cache",
    });

    return response;
  },

  PUT: async (url: string, body?: Body): Promise<Response> => {
    const headers = await API_INSTANCE.getHeaders();
    const response = await fetch(API_URL + url, {
      method: "PUT",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    return response;
  },

  DELETE: async (url: string, body?: Body): Promise<Response> => {
    const headers = await API_INSTANCE.getHeaders();
    const response = await fetch(API_URL + url, {
      method: "DELETE",
      headers,
      credentials: "include",
      body: JSON.stringify(body),
    });

    return response;
  },
};
