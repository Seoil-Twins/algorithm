"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm from "@/components/common/boardForm";

import { BoardTypeId, BoardTypeIdValue } from "@/types/constants";
import { RequestBoard } from "@/types/board";

import { BoardAPI } from "@/api/board";

import { UpdateBoard } from "@/app/api/model/board";
import { useDebouncedCallback } from "use-debounce";
import { checkAltValue } from "@/utils/doc";

type UpdateParams = {
  boardId: number;
};

const dropdownAlgorithmItems: DropdownItem[] = [
  {
    title: "질문",
    value: BoardTypeId.ALGORITHM_QUESTION,
  },
  {
    title: "피드백",
    value: BoardTypeId.ALGORITHM_FEEDBACK,
  },
];

const dropdownForumItems: DropdownItem[] = [
  {
    title: "질문",
    value: BoardTypeId.PUBLIC_QUESTION,
  },
  {
    title: "자유",
    value: BoardTypeId.PUBLIC_FREE,
  },
];

const Update = ({ params }: { params: UpdateParams }) => {
  const boardId = params.boardId;
  const router = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [request, setRequest] = useState<RequestBoard>({
    boardType: BoardTypeId.ALGORITHM_QUESTION,
    title: "",
    content: "",
  });
  const [imageIds, setImageIds] = useState<number[]>([]);

  const handleChangeImageIds = useCallback((imageId: number) => {
    setImageIds((prev) => [...prev, imageId]);
  }, []);

  const handleChangeRequest = useCallback(
    (request: RequestBoard) => {
      setRequest({
        ...request,
      });

      const filteredImageIds = imageIds.filter((id) =>
        checkAltValue(request.content, id),
      );

      setImageIds(filteredImageIds);
    },
    [imageIds],
  );

  const fetchBoardDetail = useCallback(async () => {
    try {
      const response = await BoardAPI.getUpdateBoard(boardId);
      const board: UpdateBoard = await response.json();

      setRequest({
        boardType: Number(board.boardType) as BoardTypeIdValue,
        title: board.title,
        content: board.content,
        tags: board.tags,
      });
      setImageIds(board.imageIds || []);
    } catch (error: any) {
      if (error.status === 401) {
        toast.error("오직 작성자만 수정할 수 있습니다.");
      } else if (error.status === 404) {
        toast.error("게시글이 존재하지 않습니다.");
      } else {
        toast.error(
          "알 수 없는 오류가 발생하였습니다.\n나중에 다시 시도해주세요.",
        );
      }

      router.back();
      return;
    }
  }, [boardId, router]);

  const handleAddBoard = useDebouncedCallback(
    useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
          await BoardAPI.updateBoard(boardId, {
            ...request,
            imageIds,
          });
          toast.success("게시글이 수정되었습니다.");
          router.replace(`/forum/${boardId}`);
          router.refresh();
        } catch (error: any) {
          if (error.status === 401) {
            router.replace(
              `/login?error=unauthorized&redirect_url=/forum/${boardId}/update`,
            );
            return;
          }

          toast.error(error.message);
          return;
        }
      },
      [boardId, imageIds, request, router],
    ),
    400,
  );

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
        request.boardType === BoardTypeId.ALGORITHM_FEEDBACK ||
        request.boardType === BoardTypeId.ALGORITHM_QUESTION
          ? dropdownAlgorithmItems
          : dropdownForumItems
      }
      request={request}
      onChangeRequest={handleChangeRequest}
      onChangeImageIds={handleChangeImageIds}
      action={handleAddBoard}
    />
  );
};

export default Update;
