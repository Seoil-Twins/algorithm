import { PageOptions } from ".";

export type UserPageOptions = PageOptions;

export type ResponseNotification = {
  primaryNofi: boolean;
  commentNofi: boolean;
  likeNofi: boolean;
  answerNofi: boolean;
  eventNofi: boolean;
};

export type RequestNotification = Partial<ResponseNotification>;
