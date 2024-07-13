"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { RequestBoard } from "@/types2/board";
import { BOARD_TYPE } from "@/types/constants";

import { addBoard } from "@/app/actions/baord";

import BoardForm from "@/components/common/boardForm";
import { DropdownItem } from "@/components/common/dropdown";

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
    boardType: BOARD_TYPE.PUBLIC_QUESTION,
    title: "",
    content: "",
  });

  const [state, formAction] = useFormState(
    async (_prevState: any, formdata: FormData) => {
      return await addBoard(request.boardType, request.content, formdata);
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
      router.push(`/forum/all`);
    } else if (state.status === 400) {
      toast.error(state.data || "게시글 작성에 실패했습니다.");
    } else if (state.status === 500) {
      toast.error("서버 에러가 발생하였습니다.");
    } else if (state.status === 401) {
      router.replace(`/login?error=unauthorized&redirect_url=/forum/new`);
    }
  }, [state, router]);

  return (
    <BoardForm
      dropdownItems={dropdownItems}
      request={request}
      onChangeRequest={handleChangeRequest}
      action={formAction}
    />
  );
};

export default New;
