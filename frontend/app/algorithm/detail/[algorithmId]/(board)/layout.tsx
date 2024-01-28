import React from "react";

import BoardNavigation, { NavItem } from "@/components/common/boardNavigation";
import { getSessionId } from "@/utils/serverSideSession";

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
  const sessionId = await getSessionId();
  const algorithmId = params?.algorithmId;

  const navItems: NavItem[] = [
    {
      title: "전체",
      link: `/algorithm/detail/${algorithmId}/all`,
    },
    {
      title: "질문",
      link: `/algorithm/detail/${algorithmId}/question`,
    },
    {
      title: "피드백",
      link: `/algorithm/detail/${algorithmId}/feedback`,
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

export default Board;
