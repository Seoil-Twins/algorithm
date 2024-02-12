export interface User {
  userId: number;
  email: string;
  emailVerified: boolean;
  nickname: string;
  birthday: string;
  phone: string;
  anno_nofi: boolean;
  post_nofi: boolean;
  comment_nofi: boolean;
  like_nofi: boolean;
  answer_nofi: boolean;
  event_nofi: boolean;
  profile?: string;
  tried: number;
  solved: number;
  createdTime: string;
}

export type RequiredUser = Pick<User, "userId" | "profile" | "nickname">;
