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

export type RecommendBoardItem = {
  boardId: number;
  boardType: string;
  user: RequireUser;
  thumbnail: string | null;
  title: string;
  tags: string[] | null;
  createdTime: string;
};

export type RecommendBoard = {
  boards: RecommendBoardItem;
};

export type BoardListItem = {
  boardId: number;
  boardType: string;
  user: {
    userId: number;
    profile: string;
    nickname: string;
  };
  title: string;
  viewCount: number;
  recommendCount: number;
  commentCount: number;
  tags: string[] | null;
  isSolved: boolean;
  // Session이 없으면 null이 반환됩니다.
  isRecommed: boolean | null;
  createdTime: string;
};

export type BoardList = {
  boards: BoardListItem[];
  total: number;
};
