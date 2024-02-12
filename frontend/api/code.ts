import Code from "@/interfaces/code";
import Comment from "@/interfaces/comment";
import { RequiredUser } from "@/interfaces/user";
import { AxiosResponse } from "axios";
import { axiosInstance } from ".";

export type ResponseAnswerItem = {
  user: RequiredUser;
  comments: Pick<Comment, "commentId" | "user" | "content" | "createdTime">[];
} & Pick<Code, "codeId" | "code" | "type" | "recommend" | "createdTime">;

export interface ResponseAnswer {
  codes: ResponseAnswerItem[];
  total: number;
}

export interface PageOptions {
  language: string;
  count: number;
  page: number;
}

export const getAnswer = async (
  algorithmId: number | string,
  options: PageOptions,
): Promise<AxiosResponse<ResponseAnswer>> => {
  const response = await axiosInstance.get(`/code/${algorithmId}`, {
    params: options,
  });
  return response;
};
