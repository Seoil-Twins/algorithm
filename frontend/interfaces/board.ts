import { RequiredUser } from "./user";

export default interface Board {
  boardId: number;
  boardType: number;
  user: RequiredUser;
  title: string;
  content: string;
  views: number;
  tags?: string[];
  thumbnail?: string;
  solved?: number | null;
  favorites: number;
  commentCount: number;
  isFavorite: boolean;
  isView: boolean;
  createdTime: string;
}
