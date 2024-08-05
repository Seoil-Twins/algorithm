import React from "react";

import SubNavigation, {
  NavItem,
} from "@/components/mypage/activity/subNavigation";
import Content from "@/components/mypage/content";
import Solved from "@/components/mypage/activity/solved";
import { HistoryAlgorithm } from "@/app/api/model/user";
import { UserAPI } from "@/api/user";

const navItems: NavItem[] = [
  {
    title: "질문",
    link: "/activity/question",
  },
  {
    title: "피드백",
    link: "/activity/feedback",
  },
  {
    title: "자유",
    link: "/activity/free",
  },
  {
    title: "답변",
    link: "/activity/answer",
  },
  {
    title: "댓글",
    link: "/activity/comment",
  },
  {
    title: "좋아요한 글",
    link: "/activity/favorite",
  },
];

const layout = async ({ children }: { children: React.ReactNode }) => {
  const history: HistoryAlgorithm = (await (
    await UserAPI.getHistoryAlgirhtm()
  ).json()) as HistoryAlgorithm;

  return (
    <div>
      <Content title="문제">
        <Solved history={history} />
      </Content>
      <Content title="내 활동 내역">
        <SubNavigation items={navItems} />
        <div>{children}</div>
      </Content>
    </div>
  );
};

export default layout;
