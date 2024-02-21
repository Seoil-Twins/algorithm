import { AxiosResponse } from "axios";

import { axiosInstance } from ".";
import {
  Algorithm,
  AlgorithmKind,
  AlgorithmOptions,
  AlgorithmResponse,
  KindOptions,
  RateOptions,
  SolvedOptions,
  SortOptions,
} from "@/types/algorithm";
import Explanation from "@/types/explanation";

export const SOLVED_OPTIONS_ARRAY: SolvedOptions[] = ["a", "s", "ns"];
export const SORT_OPTIONS_ARRAY: SortOptions[] = ["r", "or", "t"];
export const KIND_OPTIONS_ARRAY: KindOptions[] = ["a", "c", "p", "j"];
export const RATE_OPTIONS_ARRAY: RateOptions[] = ["h", "l"];

export const checkMyType = (
  compareArray: SolvedOptions[] | SortOptions[] | KindOptions[] | RateOptions[],
  value: string,
) => {
  return compareArray.includes(value as never);
};

export const getAlgorithmKinds = async (): Promise<
  AxiosResponse<AlgorithmKind[]>
> => {
  const response = await axiosInstance.get<AlgorithmKind[]>("/algorithm/kind");
  return response;
};

export const getAlgorithms = async (
  options: AlgorithmOptions,
): Promise<AxiosResponse<AlgorithmResponse>> => {
  console.log(options);
  const response = await axiosInstance.get<AlgorithmResponse>("/algorithm", {
    params: options,
  });

  return response;
};

export const getAlgorithm = async (
  algorithmId: number,
): Promise<AxiosResponse<Algorithm>> => {
  const response = await axiosInstance.get(`/algorithm/${algorithmId}`);
  return response;
};

export const getRecommendAlgorithms = async (): Promise<
  AxiosResponse<AlgorithmResponse>
> => {
  const response = await axiosInstance.get("/algorithm/recommend");
  return response;
};

export const getExplain = async (
  algorithmId: number,
): Promise<AxiosResponse<Explanation>> => {
  const response = await axiosInstance.get(
    `/algorithm/explanation/${algorithmId}`,
  );
  return response;
};
