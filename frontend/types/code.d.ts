import { RequiredUser } from "./user";

export type Code = {
  codeId: number;
  userId: number;
  algorithmId: number;
  code: string;
  type: number;
  solved: boolean;
  recommendCount: number;
  createdTime: string;
};

export type ResponseAnswerItem = {
  user: RequiredUser;
  comments: Pick<Comment, "commentId" | "user" | "content" | "createdTime">[];
} & Pick<Code, "codeId" | "code" | "type" | "recommendCount" | "createdTime">;

export type AnswerResponse = {
  codes: ResponseAnswerItem[];
  total: number;
};

export type PageOptions = {
  language: string;
  count: number;
  page: number;
};

export type CodeOptions = {
  algorithmId: number;
  code: string;
  type: number;
};
