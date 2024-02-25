"use server";

import {
  Algorithm,
  AlgorithmKind,
  AlgorithmOptions,
  AlgorithmResponse,
} from "@/types/algorithm";
import { ActionError, ActionResponse, axiosInstance, errorHandler } from ".";
import Explanation from "@/types/explanation";

export const getRecommendAlgorithms = async (): Promise<
  ActionResponse | ActionError
> => {
  try {
    const response = await axiosInstance.get("/algorithm/recommend");
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

export const getAlgorithmKinds = async (): Promise<
  ActionResponse<AlgorithmKind[]>
> => {
  const response = await axiosInstance.get<AlgorithmKind[]>("/algorithm/kind");
  return {
    status: response.status,
    data: response.data,
  };
};

export const getAlgorithms = async (
  options: AlgorithmOptions,
): Promise<ActionResponse<AlgorithmResponse>> => {
  const response = await axiosInstance.get<AlgorithmResponse>("/algorithm", {
    params: options,
  });
  return {
    status: response.status,
    data: response.data,
  };
};

export const getAlgorithm = async (
  algorithmId: number,
): Promise<ActionResponse<Algorithm>> => {
  const response = await axiosInstance.get<Algorithm>(
    `/algorithm/${algorithmId}`,
  );
  return {
    status: response.status,
    data: response.data,
  };
};

export const getExplain = async (
  algorithmId: number,
): Promise<ActionResponse<Explanation> | ActionError> => {
  try {
    const response = await axiosInstance.get<Explanation>(
      `/algorithm/explanation/${algorithmId}`,
    );
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return errorHandler(error);
  }
};
