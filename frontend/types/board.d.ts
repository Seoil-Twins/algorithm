import {
  ALGORITHM_BOARD_TYPE,
  ALL_BOARD_TYPE,
  COMMON_BOARD_TYPE,
  PageOptions,
  REQUEST_BOARD_TYPE,
} from ".";

export type AlgorithmBoardPageOptions = PageOptions & {
  boardType: ALGORITHM_BOARD_TYPE;
  keyword?: string;
  algorithmId?: number;
};

export type PublicBoardPageOptions = PageOptions & {
  boardType: COMMON_BOARD_TYPE;
  keyword?: string;
  algorithmId?: number;
};

export type RequestBoard = {
  title: string;
  content: string;
  boardType: REQUEST_BOARD_TYPE;
};
