export type User = {
  userId: number;
  nickname: string;
  email: string;
  profile: string;
  tried: number;
  solved: number;
};

export type RequireUser = {
  userId: number;
  profile: string;
  nickname: string;
};

export type NotificationItem = {
  notificationType: string;
  fromUser: RequireUser;
  notice?: {
    noticeId: number;
    title: string;
  };
  board?: {
    boardId: number;
    boardTypeId: string;
    title: string;
  };
  comment?: {
    commentId: number;
    content: string;
  };
  algorithm?: {
    algorithmId: number;
  };
  createdTime: string;
};

export type Notification = {
  notifications: NotificationItem[];
};

export type SnsInfoItem = {
  linkKind: string;
  domain: string;
  createdTime: string;
};

export type SnsInfo = {
  links: SnsInfoItem[];
};

export type HistoryAlgorithm = {
  tried: number;
  solved: number;
  favorite: number;
};

export type NotificationSetting = {
  primaryNofi: boolean;
  commentNofi: boolean;
  likeNofi: boolean;
  answerNofi: boolean;
  eventNofi: boolean;
};
