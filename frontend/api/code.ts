import { AxiosResponse } from "axios";

import { AnswerResponse, CodeOptions, PageOptions } from "@/types/code";

import { axiosInstance } from ".";

export const getAnswer = async (
  algorithmId: number | string,
  options: PageOptions,
): Promise<AxiosResponse<AnswerResponse>> => {
  const response = await axiosInstance.get(`/code/${algorithmId}`, {
    params: options,
  });
  return response;
};

export const sendCode = async (options: CodeOptions) => {
  console.log(options);
  const response = await axiosInstance.post("/code", options);
  return response;
};
