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
  createdTime: string;
}
