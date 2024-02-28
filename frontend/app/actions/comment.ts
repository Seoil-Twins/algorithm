import { CommentResponse, PageOptions } from "@/types/comment";
import { ActionError, ActionResponse, axiosInstance, errorHandler } from ".";

export const getComments = async (
  boardId: number,
  options: PageOptions,
): Promise<ActionResponse<CommentResponse> | ActionError> => {
  try {
    const response = await axiosInstance.get(`/board/comment/${boardId}`, {
      params: options,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const postComment = async (
  type: "comment" | "code",
  requestId: string,
  content: string,
) => {
  try {
    let response;

    if (type === "comment") {
      response = await axiosInstance.post(`/board/comment/${requestId}`, {
        content,
      });
    } else {
      response = await axiosInstance.post(`/code/comment/${requestId}`, {
        content,
      });
    }

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const postSolvedComment = async (
  boardId: string | number,
  commentId: string | number,
) => {
  try {
    const response = await axiosInstance.post(
      `/board/adopt/${boardId}/${commentId}`,
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const patchComment = async (
  commentId: string | number,
  content: string,
) => {
  try {
    const response = await axiosInstance.patch(`/board/comment/${commentId}`, {
      content,
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteComment = async (commentId: string | number) => {
  try {
    const response = await axiosInstance.delete(`/board/comment/${commentId}`);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
