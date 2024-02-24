import { AxiosResponse } from "axios";

import { axiosInstance } from ".";

import { BoardType } from "@/types/boardType";
import { Board, BoardResponse, PageOptions, RequestBoard } from "@/types/board";
import { AlgorithmPageOptions, AlgorithmPostData } from "@/types/algorithm";

export const getBoardTypes = async () => {
  const response: BoardType[] = [
    {
      boardTypeId: 1,
      title: "일반 질문",
    },
    {
      boardTypeId: 2,
      title: "일반 자유",
    },
    {
      boardTypeId: 3,
      title: "알고리즘 질문",
    },
    {
      boardTypeId: 4,
      title: "알고리즘 피드백",
    },
  ];

  return response;
};

export const getRecommendPosts = async () => {
  const response = await axiosInstance.get<BoardResponse>("/board/recommend");
  return response;
};

export const getBoardDetail = async (
  boardId: string | number,
): Promise<AxiosResponse<Board>> => {
  const response = await axiosInstance.get<Board>(`/board/${boardId}`);
  return response;
};

export const getBoards = async (options: PageOptions) => {
  const response = await axiosInstance.get<BoardResponse>("/board", {
    params: options,
  });
  return response;
};

export const getAlgorithmBoards = async (
  algorithmId: number,
  options: AlgorithmPageOptions,
): Promise<AxiosResponse<BoardResponse>> => {
  console.log({
    boardType: options.kind,
    keyword: options.keyword,
    page: options.page,
    count: options.count,
  });
  const response = await axiosInstance.get(`/board/algorithm/${algorithmId}`, {
    params: {
      boardType: options.kind,
      keyword: options.keyword,
      page: options.page,
      count: options.count,
    },
  });

  return response;
};

export const postBoardImage = async (boardId: string, image: File) => {
  const response = await axiosInstance.postForm(`/board/image/${boardId}`, {
    image,
  });

  return response;
};

export const postAlgorithmBoard = async (data: AlgorithmPostData) => {
  const response = await axiosInstance.post("/board", data);
  return response;
};

export const patchBoard = async (
  boardId: string | number,
  data: RequestBoard,
) => {
  const response = await axiosInstance.patch(`/board/${boardId}`, data);
  return response;
};

export const deleteBoard = async (boardId: string | number) => {
  const response = await axiosInstance.delete(`/board/${boardId}`);
  return response;
};
