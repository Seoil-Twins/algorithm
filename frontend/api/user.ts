import { API_INSTANCE, Body } from ".";

const API_URL = "/user";

export const UserAPI = {
  getUser: async () => {
    return await API_INSTANCE.GET(API_URL);
  },
  getNotifications: async (page: number = 1, count: number = 10) => {
    return await API_INSTANCE.GET(`${API_URL}?page=${page}&count=${count}`);
  },
  login: async (body: Body) => {
    return await API_INSTANCE.POST(`${API_URL}/login`, body);
  },
  logout: async () => {
    return await API_INSTANCE.POST(`${API_URL}/logout`);
  },
  signup: async (body: Body) => {
    return await API_INSTANCE.POST(API_URL, body);
  },
  sendVerfiyCode: async (body: Body) => {
    return await API_INSTANCE.POST(`${API_URL}/verify/send`, body);
  },
  compareVerifyCode: async (body: Body) => {
    return await API_INSTANCE.POST(`${API_URL}/verify/compare`, body);
  },
};
