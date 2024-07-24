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

export type CommentListItemWithoutIsRecommend = Exclude<
  CommentListItem,
  "isRecommend"
>;
export type CommentListWithoutIsRecommend = {
  comments: CommentListItemWithoutIsRecommend[];
  total: number;
};
