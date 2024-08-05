import React from "react";
import Image from "next/image";

import styles from "./user.module.scss";
import { notosansBold } from "@/styles/_font";

import SubNavigation, {
  NavItem,
} from "@/components/mypage/activity/subNavigation";
import Content from "@/components/mypage/content";
import Solved from "@/components/mypage/activity/solved";

import { IMAGE_URL } from "@/api";
import { HistoryAlgorithm, OtherUser } from "@/app/api/model/user";
import { UserAPI } from "@/api/user";

type PageParams = {
  userId: number;
};

const layout = async ({
  params,
  children,
}: {
  params: PageParams;
  children: React.ReactNode;
}) => {
  const user: OtherUser = await (
    await UserAPI.getOtherUser(params.userId)
  ).json();
  const history: HistoryAlgorithm = {
    solved: user.solved,
    tried: user.tried,
    favorite: user.favorite,
  };
  const navItems: NavItem[] = [
    {
      title: "질문",
      link: `/user/${user.userId}/question`,
    },
    {
      title: "피드백",
      link: `/user/${user.userId}/feedback`,
    },
    {
      title: "자유",
      link: `/user/${user.userId}/free`,
    },
    {
      title: "답변",
      link: `/user/${user.userId}/answer`,
    },
    {
      title: "댓글",
      link: `/user/${user.userId}/comment`,
    },
    {
      title: "좋아요한 글",
      link: `/user/${user.userId}/favorite`,
    },
  ];

  return (
    <div className={styles.user}>
      <Content title="">
        <div className={styles.profile}>
          <Image
            src={`${IMAGE_URL}${user.profile}`}
            alt="프로필 사진"
            width={38}
            height={38}
            className={styles.profileImg}
          />
          <span className={`${styles.nickname} ${notosansBold.className}`}>
            {user.nickname}
          </span>
        </div>
      </Content>
      <Content title="문제">
        <Solved history={history} />
      </Content>
      <Content title="활동 내역">
        <SubNavigation items={navItems} />
        <div>{children}</div>
      </Content>
    </div>
  );
};

export default layout;
