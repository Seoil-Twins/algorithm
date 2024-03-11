import { RequiredUser } from "./user";

export type Comment = {
  commentId: number;
  boardId: number;
  user: RequiredUser;
  content: string;
  recommendCount: number;
  isRecommend?: boolean | null;
  createdTime: string;
};

export type PageOptions = {
  page: number;
  count: number;
};

export type CommentResponse = {
  comments: Comment[];
  total: number;
};
