import { RequiredUser } from "./user";

export type Comment = {
  commentId: number;
  boardId: number;
  user: RequiredUser;
  content: string;
  recommend: number;
  isRecommend?: boolean;
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
