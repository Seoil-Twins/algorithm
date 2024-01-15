import Board from "@/interfaces/board";
import { BoardType } from "@/interfaces/boardType";

export interface PageOptions {
  page: number;
  count: number;
}

export interface Response {
  contents: Board[];
  total: number;
}

export const getBoardTypes = async () => {
  const response: BoardType[] = [
    {
      boardTypeId: 1,
      title: "일반 질문",
    },
    {
      boardTypeId: 2,
      title: "일반 자유",
    },
    {
      boardTypeId: 3,
      title: "알고리즘 질문",
    },
    {
      boardTypeId: 4,
      title: "알고리즘 피드백",
    },
  ];

  return response;
};

export const getMyQuestions = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하",
        solved: true,
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 101,
  };

  return response;
};

export const getMyFeedbacks = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "피드백입니다. 피드피드 피드백입니다. 피드피드 피드백입니다 .피드피드백입니다.",
        solved: true,
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: true,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 26,
  };

  return response;
};

export const getMyAnswers = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title:
          "댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ 댓글 남긴다 ㅋㅋ",
        content:
          "님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암? 님들 산타가 언제 쉬는지 암?",
        solved: true,
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 10,
  };

  return response;
};

export const getMyFree = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하산타 클로스(close) 촤하하하하",
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 10,
  };

  return response;
};

export const getMyComments = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.댓글을 제가 남긴겁니다.",
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 26,
  };

  return response;
};

export const getMyFavorites = async (options: PageOptions) => {
  console.log(options);

  const response: Response = {
    contents: [
      {
        boardId: 1,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content:
          "내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글 내가 좋아요한 글내가 좋아요한 글",
        likeTotal: 25,
        commentTotal: 2,
        createdTime: "2023-12-25 12:25:25",
      },
      {
        boardId: 2,
        boardType: 2,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: false,
        likeTotal: 12,
        commentTotal: 25,
        createdTime: "2023-11-25 12:25:25",
      },
      {
        boardId: 3,
        boardType: 1,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        solved: true,
        likeTotal: 1,
        commentTotal: 2,
        createdTime: "2023-06-25 12:25:25",
      },
      {
        boardId: 4,
        boardType: 3,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2023-03-25 12:25:25",
      },
      {
        boardId: 5,
        boardType: 4,
        userId: 1,
        username: "아무나",
        tags: ["아무거나1", "아무거나2"],
        title: "님들 산타가 언제 쉬는지 암?",
        content: "산타 클로스(close) 촤하하하하",
        likeTotal: 0,
        commentTotal: 0,
        createdTime: "2022-12-25 12:25:25",
      },
    ],
    total: 10,
  };

  return response;
};
