import { RequiredUser } from "./user";

export default interface Comment {
  commentId: number;
  boardId: number;
  user: RequiredUser;
  content: string;
  recommend: number;
  createdTime: string;
}