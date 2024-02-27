import React from "react";

import BoardNavigation, { NavItem } from "@/components/common/boardNavigation";
import { getUser } from "@/app/actions/user";

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
  let user;

  try {
    user = (await getUser()).data;
  } catch (error) {
    user = undefined;
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
      <BoardNavigation isVisiblePost={user !== undefined} items={navItems} />
      {children}
    </>
  );
};

export default Board;
