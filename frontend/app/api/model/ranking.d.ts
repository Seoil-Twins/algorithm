import { RequireUser } from "./user";

export type RankingListItem = {
  user: RequireUser;
  tried: number;
  solved: number;
};

export type RankingList = {
  rankings: RankingListItem[];
  total: number;
};
