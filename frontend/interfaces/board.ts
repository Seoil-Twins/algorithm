import { BoardImage } from "./boardImage";

export default interface Board {
  boardId: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  tags: string[];
  createdTime: string;
  images?: BoardImage[];
}
