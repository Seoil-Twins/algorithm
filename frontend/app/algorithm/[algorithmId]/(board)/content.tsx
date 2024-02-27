/* eslint-disable react/jsx-key */

import React from "react";
import Image from "next/image";

import { AlgorithmPageOptions } from "@/types/algorithm";
import { Board, BoardResponse } from "@/types/board";

import Table, { TableData } from "@/components/algorithm/table";

import { getAlgorithmBoards, getBoardTypes } from "@/app/actions/baord";

import { getTimeAgo } from "@/utils/day";

import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";

type ContentProps = {
  algorithmId: number;
  options: AlgorithmPageOptions;
};
const tableHeaders = ["상태", "제목", "닉네임", "분류", "일자"];

const Content = async ({ algorithmId, options }: ContentProps) => {
  const sortOptions: AlgorithmPageOptions = {
    count: options.count,
    page: options.page,
    kind: options.kind,
    keyword: (options.keyword as string) || undefined,
  };

  const current = sortOptions.page;
  const boardType = await getBoardTypes();

  const responseBoards = await getAlgorithmBoards(algorithmId!, sortOptions);
  let boards: BoardResponse | undefined = undefined;
  if (responseBoards.status === 200) {
    boards = responseBoards.data as BoardResponse;
  } else if (responseBoards.status === 404) {
    boards = { contents: [], total: 0 };
  } else {
    return (
      <NotFound
        title="서버와의 통신 중 오류가 발생하였습니다."
        description="잠시 후 다시 시도해주세요."
      />
    );
  }

  const tableDatas: TableData[] = boards.contents.map((board: Board) => {
    return {
      datas: [
        <Image
          src={`${
            board.solved ? "/svgs/valid_check.svg" : "/svgs/invalid_check.svg"
          }`}
          alt="정답 여부 아이콘"
          width={24}
          height={24}
        />,
        <span>{board.title}</span>,
        <span>{board.user.nickname}</span>,
        <span>
          {
            boardType
              .find((type) => type.boardTypeId === board.boardType)
              ?.title.split(" ")[1]
          }
        </span>,
        <span>{getTimeAgo(board.createdTime)}</span>,
      ],
      link: `/forum/${board.boardId}`,
    };
  });

  if (boards.total <= 0)
    return (
      <NotFound
        title="아직 게시된 게시물이 없습니다."
        description="새로운 게시물의 주인공이 되어보세요 !"
      />
    );

  return (
    <>
      <Table
        headers={tableHeaders}
        datas={tableDatas}
        sizes={[10, 60, 10, 10, 10]}
      />
      <Pagination
        current={current}
        count={10}
        total={boards.total}
        marginTop={25}
      />
    </>
  );
};

export default Content;
