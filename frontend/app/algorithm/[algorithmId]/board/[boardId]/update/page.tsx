"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { DropdownItem } from "@/components/common/dropdown";
import { getBoardDetail } from "@/api/board";
import BoardForm, {
  BOARD_TYPE,
  BOARD_TYPE_VALUE,
  RequestBoard,
} from "@/components/common/boardForm";

type UpdateParams = {
  boardId: number;
};

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: 3,
  },
  {
    title: "자유",
    value: 4,
  },
];

const Update = ({ params }: { params: UpdateParams }) => {
  const boardId = params.boardId;
  const router = useRouter();

  const [request, setRequest] = useState<RequestBoard>({
    boardType: BOARD_TYPE.ALGORITHM_QUESTION,
    title: "",
    content: "",
  });

  const fetchBoardDetail = useCallback(async () => {
    const board = await getBoardDetail(boardId);
    const newItem: RequestBoard = {
      boardType: board.boardType as BOARD_TYPE_VALUE,
      title: board.title,
      content: board.content,
    };

    setRequest(newItem);
  }, [boardId]);

  const handleChangeRequest = useCallback((request: RequestBoard) => {
    setRequest(request);
  }, []);

  const handleSubmit = useCallback(() => {
    console.log(request);
    router.refresh();
    router.back();
  }, [request, router]);

  useEffect(() => {
    fetchBoardDetail();
  }, [fetchBoardDetail]);

  return (
    <BoardForm
      dropdownItems={dropdownItems}
      request={request}
      btnTitle="수정"
      onSubmit={handleSubmit}
      onChangeRequest={handleChangeRequest}
    />
  );
};

export default Update;
