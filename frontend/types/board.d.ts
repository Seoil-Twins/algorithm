import {
  ALGORITHM_BOARD_TYPE,
  ALL_BOARD_TYPE,
  COMMON_BOARD_TYPE,
  PageOptions,
  REQUEST_BOARD_TYPE,
} from ".";
import { BoardTypeIdValue } from "./constants";

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
  boardType: BoardTypeIdValue;
  tags?: string[] | null;
  imageIds?: number[] | null;
};

export type RequestPublicBoard = {
  boardType: Pick<BoardTypeIdValue, 1, 2>;
} & RequestBoard;
