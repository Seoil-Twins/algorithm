import { ALGORITHM_BOARD_TYPE, PageOptions } from ".";
import { BOARD_TYPE } from "./board";

export const SolvedOptions = {
  ALL: "a",
  SOLVED: "s",
  NOT_SOLVED: "ns",
} as const;
export type SOLVED_OPTIONS = (typeof SolvedOptions)[keyof typeof SolvedOptions];

export const SortOptions = {
  RECNET: "r",
  OLDER: "or",
  TRIED: "t",
} as const;
export type SORT_OPTIONS = (typeof SortOptions)[keyof typeof SortOptions];

export const RateOptions = {
  HIGH: "h",
  LOW: "l",
} as const;
export type RATE_OPTIONS = (typeof RateOptions)[keyof typeof RateOptions];

export type AlgorithmOptions = {
  count: number;
  page: number;
  solved: SOLVED_OPTIONS;
  sort: SORT_OPTIONS;
  level: number;
  rate?: RATE_OPTIONS;
  tag?: number;
  keyword?: string;
};

export type AlgorithmPageOptions = PageOptions & {
  kind: ALGORITHM_BOARD_TYPE;
  keyword?: string;
};

export type AlgorithmKind = {
  kindId: string;
  kindName: string;
};

export type RequestAlgorithm = {
  title: string;
  content: string;
  boardType: ALGORITHM_BOARD_TYPE;
  tags?: string[];
  imageIds: number[];
};
