import {
  AlgorithmBoardPageOptions,
  PublicBoardPageOptions,
} from "@/types/board";
import { API_INSTANCE, Body } from ".";

const API_URL = "/board";

export const BoardAPI = {
  getBoardTypes: async () => {
    return await API_INSTANCE.GET(`${API_URL}/kind`);
  },
  getRecommendBoards: async () => {
    return await API_INSTANCE.GET(`${API_URL}/recommend`);
  },
  getBoards: async (
    options: AlgorithmBoardPageOptions | PublicBoardPageOptions,
  ) => {
    const searchParams = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      value && searchParams.append(key, String(value));
    });

    console.log("in");

    return await API_INSTANCE.GET(`${API_URL}?${searchParams.toString()}`);
  },
  getBoard: async (boardId: number) => {
    return await API_INSTANCE.GET(`${API_URL}/${boardId}`);
  },
  getUpdateBoard: async (boardId: number) => {
    return await API_INSTANCE.GET(`${API_URL}/${boardId}/update`);
  },
  addPublicBoard: async (body: Body) => {
    return await API_INSTANCE.POST(API_URL, body);
  },
  addDummyImage: async (formData: FormData) => {
    return await API_INSTANCE.POST_FORMDATA(`${API_URL}/image`, formData);
  },
  addRecommend: async (boardId: number) => {
    return await API_INSTANCE.POST(`${API_URL}/${boardId}/recommend`);
  },
  addView: async (boardId: number) => {
    return await API_INSTANCE.POST(`${API_URL}/${boardId}/view`);
  },
  updateBoard: async (boardId: number, body: Body) => {
    return await API_INSTANCE.PATCH(`${API_URL}/${boardId}`, body);
  },
  deleteRecommend: async (boardId: number) => {
    return await API_INSTANCE.DELETE(`${API_URL}/${boardId}/recommend`);
  },
  deleteBoard: async (boardId: number) => {
    return await API_INSTANCE.DELETE(`${API_URL}/${boardId}`);
  },
};
