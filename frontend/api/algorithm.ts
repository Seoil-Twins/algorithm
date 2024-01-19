import { Algorithm } from "@/interfaces/algorithm";

export type SolvedOptions = "a" | "s" | "ns";
export type SortOptions = "r" | "or" | "t";
export type KindOptions = "a" | "c" | "p" | "j";
export type RateOptions = "h" | "l";

export const SOLVED_OPTIONS_ARRAY: SolvedOptions[] = ["a", "s", "ns"];
export const SORT_OPTIONS_ARRAY: SortOptions[] = ["r", "or", "t"];
export const KIND_OPTIONS_ARRAY: KindOptions[] = ["a", "c", "p", "j"];
export const RATE_OPTIONS_ARRAY: RateOptions[] = ["h", "l"];

export const checkMyType = (
  compareArray: SolvedOptions[] | SortOptions[] | KindOptions[] | RateOptions[],
  value: string,
) => {
  return compareArray.includes(value as never);
};

export interface AlgorithmOptions {
  count: number;
  page: number;
  solved: SolvedOptions;
  sort: SortOptions;
  level: number;
  kind: KindOptions;
  rate?: RateOptions;
  tag?: number;
  keyword?: string;
}

export interface AlgorithmCounts {
  correct: number;
  inCorrect: number;
  bookmark: number;
}

export const getAlgorithmCounts = async (): Promise<AlgorithmCounts> => {
  return {
    correct: 55,
    inCorrect: 44,
    bookmark: 30,
  };
};

export interface AlgorithmKind {
  kindId: string;
  kindName: string;
}

export const getAlgorithmKinds = async (): Promise<AlgorithmKind[]> => {
  return [
    {
      kindId: "1001",
      kindName: "수학",
    },
    {
      kindId: "1002",
      kindName: "구현",
    },
    {
      kindId: "1003",
      kindName: "다이나믹",
    },
    {
      kindId: "1004",
      kindName: "자료 구조",
    },
    {
      kindId: "1005",
      kindName: "그래프",
    },
    {
      kindId: "1006",
      kindName: "그리디",
    },
    {
      kindId: "1007",
      kindName: "브루트포스",
    },
    {
      kindId: "1008",
      kindName: "그래프",
    },
    {
      kindId: "1009",
      kindName: "정렬",
    },
    {
      kindId: "1010",
      kindName: "기하학",
    },
    {
      kindId: "1011",
      kindName: "트리",
    },
    {
      kindId: "1012",
      kindName: "세그먼트",
    },
    {
      kindId: "1013",
      kindName: "DFS & BFS",
    },
    {
      kindId: "1014",
      kindName: "기타",
    },
  ];
};

export interface AlgorithmResponse {
  algorithms: Algorithm[];
  total: number;
}

