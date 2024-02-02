import { RequiredUser } from "./user";

export default interface Board {
  boardId: number;
  boardType: number;
  user: RequiredUser;
  title: string;
  content: string;
  views: number;
  tags?: string[];
  solved?: number | null;
  likeTotal: number;
  isLike: boolean;
  isView: boolean;
  createdTime: string;
}
