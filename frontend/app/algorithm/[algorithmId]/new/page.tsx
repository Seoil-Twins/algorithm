"use client";

import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { BoardTypeId } from "@/types/constants";

import { DropdownItem } from "@/components/common/dropdown";
import BoardForm from "@/components/common/boardForm";

import { RequestAlgorithmBoard } from "@/types/algorithm";
import { useDebouncedCallback } from "use-debounce";
import { AlgorithmAPI } from "@/api/algorithm";

type NewParams = {
  algorithmId: number;
};

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: BoardTypeId.ALGORITHM_QUESTION,
  },
  {
    title: "피드백",
    value: BoardTypeId.ALGORITHM_FEEDBACK,
  },
];

const New = ({ params }: { params: NewParams }) => {
  const algorithmId = params.algorithmId;
  const router = useRouter();

  const [request, setRequest] = useState<RequestAlgorithmBoard>({
    boardType: BoardTypeId.ALGORITHM_QUESTION,
    title: "",
    content: "",
    imageIds: [],
  });

  const handleChangeRequest = useCallback((request: RequestAlgorithmBoard) => {
    setRequest(request);
  }, []);

  const handleAddBoard = useDebouncedCallback(
    useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
          await AlgorithmAPI.addAlgorithmBoard(algorithmId, request);
          toast.success("게시글이 작성되었습니다.");
          router.refresh();
          router.replace(`/algorithm/${algorithmId}/all`);
        } catch (error: any) {
          if (error.status === 401) {
            router.replace(
              `/login?error=unauthorized&redirect_url=/algorithm/${algorithmId}/new`,
            );
            return;
          }

          toast.error(error.message);
          return;
        }
      },
      [request, algorithmId, router],
    ),
    400,
  );

  return (
    <BoardForm
      dropdownItems={dropdownItems}
      request={request}
      onChangeRequest={handleChangeRequest}
      action={handleAddBoard}
    />
  );
};

export default New;
