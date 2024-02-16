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
  recommendCount: number;
  commentCount: number;
  isRecommend?: boolean;
  isView: boolean;
  createdTime: string;
}
