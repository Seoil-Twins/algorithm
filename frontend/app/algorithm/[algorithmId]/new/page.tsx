"use client";

import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { BOARD_TYPE } from "@/types/constants";
import { RequestBoard } from "@/types2/board";

import { addBoard } from "@/app/actions/baord";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm from "@/components/common/boardForm";

type NewParams = {
  algorithmId: number;
};

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: BOARD_TYPE.ALGORITHM_QUESTION,
  },
  {
    title: "피드백",
    value: BOARD_TYPE.ALGORITHM_FEEDBACK,
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

  const [state, formAction] = useFormState(
    async (_prevState: any, formdata: FormData) => {
      return await addBoard(
        BOARD_TYPE.ALGORITHM_QUESTION,
        request.content,
        formdata,
        algorithmId,
      );
    },
    null,
  );

  const handleChangeRequest = useCallback((request: RequestBoard) => {
    setRequest(request);
  }, []);

  useEffect(() => {
    if (!state) return;

    if (state.status === 200) {
      toast.success("게시글이 작성되었습니다.");
      router.push(`/algorithm/${algorithmId}/all`);
    } else if (state.status === 400) {
      toast.error(state.data || "게시글 작성에 실패했습니다.");
    } else if (state.status === 500) {
      toast.error("서버 에러가 발생하였습니다.");
    } else if (state.status === 401) {
      router.replace(
        `/login?error=unauthorized&redirect_url=/algorithm/${algorithmId}/new`,
      );
    }
  }, [state, router, algorithmId]);

  return (
    <>
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