export const getAlgorithms = async (
  options: AlgorithmOptions,
): Promise<AlgorithmResponse> => {
  console.log(options);

  return {
    algorithms: [
      {
        algorithmId: 369,
        user: {
          userId: 1,
          nickname: "1",
        },
        title:
          "롤러코스터 롤러코스터 롤러코스터 롤러코스터  v롤러코스터 롤러코스터v 롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터",
        level: "1",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
        kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: true,
        solvedRate: 80,
      },
      {
        algorithmId: 340,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "회의실 배정",
        level: "2",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
        kinds: ["그리디 알고리즘", "정렬"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: true,
        solvedRate: 80,
      },
      {
        algorithmId: 341,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "4",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 342,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "롤러코스터",
        level: "5",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
        kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 343,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "회의실 배정",
        level: "0",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
        kinds: ["그리디 알고리즘", "정렬"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 344,
        user: {
          userId: 1,
          nickname: "0",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 345,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 346,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 347,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 348,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 370,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "롤러코스터",
        level: "1",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
        kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: true,
        solvedRate: 80,
      },
      {
        algorithmId: 371,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "회의실 배정",
        level: "2",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
        kinds: ["그리디 알고리즘", "정렬"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: true,
        solvedRate: 80,
      },
      {
        algorithmId: 372,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "4",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 373,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "롤러코스터",
        level: "5",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
        kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 374,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "회의실 배정",
        level: "0",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
        kinds: ["그리디 알고리즘", "정렬"],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 375,
        user: {
          userId: 1,
          nickname: "0",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 376,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 378,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 379,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
      {
        algorithmId: 380,
        user: {
          userId: 1,
          nickname: "1",
        },
        title: "1로 만들기 2",
        level: "3",
        algorithmKind: 1001,
        algorithmCompe: 2001,
        limitTime: "2.0",
        limitMem: "256",
        createdTime: "2020-12-12 12:12:12",
        content:
          "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
        kinds: [
          "다이나믹 프로그래밍",
          "그래프 이론",
          "암튼 긴 무슨 태그입니다",
        ],
        testcase: [
          {
            testcaseId: 1,
            algorithmId: 369,
            input: [3, 5, 3, 2],
            output: [13],
          },
        ],
        isSave: false,
        solved: false,
        solvedRate: 80,
      },
    ],
    total: 222,
  };
};

export const getAlgorithm = async (algorithmId: number): Promise<Algorithm> => {
  return {
    algorithmId: 369,
    user: {
      userId: 1,
      nickname: "1",
    },
    title: "PIZZZA ALVOLOC",
    level: "1",
    algorithmKind: 1001,
    algorithmCompe: 2001,
    limitTime: "2.0",
    limitMem: "256",
    createdTime: "2020-12-12 12:12:12",
    content: `<p>도윤이는 친구 3명과 함께 시험이 끝난 기념으로 도윤이의 집에서 놀기로 했다. 갑자기 배가 고파진 도윤이는 근처 맛 집인 PIZZA ALVOLOC에서 피자를 시켜먹기로 했다. 이 곳의 피자는 특이하게도, 보통 피자와 다르게 피자의 모양이 항상 볼록 다각형이다. 도윤이와 친구들은 피자를 네 등분해서 나눠먹기로 했다. 어떻게 나눌지 고민을 하던 중에 도윤이는 피자를 다음과 같이 나누기로 했다.</p>
      <p>
          <br>
      </p>
      <ul>
          <li>한 명씩 피자의 가장자리의 한 점을 선택한다. (같은 점을 선택하지 않는다.)</li>
          <li>선택한 순서대로 첫 번째 점과 두 번째 점을 이어 선분을 만들고 세 번째 점과 네 번째 점을 이은 선분을 만든다.</li>
          <li>만들어진 두 선분을 따라 피자를 자른다.</li>
      </ul>
      <p>
          <br>
      </p>
      <p>도윤이와 친구들은 잘라진 피자의 크기에 상관없이 네 조각으로만 나눠지면 먹기로 했다. 만약 네 조각으로 나눠지지 않는다면 도윤이와 친구들은 피자를 두고 싸우게 된다. 예를 들어 그림1의 경우에는 두 선분에 의해 피자가 네 조각으로 나뉘게 된다. 하지만 그림2의 경우에는 두 선분에 의해 피자가 세 조각으로 나뉘게 된다.&nbsp;</p>
      <p>도윤이와 친구들이 사이 좋게 피자를 나누어 먹을 수 있는지 알아보는 프로그램을 만들어 보자!</p>
      <p>
          <br>
      </p>
      <p>
          <img src="https://onlinejudgeimages.s3-ap-northeast-1.amazonaws.com/problem/12781/1.png">
      </p>
      <p>
          <br>
      </p>
      <p>
          <strong style="font-size: large;">
              <u>입력</u>
          </strong>
      </p>
      <p>입력의 첫 줄에는 도윤이와 친구들이 선택한 점의 좌표&nbsp;
          <em>x</em>,&nbsp;
          <em>y</em>(-10,000 ≤&nbsp;
          <em>x</em>,&nbsp;
          <em>y</em>&nbsp;≤ 10,000)가 순서대로 4개 주어진다.&nbsp;
          <em>x</em>,&nbsp;
          <em>y</em>값은 항상 정수이다.</p>
      <p>
          <br>
      </p>
      <p>
          <strong style="font-size: large;">
              <u>출력</u>
          </strong>
      </p>
      <p>주어진 4개의 점으로 도윤이가 친구들과 사이좋게 피자를 나눠 먹을 수 있으면 1, 그렇지 않으면 0을 출력한다.</p>
      <p>
          <br>
      </p>
      <p>
          <strong style="font-size: large;">
              <u>예제 입력 1</u>
          </strong>
          <p><pre spellcheck="false">0 0 6 2 5 -4 2 2</pre></p>
      </p>
      <p><br /></p>
      <p>
          <strong style="font-size: large;">
              <u>예제 출력 1</u>
          </strong>
          <p><pre spellcheck="false">1</pre></p>
      </p>
      <p>
          <br>
      </p>
      <p>
          <strong style="font-size: large;">
              <u>예제 입력 2</u>
          </strong>
          <p><pre spellcheck="false">-1 -5 6 3 1 10 -4 -1</pre></p>
      </p>
      <p><br /></p>
      <p>
          <strong style="font-size: large;">
              <u>예제 출력 2</u>
          </strong>
          <p><pre spellcheck="false">0</pre></p>
      </p>
      <p>
          <br>
      </p>`,
    // thumbnail:
    //   "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
    kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
    testcase: [
      {
        testcaseId: 1,
        algorithmId: 369,
        input: [3, 5, 3, 2],
        output: [13],
      },
    ],
    isSave: false,
    solved: true,
    solvedRate: 80,
  };
};

export const getRecommendAlgorithms = async (): Promise<Algorithm[]> => {
  return [
    {
      algorithmId: 369,
      user: {
        userId: 1,
        nickname: "1",
      },
      title:
        "롤러코스터 롤러코스터 롤러코스터 롤러코스터  v롤러코스터 롤러코스터v 롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터롤러코스터",
      level: "1",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
      kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
      isSave: false,
      solved: true,
      solvedRate: 80,
    },
    {
      algorithmId: 340,
      user: {
        userId: 1,
        nickname: "1",
      },
      title: "회의실 배정",
      level: "2",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
      kinds: ["그리디 알고리즘", "정렬"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
      isSave: false,
      solved: true,
      solvedRate: 80,
    },
    {
      algorithmId: 341,
      user: {
        userId: 1,
        nickname: "1",
      },
      title: "1로 만들기 2",
      level: "4",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
      kinds: ["다이나믹 프로그래밍", "그래프 이론", "암튼 긴 무슨 태그입니다"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
      isSave: false,
      solved: false,
      solvedRate: 80,
    },
    {
      algorithmId: 342,
      user: {
        userId: 1,
        nickname: "1",
      },
      title: "롤러코스터",
      level: "5",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
      kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
      isSave: false,
      solved: false,
      solvedRate: 80,
    },
    {
      algorithmId: 343,
      user: {
        userId: 1,
        nickname: "1",
      },
      title: "회의실 배정",
      level: "0",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
      kinds: ["그리디 알고리즘", "정렬"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
      isSave: false,
      solved: false,
      solvedRate: 80,
    },
    {
      algorithmId: 344,
      user: {
        userId: 1,
        nickname: "0",
      },
      title: "1로 만들기 2",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
      kinds: ["다이나믹 프로그래밍", "그래프 이론", "암튼 긴 무슨 태그입니다"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
      isSave: false,
      solved: false,
      solvedRate: 80,
    },
  ];
};
