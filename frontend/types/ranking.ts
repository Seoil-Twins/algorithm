import { RequiredUser } from "./user";

export type Ranking = {
  rankingId: number;
  user: RequiredUser;
  tried: number;
  solved: number;
  rank: number;
};

export type ResponseRanking = {
  rankings: Ranking[];
  total: number;
};

export type PageOptions = {
  count: number;
  page: number;
  keyword?: string;
};
