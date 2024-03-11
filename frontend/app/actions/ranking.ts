"use server";

import { ActionError, ActionResponse, axiosInstance, errorHandler } from ".";

import { PageOptions } from "@/types/ranking";

export const getRankings = async (
  options: PageOptions,
): Promise<ActionResponse | ActionError> => {
  try {
    const response = await axiosInstance.get("/ranking", {
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
