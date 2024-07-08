import {
  ALL_BOARD_TYPE,
  COMMON_BOARD_TYPE,
  PageOptions,
  REQUEST_BOARD_TYPE,
} from ".";

export type BoardPageOptions = PageOptions & {
  kind: COMMON_BOARD_TYPE;
  keyword?: string;
};

export type RequestBoard = {
  title: string;
  content: string;
  boardType: REQUEST_BOARD_TYPE;
};
