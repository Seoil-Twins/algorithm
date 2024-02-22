import { AxiosResponse } from "axios";
import { axiosInstance } from ".";

import { CommentResponse, PageOptions } from "@/types/comment";

export const getComments = async (
  boardId: number,
  options: PageOptions,
): Promise<AxiosResponse<CommentResponse>> => {
  const response = await axiosInstance.get(`/board/comment/${boardId}`, {
    params: options,
  });
  return response;
};

export const postComment = async (boardId: string, content: string) => {
  const response = await axiosInstance.post(`/board/comment/${boardId}`, {
    content,
  });
  return response;
};

export const postSolvedComment = async (
  boardId: string | number,
  commentId: string | number,
) => {
  const response = await axiosInstance.post(
    `/board/adopt/${boardId}/${commentId}`,
  );
  return response;
};

export const patchComment = async (
  commentId: string | number,
  content: string,
) => {
  const response = await axiosInstance.patch(`/board/comment/${commentId}`, {
    content,
  });
  return response;
};

export const deleteComment = async (commentId: string | number) => {
  const response = await axiosInstance.delete(`/board/comment/${commentId}`);
  return response;
};
