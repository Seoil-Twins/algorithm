"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { BOARD_TYPE_VALUE, Board, RequestBoard } from "@/types2/board";
import { BOARD_TYPE } from "@/types2/constants";

import { getBoardDetail, patchBoard } from "@/app/actions/baord";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm from "@/components/common/boardForm";

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

  const [state, formAction] = useFormState(
    async (_prevState: any, formdata: FormData) => {
      return await patchBoard(
        boardId,
        request.boardType,
        request.content,
        formdata,
      );
    },
    null,
  );

  const fetchBoardDetail = useCallback(async () => {
    const response = await getBoardDetail(boardId);
    if (response.status === 401) {
      toast.error("오직 작성자만 수정할 수 있습니다.");
      router.back();
      return;
    }
    if (response.status === 404) {
      toast.error("게시글이 존재하지 않습니다.");
      router.back();
      return;
    }

    const board = response.data as Board;
    const newItem: RequestBoard = {
      boardType: board.boardType as BOARD_TYPE_VALUE,
      title: board.title,
      content: board.content,
    };

    setRequest(newItem);
  }, [boardId, router]);

  const handleChangeRequest = useCallback((request: RequestBoard) => {
    setRequest(request);
  }, []);

  useEffect(() => {
    fetchBoardDetail();
  }, [fetchBoardDetail]);

  useEffect(() => {
    if (!isMounted && request.content !== "" && request.content !== "") {
      setIsMounted(true);
    }
  }, [isMounted, request]);

  useEffect(() => {
    if (!state) return;

    if (state.status === 200) {
      toast.success("게시글이 수정되었습니다.");
      router.push(`/forum/${boardId}`);
    } else if (state.status === 400) {
      toast.error(state.data || "게시글 수정에 실패했습니다.");
    } else if (state.status === 500) {
      toast.error("서버 에러가 발생하였습니다.");
    } else if (state.status === 401) {
      router.replace(
        `/login?error=unauthorized&redirect_url=/forum/${boardId}/update`,
      );
    }
  }, [state, router, boardId]);

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
      onChangeRequest={handleChangeRequest}
      action={formAction}
    />
  );
};

export default Update;
