import { API_INSTANCE } from ".";

const API_URL = "/notification";

export const NotificationAPI = {
  getNotifications: async (page: number = 1, count: number = 10) => {
    return await API_INSTANCE.GET(`${API_URL}?page=${page}&count=${count}`);
  },
};
