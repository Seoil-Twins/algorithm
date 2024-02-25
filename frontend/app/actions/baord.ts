"use server";

import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";

import { ActionError, ActionResponse, axiosInstance, errorHandler } from ".";

import { Board, BoardResponse, PageOptions, RequestBoard } from "@/types/board";
import { BoardType } from "@/types/boardType";
import { AlgorithmPageOptions } from "@/types/algorithm";

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

export const getRecommendPosts = async (): Promise<ActionResponse> => {
  try {
    const response = await axiosInstance.get<BoardResponse>(
      "/board/recommended",
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      status: 500,
      data: "서버와의 통신 중 오류가 발생하였습니다.",
    };
  }
};

export const getAlgorithmBoards = async (
  algorithmId: number,
  options: AlgorithmPageOptions,
): Promise<ActionResponse<BoardResponse> | ActionError> => {
  try {
    const response = await axiosInstance.get(
      `/board/algorithm/${algorithmId}`,
      {
        params: {
          boardType: options.kind,
          keyword: options.keyword,
          page: options.page,
          count: options.count,
        },
      },
    );

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getBoards = async (options: PageOptions) => {
  try {
    const response = await axiosInstance.get<BoardResponse>("/board", {
      // 변경되면 options로 사용
      params: {
        board_type: options.kind,
        keyword: options.keyword,
        page: options.page,
        count: options.count,
      },
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const getBoardDetail = async (
  boardId: string | number,
): Promise<ActionResponse<Board> | ActionError> => {
  try {
    const response = await axiosInstance.get<Board>(`/board/${boardId}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

/** @deprecated 아직 사용되지 않습니다. */
export const postBoardImage = async (boardId: string, image: File) => {
  const response = await axiosInstance.postForm(`/board/image/${boardId}`, {
    image,
  });

  return response;
};

export const postFeedbackSolved = async (boardId: string | number) => {
  try {
    const response = await axiosInstance.post(
      `/board/adopt-feedback/${boardId}`,
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

export const addBoard = async (
  boardType: number | string,
  content: string,
  formData: FormData,
  algorithmId?: number,
): Promise<ActionResponse> => {
  if (content.trim() === "" || content.trim().length < 10) {
    return {
      status: 400,
      data: "내용을 10자 이상 입력해주세요.",
    };
  }
  const title = formData.get("title") as string;
  if (title.trim() === "" || title.trim().length < 2) {
    return {
      status: 400,
      data: "제목을 2자 이상 입력해주세요.",
    };
  }

  try {
    const response = await axiosInstance.post("/board", {
      algorithmId,
      boardType,
      content,
      title,
    });

    if (algorithmId) {
      revalidatePath("/forum/*", "layout");
      revalidatePath("/algorithm/[algorithmId]/*", "layout");
    } else {
      revalidatePath("/forum/*", "layout");
    }
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const patchBoard = async (
  boardId: string | number,
  boardType: string | number,
  content: string,
  formData: FormData,
) => {
  if (content.trim() === "" || content.trim().length < 10) {
    return {
      status: 400,
      data: "내용을 10자 이상 입력해주세요.",
    };
  }
  const title = formData.get("title") as string;
  if (title.trim() === "" || title.trim().length < 2) {
    return {
      status: 400,
      data: "제목을 2자 이상 입력해주세요.",
    };
  }

  try {
    const response = await axiosInstance.patch(`/board/${boardId}`, {
      boardType,
      content,
      title,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteBoard = async (boardId: string | number) => {
  try {
    const response = await axiosInstance.delete(`/board/${boardId}`);
    revalidatePath("/forum/*", "layout");
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
