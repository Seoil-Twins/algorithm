import { AlgorithmBoardPageOptions } from "@/types/board";
import { API_INSTANCE } from ".";
import { PageOptions } from "@/types";

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
  getBoardComments: async (boardId: number, options: PageOptions) => {
    const searchParams = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      value && searchParams.append(key, String(value));
    });

    return await API_INSTANCE.GET(
      `${API_URL}/${boardId}/comment?${searchParams.toString()}`,
    );
  },
  addDummyImage: async (formData: FormData) => {
    return await API_INSTANCE.POST_FORMDATA(`${API_URL}/image`, formData);
  },
};
