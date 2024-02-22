"use client";

import React, { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { useRouter } from "next/navigation";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm, {
  BOARD_TYPE,
  RequestBoard,
} from "@/components/common/boardForm";

import { AlgorithmPostData } from "@/types/algorithm";

import { postAlgorithmBoard } from "@/api/board";

type NewParams = {
  algorithmId: number;
};

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: 3,
  },
  {
    title: "피드백",
    value: 4,
  },
];

const New = ({ params }: { params: NewParams }) => {
  const algorithmId = params.algorithmId;
  const router = useRouter();

  const [request, setRequest] = useState<RequestBoard>({
    boardType: BOARD_TYPE.ALGORITHM_QUESTION,
    title: "",
    content: "",
  });

  const handleChangeRequest = useCallback((request: RequestBoard) => {
    setRequest(request);
  }, []);

  const handleSubmit = useDebouncedCallback(
    useCallback(async () => {
      try {
        const data: AlgorithmPostData = {
          algorithmId: algorithmId,
          boardType: request.boardType,
          title: request.title,
          content: request.content,
        };

        await postAlgorithmBoard(data);
      } catch (error) {
        alert("게시글 작성에 실패했습니다.");
      }
      router.push(`/algorithm/${algorithmId}/all`);
    }, [algorithmId, request, router]),
    500,
  );

  return (
    <BoardForm
      dropdownItems={dropdownItems}
      request={request}
      btnTitle="작성"
      onSubmit={handleSubmit}
      onChangeRequest={handleChangeRequest}
    />
  );
};

export default New;
