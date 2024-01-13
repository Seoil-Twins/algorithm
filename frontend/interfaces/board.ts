export default interface Board {
  boardId: number;
  boardType: number;
  userId: number;
  username: string;
  title: string;
  content: string;
  tags: string[];
  solved: boolean;
  likeTotal: number;
  commentTotal: number;
  createdTime: string;
}
