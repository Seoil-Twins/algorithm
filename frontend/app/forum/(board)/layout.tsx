import React from "react";

import BoardNavigation, { NavItem } from "@/components/common/boardNavigation";

import { getSessionId } from "@/utils/serverSideSession";

const Forum = async ({ children }: { children: React.ReactNode }) => {
  const sessionId = await getSessionId();

  const navItems: NavItem[] = [
    {
      title: "전체",
      link: `/forum/all`,
    },
    {
      title: "질문",
      link: `/forum/question`,
    },
    {
      title: "자유",
      link: `/forum/free`,
    },
  ];

  return (
    <>
      <BoardNavigation
        isVisiblePost={sessionId !== undefined}
        items={navItems}
      />
      {children}
    </>
  );
};

export default Forum;
