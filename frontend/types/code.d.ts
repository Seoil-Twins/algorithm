import { Comment } from "./comment";
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

export type SummaryCode = Pick<
  Code,
  "codeId" | "code" | "type" | "recommendCount" | "createdTime"
>;
export type SummaryComment = Pick<
  Comment,
  "commentId" | "user" | "content" | "createdTime"
>;

export type ResponseAnswerItem = {
  user: RequiredUser;
  comments: SummaryComment[];
} & SummaryCode;

export type AnswerResponse = {
  codes: ResponseAnswerItem[];
  total: number;
};

export type PageOptions = {
  language: number;
  count: number;
  page: number;
};

export type RequestCode = {
  algorithmId: number;
  code: string;
  type: number;
};
