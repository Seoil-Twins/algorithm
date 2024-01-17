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
      solved: false,
      solvedRate: 80,
    },
  ];
};
