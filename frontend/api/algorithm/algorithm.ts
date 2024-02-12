import { Algorithm } from "@/interfaces/algorithm";
import Explanation from "@/interfaces/explanation";
import { axiosInstance } from "..";
import { AxiosResponse } from "axios";

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
): Promise<AxiosResponse<AlgorithmResponse>> => {
  const response = await axiosInstance.get<AlgorithmResponse>("/algorithm", {
    params: options,
  });

  return response;
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
      <strong style="font-size: large;">
              <u>예제 입력 1</u>
          </strong>
          <p><pre spellcheck="false">0 0 6 2 5 -4 2 2</pre></p>
          <strong style="font-size: large;">
          <u>예제 출력 1</u>
      </strong>
      <p><pre spellcheck="false">1</pre></p>
      <strong style="font-size: large;">
              <u>예제 입력 2</u>
          </strong>
          <p><pre spellcheck="false">-1 -5 6 3 1 10 -4 -1</pre></p>
          <strong style="font-size: large;">
          <u>예제 출력 2</u>
      </strong>
      <p><pre spellcheck="false">0</pre></p>`,
    // thumbnail:
    //   "https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg",
    kinds: ["그리디 알고리즘", "구현", "해 구성하기"],
    testcase: [
      {
        testcaseId: 1,
        algorithmId: 369,
        input: "0 0 6 2 5 -4 2 2",
        output: "1",
      },
      {
        testcaseId: 2,
        algorithmId: 369,
        input: "-1 -5 6 3 1 10 -4 -1",
        output: "0",
      },
      {
        testcaseId: 3,
        algorithmId: 369,
        input: "-1 -5 6 3 1 10 -4 -1",
        output: "0",
      },
      {
        testcaseId: 4,
        algorithmId: 369,
        input: "-1 -5 6 3 1 10 -4 -1",
        output: "0",
      },
      {
        testcaseId: 5,
        algorithmId: 369,
        input: "-1 -5 6 3 1 10 -4 -1",
        output: "0",
      },
      {
        testcaseId: 6,
        algorithmId: 369,
        input: "-1 -5 6 3 1 10 -4 -1",
        output: "0",
      },
      {
        testcaseId: 7,
        algorithmId: 369,
        input: "-1 -5 6 3 1 10 -4 -1",
        output: "0",
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

export const getExplain = async (algorithmId: number): Promise<Explanation> => {
  console.log(algorithmId);

  return {
    explanationId: 2341,
    algorithmId: 369,
    content: `<h3 style="margin-left: 0px !important">문제</h3><p style="margin-left: 0px !important">한국도로공사는 고속도로의 유비쿼터스화를 위해 고속도로 위에 N개의 센서를 설치하였다. 문제는 이 센서들이 수집한 자료들을 모으고 분석할 몇 개의 집중국을 세우는 일인데, <br>예산상의 문제로, 고속도로 위에 최대 K개의 집중국을 세울 수 있다고 한다.</p><p style="margin-left: 0px !important">각 집중국은 센서의 수신 가능 영역을 조절할 수 있다. 집중국의 수신 가능 영역은 고속도로 상에서 연결된 구간으로 나타나게 된다. N개의 센서가 적어도 하나의 집중국과는 통신이 가능<br>해야 하며, 집중국의 유지비 문제로 인해 각 집중국의 수신 가능 영역의 길이의 합을 최소화해야 한다.</p><p style="margin-left: 0px !important">편의를 위해 고속도로는 평면상의 직선이라고 가정하고, 센서들은 이 직선 위의 한 기점인 원점으로부터의 정수 거리의 위치에 놓여 있다고 하자. 따라서, 각 센서의 좌표는 정수 하나로 표현된다. 이 상황에서 각 집중국의 수신 가능영역의 거리의 합의 최솟값을 구하는 프로그램을 작성하시오. 단, 집중국의 수신 가능영역의 길이는 0 이상이며 모든 센서의 좌표가 다를 필요는 없다.</p><p style="margin-left: 0px !important"></p><h3 style="margin-left: 0px !important">입력</h3><p style="margin-left: 0px !important">첫째 줄에 센서의 개수 N(1 ≤ N ≤ 10,000), 둘째 줄에 집중국의 개수 K(1 ≤ K ≤ 1000)가 주어진다. 셋째 줄에는 N개의 센서의 좌표가 한 개의 정수로 N개 주어진다. 각 좌표 사이에는 빈 칸이 하나 있으며, 좌표의 절댓값은 1,000,000 이하이다.</p><p style="margin-left: 0px !important"></p><h3 style="margin-left: 0px !important">출력</h3><p style="margin-left: 0px !important">첫째 줄에 문제에서 설명한 최대 K개의 집중국의 수신 가능 영역의 길이의 합의 최솟값을 출력한다.</p><table><tbody><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">입력 (센서의 개수)</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">입력 (집중국의 개수)</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">입력 (센서의 좌표)</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">출력</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">6</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">2</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">1 6 9 3 6 7</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">5</p></td></tr><tr><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">10</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">5</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">20 3 14 6 7 8 18 10 12 15</p></td><td colspan="1" rowspan="1"><p style="margin-left: 0px !important">7</p></td></tr></tbody></table><p style="margin-left: 0px !important"></p><h3 style="margin-left: 0px !important">문제 해설</h3><p style="margin-left: 0px !important">"<strong>각 집중국은 센서의 수신 가능 영역을 조절할 수 있다. 집중국의 수신 가능 영역은 고속도로 상에서 연결된 구간으로 나타나게 된다. N개의 센서가 적어도 하나의 집중국과는 통신이 가능해야 하며, 집중국의 유지비 문제로 인해 각 집중국의 수신 가능 영역의 길이의 합을 최소화해야 한다.</strong>" 라는 뜻은 다음과 같다.</p><ul class="tight" data-tight="true"><li><p style="margin-left: 0px !important">센서 개수 : 6개</p></li><li><p style="margin-left: 0px !important">기지국 개수 : 2개</p></li><li><p style="margin-left: 0px !important">최소의 합 : 5</p></li></ul><img src="blob:http://localhost:3000/ef0411ab-d2d2-471c-b867-28d16cc56fd4" style="width: 100%; height: auto; cursor: pointer;"><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">"<strong>평면상의 직선이라고 가정하고, 센서들은 이 직선 위의 한 기점인 원점으로부터의 정수 거리의 위치에 놓여 있다고 하자. 따라서, 각 센서의 좌표는 정수 하나로 표현된다.</strong>"를 통해 센서들을 한 기점을 중심으로 센서들이 좌표마다 배치되어 있다고 한다. 여기서 원점은 <strong>맨 왼쪽 0 (따로 표시는 하지 않음)</strong>부터 시작한다고 보면 된다. 집중국은 총 2개이니 센서들을 2개의 묶음으로 만들 수 있고 그 묶음의 합이 최솟값이면 되는 것이다. 그리고 <strong>6은 2번 중복</strong>되었기 때문에 <strong>6을 1개</strong>로 칠 수 있다.<br>그러면 이제 코드를 보자.</p><p style="margin-left: 0px !important"></p><p style="margin-left: 0px !important">위와 같은 형태를 적용한다면, 센서들의 좌표를 <strong>오름차순 정렬</strong>하여 각 좌표마다의 <strong>차이</strong>를 구해 그 중 <strong>최소의 합</strong>을 찾으면 되는 것이다. 여기서 최소의 합을 구하는 방법은 <strong>가장 차이가 많이 나는 좌표</strong>들은<strong> 1개의 기지국으로 묶어 합을 0</strong>으로 만드는 것이다. 즉, 기지국 1개를 가져가는 좌표들의 개수는 <strong>기지국 - 1개</strong>이다. 나머지 1개의 기지국은 하나로 묶어 최소의 합을 구하면 되는 것이다.</p><pre><code class="language-python">sensor_distances.sort()

diffs = [
    sensor_distances[i + 1] - sensor_distances[i]
    for i in range(0, len(sensor_distances) - 1)
]
diffs.sort()</code></pre><p style="margin-left: 0px !important">센서들의 좌표를 오름차순 정렬하여, 각 좌표들의 차이를 오름차순을 정렬한다. 이 때 주의할점은 <strong>i + 1</strong> 값을<strong> i의 값</strong>으로 <strong>빼야</strong> 한다는 것이다. 왜냐하면 오름차순 정렬로 인해 i + 1의 값이 무조건 i의 값보다 높기 때문이다.</p><pre><code class="language-python">result = sum(diffs[0:len(diffs) - (building_cnt - 1)])
print(result)</code></pre><p style="margin-left: 0px !important">좌표들의 차이 값에서 <strong>기지국 개수 - 1</strong>개만 묶어 합을 구하면 된다. 즉, <strong>기지국 하나</strong>로 <strong>1개의 좌표</strong>로만 구성되어 있는 것은 <strong>센서의 차이 값이 큰 애들</strong>만 있고, 그 외 <strong>차이 값이 적은 애들</strong>은 <strong>1개의 기지국</strong>으로만 이루어져있는 것이다.</p>`,
    createdTime: "2022-12-31 12:12:30",
  };
};
