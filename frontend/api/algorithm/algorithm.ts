import { Algorithm } from "@/interfaces/algorithm";
import Explanation from "@/interfaces/explanation";
import { axiosInstance } from "..";
import { AxiosResponse } from "axios";

export type SolvedOptions = "a" | "s" | "ns";
export type SortOptions = "r" | "or" | "t";
export type KindOptions = "a" | "c" | "p" | "j";
export type RateOptions = "h" | "l";

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

export interface AlgorithmOptions {
  count: number;
  page: number;
  solved: SolvedOptions;
  sort: SortOptions;
  level: number;
  kind: KindOptions;
  rate?: RateOptions;
  tag?: number;
  keyword?: string;
}

export interface AlgorithmKind {
  kindId: string;
  kindName: string;
}

export const getAlgorithmKinds = async (): Promise<
  AxiosResponse<AlgorithmKind[]>
> => {
  const response = await axiosInstance.get<AlgorithmKind[]>("/algorithm/kind");
  return response;
};

export interface AlgorithmResponse {
  algorithms: Algorithm[];
  total: number;
}

export const getAlgorithms = async (
  options: AlgorithmOptions,
): Promise<AxiosResponse<AlgorithmResponse>> => {
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
  AxiosResponse<Algorithm[]>
> => {
  const response = await axiosInstance.get("/algorithm/recommended");
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
