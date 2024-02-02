"use client";

import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm, {
  BOARD_TYPE,
  RequestBoard,
} from "@/components/common/boardForm";

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

  const handleSubmit = useCallback(() => {
    console.log(request);
    router.push(`/algorithm/detail/${algorithmId}/all`);
  }, [algorithmId, request, router]);

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
