"use client";

import React, { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormState } from "react-dom";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm, { BOARD_TYPE } from "@/components/common/boardForm";

import { RequestBoard } from "@/types/board";
import { addBoard } from "@/app/actions/baord";

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

  const [request, setRequest] = useState<RequestBoard>({
    boardType: BOARD_TYPE.ALGORITHM_QUESTION,
    title: "",
    content: "",
  });

  const [state, formAction] = useFormState(
    async (_prevState: any, formdata: FormData) => {
      return await addBoard(
        algorithmId,
        BOARD_TYPE.ALGORITHM_QUESTION,
        request.content,
        formdata,
      );
    },
    null,
  );

  const handleChangeRequest = useCallback((request: RequestBoard) => {
    setRequest(request);
  }, []);

  useEffect(() => {
    const options: any = {
      position: "top-center",
      duration: 3000,
    };

    if (state?.status === 400) {
      toast.error(state.data || "게시글 작성에 실패했습니다.", options);
    } else if (state?.status === 500) {
      toast.error("서버 에러가 발생하였습니다.", options);
    }
  }, [state]);

  return (
    <>
      <Toaster />
      <BoardForm
        dropdownItems={dropdownItems}
        request={request}
        onChangeRequest={handleChangeRequest}
        action={formAction}
      />
    </>
  );
};

export default New;
