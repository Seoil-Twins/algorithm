export type PageOptions = {
  page: number;
  count: number;
};

export type ResponseList<T> = {
  total: number;
  results: T | T[];
};

export const CommonBoardType = {
  COMMON_ALL: "p",
  COMMON_QUESTION: "pq",
  COMMON_FREE: "pf",
} as const;
export type COMMON_BOARD_TYPE =
  (typeof CommonBoardType)[keyof typeof CommonBoardType];
export type REQUEST_BOARD_TYPE = Exclude<
  COMMON_BOARD_TYPE,
  (typeof CommonBoardType)["COMMON_ALL"]
>;

export const AlgorithmBoardType = {
  ALGORITHM_ALL: "a",
  ALGORITHM_QUESTION: "aq",
  ALGORITHM_FEEDBACK: "af",
} as const;
export type ALGORITHM_BOARD_TYPE =
  (typeof AlgorithmBoardType)[keyof typeof AlgorithmBoardType];
export type REQUEST_ALGORITHM_TYPE = Exclude<
  COMMON_BOARD_TYPE,
  (typeof CommonBoardType)["ALGORITHM_ALL"]
>;

export const AllBoardType = CommonBoardType & (AlgorithmBoardType as const);
export type ALL_BOARD_TYPE = (typeof AllBoardType)[keyof typeof AllBoardType];

export const CodeLanguage = {
  CPP: 3001,
  PYTHON: 3002,
  JAVA: 3003,
} as const;
export type CODE_LANGUAGE_TYPE =
  (typeof CodeLanguage)[keyof typeof CodeLanguage];
