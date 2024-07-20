/* eslint-disable react/jsx-key */

import React from "react";
import Image from "next/image";

import { BoardAPI } from "@/api/board";
import { BoardList, BoardListItem, BoardType } from "@/app/api/model/board";

import Table, { TableData } from "@/components/algorithm/table";

import { getTimeAgo } from "@/utils/day";

import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";
import { AlgorithmBoardPageOptions } from "@/types/board";

type ContentProps = {
  algorithmId: number;
  options: AlgorithmBoardPageOptions;
};
const tableHeaders = ["상태", "제목", "닉네임", "분류", "일자"];

const Content = async ({ algorithmId, options }: ContentProps) => {
  const sortOptions: AlgorithmBoardPageOptions = {
    count: options.count,
    page: options.page,
    boardType: options.boardType,
    keyword: (options.keyword as string) || undefined,
    algorithmId,
  };

  const current = sortOptions.page;
  const boardType: BoardType = await (await BoardAPI.getBoardTypes()).json();

  let response: BoardList;

  try {
    response = await (await BoardAPI.getBoards(sortOptions)).json();
  } catch (error) {
    return (
      <NotFound
        title="서버와의 통신 중 오류가 발생하였습니다."
        description="잠시 후 다시 시도해주세요."
      />
    );
  }

  const tableDatas: TableData[] = response.boards.map(
    (board: BoardListItem) => {
      return {
        datas: [
          <Image
            src={`${
              board.isSolved
                ? "/svgs/valid_check.svg"
                : "/svgs/invalid_check.svg"
            }`}
            alt="정답 여부 아이콘"
            width={24}
            height={24}
          />,
          <span>{board.title}</span>,
          <span>{board.user.nickname}</span>,
          <span>
            {
              boardType.types
                .find((type) => type.typeName === board.boardType)
                ?.typeName.split(" ")[1]
            }
          </span>,
          <span>{getTimeAgo(board.createdTime)}</span>,
        ],
        link: `/forum/${board.boardId}`,
      };
    },
  );

  if (response.total <= 0)
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
        total={response.total}
        marginTop={25}
      />
    </>
  );
};

export default Content;
