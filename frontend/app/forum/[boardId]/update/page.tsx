"use client";

import React, { useCallback, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { DropdownItem } from "@/components/common/dropdown";
import { getBoardDetail, patchBoard } from "@/api/board";

import BoardForm, { BOARD_TYPE } from "@/components/common/boardForm";

import { BOARD_TYPE_VALUE, RequestBoard } from "@/types/board";

type UpdateParams = {
  boardId: number;
};

const dropdownAlgorithmItems: DropdownItem[] = [
  {
    title: "질문",
    value: BOARD_TYPE.ALGORITHM_QUESTION,
  },
  {
    title: "피드백",
    value: BOARD_TYPE.ALGORITHM_FEEDBACK,
  },
];

const dropdownForumItems: DropdownItem[] = [
  {
    title: "질문",
    value: BOARD_TYPE.PUBLIC_QUESTION,
  },
  {
    title: "자유",
    value: BOARD_TYPE.PUBLIC_FREE,
  },
];

const Update = ({ params }: { params: UpdateParams }) => {
  const boardId = params.boardId;
  const router = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [request, setRequest] = useState<RequestBoard>({
    boardType: BOARD_TYPE.ALGORITHM_QUESTION,
    title: "",
    content: "",
  });

  const fetchBoardDetail = useCallback(async () => {
    const board = (await getBoardDetail(boardId)).data;
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

  const handleSubmit = useCallback(async () => {
    await patchBoard(boardId, request);

    router.refresh();
    router.back();
  }, [boardId, request, router]);

  useEffect(() => {
    fetchBoardDetail();
  }, [fetchBoardDetail]);

  useEffect(() => {
    if (!isMounted && request.content !== "" && request.content !== "") {
      setIsMounted(true);
    }
  }, [isMounted, request]);

  if (!isMounted) return null;

  return (
    <BoardForm
      dropdownItems={
        request.boardType === BOARD_TYPE.ALGORITHM_FEEDBACK ||
        request.boardType === BOARD_TYPE.ALGORITHM_QUESTION
          ? dropdownAlgorithmItems
          : dropdownForumItems
      }
      request={request}
      btnTitle="수정"
      onSubmit={handleSubmit}
      onChangeRequest={handleChangeRequest}
    />
  );
};

export default Update;
