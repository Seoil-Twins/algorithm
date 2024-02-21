import React from "react";
import Image from "next/image";

import { User } from "@/types/user";

import { IMAGE_URL } from "@/api";

import styles from "./user.module.scss";
import { notosansBold } from "@/styles/_font";

import SubNavigation, {
  NavItem,
} from "@/components/mypage/activity/subNavigation";
import Content from "@/components/mypage/content";
import Solved from "@/components/mypage/activity/solved";

const getUser = () => {
  const user: User = {
    userId: 34,
    email: "updateTest1@naver.com",
    nickname: "난업데이터수정5",
    anno_nofi: true,
    post_nofi: true,
    comment_nofi: true,
    like_nofi: true,
    answer_nofi: true,
    event_nofi: true,
    tried: 1,
    solved: 1,
    createdTime: "2024-02-11 23:50:10.0",
  };

  return user;
};

const getSolved = () => {
  return {
    tried: 100,
    solved: 56,
    favorite: 21,
  };
};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user: User | undefined = await getUser();
  const solved = await getSolved();

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
            src={
              user.profile
                ? `${IMAGE_URL}/${user.profile}`
                : "/svgs/user_profile_default.svg"
            }
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
        <Solved info={solved} />
      </Content>
      <Content title="활동 내역">
        <SubNavigation items={navItems} />
        <div>{children}</div>
      </Content>
    </div>
  );
};

export default layout;
