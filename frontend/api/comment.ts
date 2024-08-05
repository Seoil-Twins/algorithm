import { PageOptions } from "@/types";
import { API_INSTANCE, Body } from ".";

const boardIdParam = "{boardId}";
const API_URL_WITH_BOARD = `/board/${boardIdParam}/comment`;
const API_URL = "/comment";

export const CommentAPI = {
  getComments: async (boardId: number, options: PageOptions) => {
    const searchParams = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      value && searchParams.append(key, String(value));
    });

    return await API_INSTANCE.GET(
      `${API_URL_WITH_BOARD.replace(
        boardIdParam,
        String(boardId),
      )}?${searchParams.toString()}`,
    );
  },
  getAnswerComments: async (
    algorithmId: number,
    correctId: number,
    options: PageOptions,
  ) => {
    const searchParams = new URLSearchParams();

    Object.entries(options).forEach(([key, value]) => {
      value && searchParams.append(key, String(value));
    });

    return await API_INSTANCE.GET(
      `/algorithm/${algorithmId}/correct/${correctId}/comment?${searchParams.toString()}`,
    );
  },
  addSolveComment: async (boardId: number | string, commentId: number) => {
    return await API_INSTANCE.POST(
      `${API_URL_WITH_BOARD.replace(
        boardIdParam,
        String(boardId),
      )}/${commentId}/adopt`,
    );
  },
  addComment: async (boardId: number | string, body: Body) => {
    return await API_INSTANCE.POST(
      `${API_URL_WITH_BOARD.replace(boardIdParam, String(boardId))}`,
      body,
    );
  },
  addCodeComment: async (
    algorithmId: number,
    correctId: number,
    body: Body,
  ) => {
    return await API_INSTANCE.POST(
      `/algorithm/${algorithmId}/correct/${correctId}/comment`,
      body,
    );
  },
  addRecommend: async (commentId: number) => {
    return await API_INSTANCE.POST(`${API_URL}/${commentId}/recommend`);
  },
  updateComment: async (commentId: number | string, body: Body) => {
    return await API_INSTANCE.PATCH(`${API_URL}/${commentId}`, body);
  },
  deleteComment: async (commentId: number | string) => {
    return await API_INSTANCE.DELETE(`${API_URL}/${commentId}`);
  },
  deleteRecommend: async (commentId: number) => {
    return await API_INSTANCE.DELETE(`${API_URL}/${commentId}/recommend`);
  },
};
