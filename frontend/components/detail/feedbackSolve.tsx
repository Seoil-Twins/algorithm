"use client";

import React from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { postFeedbackSolved } from "@/app/actions/baord";

type FeedbackSolveProps = {
  boardId: string | number;
};

const FeedbackSolve = ({ boardId }: FeedbackSolveProps) => {
  const router = useRouter();

  const handleSolve = async () => {
    const response = await postFeedbackSolved(boardId);

    if (response.status === 200) {
      router.refresh();
    } else {
      toast.error("채택에 실패했습니다.");
    }
  };

  return (
    <button onClick={handleSolve}>
      <Image src="/svgs/non_check.svg" alt="미채택" width={32} height={32} />
    </button>
  );
};

export default FeedbackSolve;
