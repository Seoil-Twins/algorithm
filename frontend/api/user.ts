import { axiosInstance } from ".";

type SignupUser = {
  email: string;
  nickname: string;
  userPw: string;
};

type PageOptions = {
  page: number;
  count: number;
};

export const UserKeys = {
  getUser: "/user/me",
  getNotification: "/user/notification",
};

export const getUser = async () => {
  const response = await axiosInstance.get("/user/me");
  return response;
};

export const getUserSNSInfo = async (userId: string | number) => {
  const response = await axiosInstance.get(`/user/link/${userId}`);
  return response;
};

export const getUserSolved = async () => {
  const response = await axiosInstance.get("/user/mypage/solved");
  return response;
};

export const getMyQuestions = async (data: PageOptions) => {
  const response = await axiosInstance.get("/user/mypage/question", {
    params: data,
  });
  return response;
};

export const getMyFrees = async (data: PageOptions) => {
  const response = await axiosInstance.get("/user/mypage/free", {
    params: data,
  });
  return response;
};

export const getMyFeedbacks = async (data: PageOptions) => {
  const response = await axiosInstance.get("/user/mypage/feedback", {
    params: data,
  });
  return response;
};

export const getMyFavorites = async (data: PageOptions) => {
  const response = await axiosInstance.get("/user/mypage/favorite", {
    params: data,
  });
  return response;
};

export const getMyComments = async (data: PageOptions) => {
  const response = await axiosInstance.get("/user/mypage/comment", {
    params: data,
  });
  return response;
};

export const getMyAnswers = async (data: PageOptions) => {
  const response = await axiosInstance.get("/user/mypage/answer", {
    params: data,
  });
  return response;
};

export const sendVerifyCode = async (data: { email: string }) => {
  const response = await axiosInstance.post("/user/verify/send", data);
  return response;
};

export const compareVerifyCode = async (data: {
  email: string;
  verifyCode: string;
}) => {
  const response = await axiosInstance.post("/user/verify/compare", data);
  return response;
};

export const login = async (data: { email: string; userPw: string }) => {
  const response = await axiosInstance.post("/login", data);
  return response;
};

export const signup = async (data: SignupUser) => {
  const response = await axiosInstance.post("/user", data);
  return response;
};

export const updateProfileUser = async (
  userId: number | string,
  data: { email?: string; nickname?: string },
) => {
  const response = await axiosInstance.patch(`/user/${userId}`, data);
  return response;
};

export const updateProfileImg = async (
  userId: number | string,
  data: { image: File },
) => {
  const response = await axiosInstance.patchForm(
    `/user/profile/${userId}`,
    data,
  );
  return response;
};

export type ResponseNotification = {
  annoNofi: boolean;
  postNofi: boolean;
  commentNofi: boolean;
  likeNofi: boolean;
  answerNofi: boolean;
  eventNofi: boolean;
};

export const getNotifications = async () => {
  const response = await axiosInstance.get(`/user/notification`);
  return response;
};

export const updateNotifications = async (
  userId: number | string,
  data: Partial<ResponseNotification>,
) => {
  const response = await axiosInstance.patch(`/user/nofi/${userId}`, data);
  return response;
};

export const deleteUser = async (userId: string | number) => {
  const response = await axiosInstance.delete(`/user/${userId}`);
  return response;
};
