export interface BoardOptions {
  count: number;
  page: number;
  kind: 3 | 4 | 6;
  keyword?: string;
}

export interface ResponseBoard {
  boardId: number;
  boardType: number;
  user: {
    userId: number;
    profile: string;
    nickname: string;
  };
  title: string;
  content: string;
  solved: number;
  createdTime: string;
}

export interface ResponseBoards {
  contents: ResponseBoard[];
  total: number;
}

export const getAlgorithmBoards = async (
  algorithmId: number,
  options: BoardOptions,
): Promise<ResponseBoards> => {
  console.log(algorithmId, options);

  return {
    contents: [
      {
        boardId: 2231,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2232,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2233,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2234,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2235,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2236,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2237,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2238,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2239,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2240,
        boardType: 3,
        user: {
          userId: 1,
          profile: "assets/profile/1.jpg",
          nickname: "황야의고라니",
        },
        title: "님들 이거 왜 프린트 안됨?",
        content: "print('앙기무띠');",
        solved: 1133, // 채택된 commentId.
        createdTime: "2023-12-25 12:25:25",
      },
    ],
    total: 292,
  };
};
