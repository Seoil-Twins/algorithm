import { RequiredUser } from "./user";

export default interface Ranking {
  rankingId: number;
  user: RequiredUser;
  tried: number;
  solved: number;
  rank: number;
}
