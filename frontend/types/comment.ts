import { RequiredUser } from "./user";

export default interface Comment {
  commentId: number;
  boardId: number;
  user: RequiredUser;
  content: string;
  recommendCount: number;
  isRecommend?: boolean;
  createdTime: string;
}
