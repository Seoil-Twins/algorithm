"use client";

import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm, {
  BOARD_TYPE,
  RequestBoard,
} from "@/components/common/boardForm";

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: 1,
  },
  {
    title: "자유",
    value: 2,
  },
];

const New = () => {
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
    router.back();
  }, [request, router]);

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
