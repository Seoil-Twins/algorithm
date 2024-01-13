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

const Activity = () => {
  return (
    <>
      <Content title="문제">문제</Content>
      <Content title="알고리즘">
        <Board
          queryKey="algorithm"
          navItems={algorithmNavItems}
          apis={algorithmApis}
          kindType={algorithmKindType}
        />
      </Content>
      <Content title="커뮤니티">
        <Board
          queryKey="community"
          navItems={communityNavItems}
          apis={communityApis}
          kindType={communityKindType}
        />
      </Content>
    </>
  );
};

export default Activity;
