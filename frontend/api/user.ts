import { API_INSTANCE, Body } from ".";

const API_URL = "/user";

export const UserAPI = {
  getUser: async () => {
    return await API_INSTANCE.GET(API_URL);
  },
  getSnsInfo: async () => {
    return await API_INSTANCE.GET(`${API_URL}/link`);
  },
  getHistoryAlgirhtm: async () => {
    return await API_INSTANCE.GET(`${API_URL}/try`);
  },
  getMyQuestion: async (
    userId: string,
    page: number = 1,
    count: number = 5,
  ) => {
    return await API_INSTANCE.GET(
      `${API_URL}/${userId}/question?page=${page}&count=${count}`,
    );
  },
  getMyFeedback: async (
    userId: string,
    page: number = 1,
    count: number = 5,
  ) => {
    return await API_INSTANCE.GET(
      `${API_URL}/${userId}/feedback?page=${page}&count=${count}`,
    );
  },
  getMyFree: async (userId: string, page: number = 1, count: number = 5) => {
    return await API_INSTANCE.GET(
      `${API_URL}/${userId}/free?page=${page}&count=${count}`,
    );
  },
  getMyAnswer: async (userId: string, page: number = 1, count: number = 5) => {
    return await API_INSTANCE.GET(
      `${API_URL}/${userId}/answer?page=${page}&count=${count}`,
    );
  },
  getMyComment: async (userId: string, page: number = 1, count: number = 5) => {
    return await API_INSTANCE.GET(
      `${API_URL}/${userId}/comment?page=${page}&count=${count}`,
    );
  },
  getMyRecommend: async (
    userId: string,
    page: number = 1,
    count: number = 5,
  ) => {
    return await API_INSTANCE.GET(
      `${API_URL}/${userId}/recommend?page=${page}&count=${count}`,
    );
  },
  getNotification: async () => {
    return await API_INSTANCE.GET(`${API_URL}/notification`);
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
  updateProfile: async (body: Body) => {
    return await API_INSTANCE.PATCH(`${API_URL}`, body);
  },
  updateProfileImage: async (formData: FormData) => {
    return await API_INSTANCE.PATCH_FORMDATA(`${API_URL}/profile`, formData);
  },
  updateNotification: async (body: Body) => {
    return await API_INSTANCE.PUT(`${API_URL}/notification`, body);
  },
  deleteUser: async () => {
    return await API_INSTANCE.DELETE(`${API_URL}`);
  },
};
