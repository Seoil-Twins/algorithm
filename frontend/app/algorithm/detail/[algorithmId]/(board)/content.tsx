/* eslint-disable react/jsx-key */

import React from "react";
import Image from "next/image";

import {
  BoardOptions,
  ResponseBoard,
  getAlgorithmBoards,
} from "@/api/algorithm/board/board";
import { getBoardTypes } from "@/api/board";

import Table, { TableData } from "@/components/algorithm/table";

import { getTimeAgo } from "@/utils/day";

import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";

type ContentProps = {
  type: 3 | 4 | 6;
  algorithmId: number;
};
const tableHeaders = ["상태", "제목", "닉네임", "분류", "일자"];

const Content = async ({
  searchParams,
  type,
  algorithmId,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
  type: ContentProps["type"];
  algorithmId: ContentProps["algorithmId"];
}) => {
  const sortOptions: BoardOptions = {
    count: Number(searchParams?.count) || 20,
    page: Number(searchParams?.page) || 1,
    kind: type,
    keyword: (searchParams?.keyword as string) || undefined,
  };

  const current = sortOptions.page;
  const boardType = await getBoardTypes();
  const boards = await getAlgorithmBoards(algorithmId!, sortOptions);

  const tableDatas: TableData[] = boards.contents.map(
    (board: ResponseBoard) => {
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
    },
  );

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
