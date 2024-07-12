export type PageOptions = {
  page: number;
  count: number;
};

export type User = {
  userId: number;
  email: string;
  nickname: string;
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
};

export type RequiredUser = Pick<User, "userId" | "profile" | "nickname">;

export type ResponseNotification = {
  annoNofi: boolean;
  postNofi: boolean;
  commentNofi: boolean;
  likeNofi: boolean;
  answerNofi: boolean;
  eventNofi: boolean;
};

export type RequestNotification = Partial<ResponseNotification>;
