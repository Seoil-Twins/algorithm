import { AlgorithmBoardPageOptions } from "@/types/board";
import { API_INSTANCE } from ".";

const API_URL = "/board";

export const BoardAPI = {
  getBoardTypes: async () => {
    return await API_INSTANCE.GET(`${API_URL}/kind`);
  },
  getRecommendBoards: async () => {
    return await API_INSTANCE.GET(`${API_URL}/recommend`);
  },
  getBoards: async (options: AlgorithmBoardPageOptions) => {
    const searchParams = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      value && searchParams.append(key, String(value));
    });

    return await API_INSTANCE.GET(`${API_URL}?${searchParams.toString()}`);
  },
  getBoard: async (boardId: number) => {
    return await API_INSTANCE.GET(`${API_URL}/${boardId}`);
  },
  addDummyImage: async (formData: FormData) => {
    return await API_INSTANCE.POST_FORMDATA(`${API_URL}/image`, formData);
  },
  addRecommend: async (boardId: number) => {
    return await API_INSTANCE.POST(`${API_URL}/${boardId}/recommend`);
  },
  deleteRecommend: async (boardId: number) => {
    return await API_INSTANCE.DELETE(`${API_URL}/${boardId}/recommend`);
  },
};
