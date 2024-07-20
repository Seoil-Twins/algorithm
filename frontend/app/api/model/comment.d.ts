import { RequireUser } from "./user";

export type CommentListItem = {
  commentId: number;
  user: RequireUser;
  content: string;
  isRecommend: boolean;
  recommendCount: number;
  createdTime: string;
};

export type CommentList = {
  comments: CommentListItem[];
  total: number;
};
