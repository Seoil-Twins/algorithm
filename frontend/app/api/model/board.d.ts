import { RequireUser } from "./user";

export type BoardTypeItem = {
  typeId: number;
  typeName: string;
};

export type BoardType = {
  types: BoardTypeItem[];
};

export type MyBoardIntroItem = {
  boardId: number;
  boardType: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  isSolved: boolean;
  createdTime: string;
};

export type MyBoardIntro = {
  [key: string]: MyBoardIntroItem[];
  total: number;
};
