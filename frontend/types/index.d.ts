import { CodeLanguage } from "./constants";

export type PageOptions = {
  page: number;
  count: number;
};

export type ResponseList<T> = {
  total: number;
  results: T | T[];
};
