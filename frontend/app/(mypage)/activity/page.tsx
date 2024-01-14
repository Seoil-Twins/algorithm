"use client";

import {
  getMyAnswers,
  getMyFavorites,
  getMyFeedbacks,
  getMyPostAnswers,
  getMyPostComments,
  getMyPosts,
  getMyQuestions,
} from "@/api/board";

import Board, { APIs, KindType } from "@/components/mypage/activity/board";
import { NavItem } from "@/components/mypage/activity/subNavigation";
import Content from "@/components/mypage/content";

import styles from "./activity.module.scss";
import { notosansBold } from "@/styles/_font";
import { useEffect, useState } from "react";

const algorithmKindType: KindType = {
  question: "question",
  feedback: "feedback",
  answer: "algo_answer",
};
const algorithmNavItems: NavItem[] = [
  {
    title: "질문",
    link: algorithmKindType.question,
  },
  {
    title: "피드백",
    link: algorithmKindType.feedback,
  },
  {
    title: "작성한 답변",
    link: algorithmKindType.answer,
  },
];
const algorithmApis: APIs = {
  [algorithmKindType.question]: getMyQuestions,
  [algorithmKindType.feedback]: getMyFeedbacks,
  [algorithmKindType.answer]: getMyAnswers,
};

const communityKindType: KindType = {
  post: "post",
  comment: "comment",
  answer: "com_answer",
  favorite: "favorite",
};
const communityNavItems: NavItem[] = [
  {
    title: "작성한 글",
    link: communityKindType.post,
  },
  {
    title: "작성한 댓글",
    link: communityKindType.comment,
  },
  {
    title: "작성한 답변",
    link: communityKindType.answer,
  },
  {
    title: "좋아요한 글",
    link: communityKindType.favorite,
  },
];
const communityApis: APIs = {
  [communityKindType.post]: getMyPosts,
  [communityKindType.comment]: getMyPostComments,
  [communityKindType.answer]: getMyPostAnswers,
  [communityKindType.favorite]: getMyFavorites,
};

type ActivityAlgorithm = {
  correct: number;
  inCorrect: number;
  bookmark: number;
};

const Activity = () => {
  const [activityAlgorithm, setActivityAlgorithm] =
    useState<ActivityAlgorithm>();

  const fetchMyAlgorithm = async () => {
    const response = {
      correct: 44,
      inCorrect: 45,
      bookmark: 30,
    };

    setActivityAlgorithm(response);
  };

  useEffect(() => {
    fetchMyAlgorithm();
  }, []);

  return (
    <>
      <Content title="문제">
        <div className={styles.question}>
          <div className={styles.item}>
            <div
              className={`${styles.correct} ${styles.number} ${notosansBold.className}`}
            >
              {activityAlgorithm ? activityAlgorithm.correct : 0}
            </div>
            <div>맞힌 문제</div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.item}>
            <div
              className={`${styles.incorrect} ${styles.number} ${notosansBold.className}`}
            >
              {activityAlgorithm ? activityAlgorithm.inCorrect : 0}
            </div>
            <div>시도한 문제</div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.item}>
            <div
              className={`${styles.bookmark} ${styles.number} ${notosansBold.className}`}
            >
              {activityAlgorithm ? activityAlgorithm.bookmark : 0}
            </div>
            <div>찜한 문제</div>
          </div>
        </div>
      </Content>
      <Content title="알고리즘">
        <Board
          queryKey="algorithm"
          navItems={algorithmNavItems}
          apis={algorithmApis}
        />
      </Content>
      <Content title="커뮤니티">
        <Board
          queryKey="community"
          navItems={communityNavItems}
          apis={communityApis}
        />
      </Content>
    </>
  );
};

export default Activity;
