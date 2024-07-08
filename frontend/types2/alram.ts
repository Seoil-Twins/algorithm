import { Board } from "./board";
import { User } from "./user";

export default interface Alram {
  otherUser: User;
  board: Board;
  content: string;
  createdTime: string;
}
