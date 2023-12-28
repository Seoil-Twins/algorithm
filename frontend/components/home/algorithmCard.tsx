import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./algorithmCard.module.scss";
import { Algorithm } from "@/interfaces/algorithm";
import { notosansBold, notosansMedium } from "@/styles/_font";

import TagSlider from "./tagSlider";

const fetchRecommendAlgorithm = async () => {
  const response: Algorithm[] = [
    {
      algorithmId: 369,
      userId: 1, // 제안자 아이디
      title: "롤러코스터",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
      tags: ["그리디 알고리즘", "구현", "해 구성하기"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
    },
    {
      algorithmId: 340,
      userId: 1, // 제안자 아이디
      title: "회의실 배정",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
      tags: ["그리디 알고리즘", "정렬"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
    },
    {
      algorithmId: 341,
      userId: 1, // 제안자 아이디
      title: "1로 만들기 2",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
      tags: ["다이나믹 프로그래밍", "그래프 이론", "암튼 긴 무슨 태그입니다"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
    },
    {
      algorithmId: 342,
      userId: 1, // 제안자 아이디
      title: "롤러코스터",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "상근이는 우리나라에서 가장 유명한 놀이 공원을 운영하고 있다. 이 놀이 공원은 야외에 있고, 다양한 롤러코스터가 많이 있다. 어느날 벤치에 앉아있던 상근이는 상상을 해보았다. 롤러코스터가 이쪽으로 가고 저쪽으로 간다면?",
      tags: ["그리디 알고리즘", "구현", "해 구성하기"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
    },
    {
      algorithmId: 343,
      userId: 1, // 제안자 아이디
      title: "회의실 배정",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "한 개의 회의실이 있는데 이를 사용하고자 하는 N개의 회의에 대하여 회의실 사용표를 만들려고 한다. 각 회의 i에 대해 시작시간과 끝나는 시간이 주어져 있고, 각 회의에 대해서는 j라는 값이 배정된다.",
      tags: ["그리디 알고리즘", "정렬"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
    },
    {
      algorithmId: 344,
      userId: 1, // 제안자 아이디
      title: "1로 만들기 2",
      level: "3",
      algorithmKind: 1001,
      algorithmCompe: 2001,
      limitTime: "2.0",
      limitMem: "256",
      createdTime: "2020-12-12 12:12:12",
      content:
        "정수 X에 사용할 수 있는 연산은 다음과 같이 세가지 이다. 1. X가 3으로 나누어 떨어지면, 3으로 나눈다. 2. X가 2로 나누어 떨어지면, 2로 나눈다. 3. 1을 뺀다. 단, 정수일 때는 이렇고 저렇고 한 방식으로 해결한다.",
      tags: ["다이나믹 프로그래밍", "그래프 이론", "암튼 긴 무슨 태그입니다"],
      testcase: [
        {
          testcaseId: 1,
          algorithmId: 369,
          input: [3, 5, 3, 2],
          output: [13],
        },
      ],
    },
  ];

  return response;
};

const algorithmCard = async () => {
  const recommendAlgorithms: Algorithm[] = await fetchRecommendAlgorithm();

  return (
    <div className={styles.cardBox}>
      {recommendAlgorithms.map((algorithm: Algorithm) => {
        return (
          <div className={styles.itemBox}>
            <div className={`${styles.id} ${notosansBold.className}`}>
              {algorithm.algorithmId}
            </div>
            <div className={`${styles.title} ${notosansMedium.className}`}>
              {algorithm.title}
            </div>
            <div className={styles.tagSliderBox}>
              <TagSlider tags={algorithm.tags} />
            </div>
            <div className={styles.content}>{algorithm.content}</div>
            <div className={styles.btnBox}>
              <Link href={`/algorithm/${algorithm.algorithmId}`}>
                <div className={styles.moreBtn}>
                  <Image
                    src="/svgs/more_arrow.svg"
                    alt="자세히 보기 버튼"
                    width={34}
                    height={34}
                    className={styles.moreImg}
                  />
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default algorithmCard;
