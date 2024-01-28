import { User } from "./user";

type OriginalUser = User;
export type RequiredUser = Pick<
  OriginalUser,
  "userId" | "profile" | "nickname"
>;

export default interface Comment {
  commentId: number;
  boardId: number;
  user: RequiredUser;
  content: string;
  recommend: number;
  createdTime: string;
}
