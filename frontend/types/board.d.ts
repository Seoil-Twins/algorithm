import { RequiredUser } from "./user";

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
  isRecommend?: boolean;
  isView: boolean;
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
