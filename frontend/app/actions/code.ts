"use server";

import { ActionError, ActionResponse, axiosInstance, errorHandler } from ".";

import { AnswerResponse, PageOptions, RequestCode } from "@/types/code";

export const getAnswer = async (
  algorithmId: number | string,
  options: PageOptions,
): Promise<ActionResponse<AnswerResponse> | ActionError> => {
  try {
    const response = await axiosInstance.get(`/code/${algorithmId}`, {
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

export const sendCode = async (data: RequestCode) => {
  try {
    const response = await axiosInstance.post("/code", data);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
