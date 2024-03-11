import { RequiredUser } from "./user";
import { Comment } from "./comment";

export type Board = {
  boardId: number;
  boardType: number;
  user: RequiredUser;
  title: string;
  content: string;
  views: number;
  tags?: string[];
  thumbnail?: string;
  solved?: number | null;
  recommendCount: number;
  commentCount: number;
  isRecommend?: boolean | null;
  isView: boolean;
  comments: Comment[];
  createdTime: string;
};

export type BoardResponse = {
  contents: Board[];
  total: number;
};

export type PageOptions = {
  count: number;
  page: number;
  kind: 1 | 2 | 5;
  keyword?: string;
};

export type BOARD_TYPE_VALUE = 1 | 2 | 3 | 4;

export type RequestBoard = {
  title: string;
  content: string;
  boardType: BOARD_TYPE_VALUE;
};
