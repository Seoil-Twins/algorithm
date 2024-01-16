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

export const getRecommendPosts = async (): Promise<Board[]> => {
  return [
    {
      boardId: 2231,
      boardType: 2,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      thumbnail:
        "data:image/jpeg;base64,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",
      commentTotal: 20,
      likeTotal: 30,
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2232,
      boardType: 1,
      userId: 1,
      username: "암튼 긴 닉네임",
      title:
        "이것은 정말 긴 제목입니다. 아주 긴 제목이지요. 무엇보다 다른 것보다 깁니다.",
      content:
        "이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다.이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다.이것은 긴 내용입니다.",
      thumbnail:
        "https://www.birds.cornell.edu/home/wp-content/uploads/2023/09/334289821-Baltimore_Oriole-Matthew_Plante.jpg",
      tags: ["자유", "C++", "행복한 유치원", "이것은 아주 긴 태그입니다."],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2233,
      boardType: 1,
      userId: 1,
      title: "님들 산타가 언제 쉬는지 암?",
      username: "암튼 긴 닉네임",
      content: "산타 클로스(close) 촤하하하하",
      thumbnail:
        "data:image/jpeg;base64,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",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2234,
      boardType: 1,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2239,
      boardType: 1,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2235,
      boardType: 1,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      commentTotal: 20,
      likeTotal: 30,
      createdTime: "2023-12-25 12:25:25",
    },
  ];
};

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
