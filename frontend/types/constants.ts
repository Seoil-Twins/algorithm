import { RateOptions, SolvedOptions, SortOptions } from "./algorithm";

export const BOARD_TYPE = {
  PUBLIC_QUESTION: 1,
  PUBLIC_FREE: 2,
  ALGORITHM_QUESTION: 3,
  ALGORITHM_FEEDBACK: 4,
} as const;

export const NO_AUTH_PATHS = ["/login", "/signup"];
export const AUTH_PATHS = [
  "/account",
  "/activity/*",
  "/notification",
  "/algorithm/[0-9]+/new",
  "/forum/[0-9]+/update",
  "/forum/new",
];

export const UserKeys = {
  getUser: "/user/me",
  getNotification: "/user/notification",
};

export const SOLVED_OPTIONS_ARRAY: SolvedOptions[] = ["a", "s", "ns"];
export const SORT_OPTIONS_ARRAY: SortOptions[] = ["r", "or", "t"];
export const RATE_OPTIONS_ARRAY: RateOptions[] = ["h", "l"];

export const checkMyType = (
  compareArray: SolvedOptions[] | SortOptions[] | RateOptions[],
  value: string,
) => {
  return compareArray.includes(value as never);
};

export const getTitleByCode = (code: number) => {
  switch (code) {
    case 3001:
      return "c++";
    case 3002:
      return "python";
    case 3003:
      return "java";
    default:
      return "python";
  }
};
