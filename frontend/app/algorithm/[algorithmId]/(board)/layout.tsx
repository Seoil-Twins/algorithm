import React from "react";

import BoardNavigation, { NavItem } from "@/components/common/boardNavigation";

import { User } from "@/app/api/model/user";
import { UserAPI } from "@/api/user";

type BoardParams = {
  algorithmId: number;
};

const Board = async ({
  params,
  children,
}: {
  params: BoardParams;
  children: React.ReactNode;
}) => {
  let user: User | null = null;
  try {
    user = await (await UserAPI.getUser()).json();
  } catch (error) {
    user = null;
  }

  const algorithmId = params?.algorithmId;

  const navItems: NavItem[] = [
    {
      title: "전체",
      link: `/algorithm/${algorithmId}/all`,
    },
    {
      title: "질문",
      link: `/algorithm/${algorithmId}/question`,
    },
    {
      title: "피드백",
      link: `/algorithm/${algorithmId}/feedback`,
    },
  ];

  return (
    <>
      <BoardNavigation isVisiblePost={Boolean(user)} items={navItems} />
      {children}
    </>
  );
};

export default Board;
