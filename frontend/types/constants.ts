import { RateOptions, SolvedOptions, SortOptions } from "./algorithm";

export const NO_AUTH_PATHS = ["/login", "/signup"];
export const AUTH_PATHS = [
  "/account",
  "/activity/*",
  "/notification",
  "/algorithm/[0-9]+/new",
  "/forum/[0-9]+/update",
  "/forum/new",
];

export const SWRKeys = {
  getUser: "/user/me",
  getNotification: "/user/notification",
};

export const SOLVED_OPTIONS_ARRAY: SolvedOptions[] = ["a", "s", "ns"];
export const SORT_OPTIONS_ARRAY: SortOptions[] = ["r", "or", "t"];
export const RATE_OPTIONS_ARRAY: RateOptions[] = ["h", "l"];

export const checkMyType = <T>(compareArray: T[], value: string) => {
  return compareArray.includes(value as never);
};

export const Language = {
  CPP: "cpp",
  PYTHON: "p",
  JAVA: "j",
} as const;

export type CodeType = (typeof Language)[keyof typeof Language];
export const CODE_TYPE_OPTIONS_ARRAY: CodeType[] = ["cpp", "p", "j"];
export type CodeTypeInfo = {
  [K in (typeof CODE_TYPE_OPTIONS_ARRAY)[number]]: string;
};

export type CODE_LANGUAGE_TYPE =
  (typeof CodeLanguage)[keyof typeof CodeLanguage];

export type InvertedCodeLanguage = {
  -readonly [K in keyof typeof CodeLanguage as (typeof CodeLanguage)[K]]: K;
};

export const CodeLanguage = {
  CPP: 3001,
  PYTHON: 3002,
  JAVA: 3003,
} as const;

export const CodeValue = {
  cpp: "3001",
  p: "3002",
  j: "3003",
} as const;

const CodeTitle = Object.entries(CodeLanguage).reduce((acc, [key, value]) => {
  (acc as any)[value] = key;
  return acc;
}, {} as InvertedCodeLanguage);

export const getTitleByCodeType = (type: keyof InvertedCodeLanguage) => {
  return CodeTitle[type].toLowerCase();
};

export const SnsKind = {
  GITHUB: "1001",
  GOOGLE: "1002",
  NAVER: "1003",
  KAKAO: "1004",
} as const;

export const BoardType = {
  ALGORITHM_ALL: "a",
  ALGORITHM_QUESTION: "aq",
  ALGORITHM_FEEDBACK: "af",
  PUBLIC_ALL: "p",
  PUBLIC_QUESTION: "pq",
  PUBLIC_FEEDBACK: "pf",
} as const;

export const BoardTypeId = {
  PUBLIC_QUESTION: 1,
  PUBLIC_FREE: 2,
  ALGORITHM_QUESTION: 3,
  ALGORITHM_FEEDBACK: 4,
} as const;

export type BoardTypeIdValue = (typeof BoardTypeId)[keyof typeof BoardTypeId];
