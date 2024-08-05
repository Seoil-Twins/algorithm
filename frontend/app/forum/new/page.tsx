"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import BoardForm from "@/components/common/boardForm";
import { DropdownItem } from "@/components/common/dropdown";

import { BoardTypeId } from "@/types/constants";
import { RequestPublicBoard } from "@/types/board";

import { BoardAPI } from "@/api/board";
import { checkAltValue } from "@/utils/doc";

const dropdownItems: DropdownItem[] = [
  {
    title: "질문",
    value: BoardTypeId.PUBLIC_QUESTION,
  },
  {
    title: "자유",
    value: BoardTypeId.PUBLIC_FREE,
  },
];

const New = () => {
  const router = useRouter();

  const [request, setRequest] = useState<RequestPublicBoard>({
    boardType: BoardTypeId.PUBLIC_QUESTION,
    title: "",
    content: "",
    imageIds: [],
  });
  const [imageIds, setImageIds] = useState<number[]>([]);

  const handleChangeImageIds = useCallback((imageId: number) => {
    setImageIds((prev) => [...prev, imageId]);
  }, []);

  const handleChangeRequest = useCallback(
    (request: RequestPublicBoard) => {
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

  const handleAddBoard = useDebouncedCallback(
    useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        try {
          await BoardAPI.addPublicBoard(request);
          toast.success("게시글이 작성되었습니다.");
          router.replace(`/forum/all`);
          router.refresh();
        } catch (error: any) {
          if (error.status === 401) {
            router.replace(`/login?error=unauthorized&redirect_url=/forum/new`);
            return;
          }

          toast.error(error.message);
          return;
        }
      },
      [request, router],
    ),
    400,
  );

  return (
    <BoardForm
      dropdownItems={dropdownItems}
      request={request}
      onChangeRequest={handleChangeRequest}
      onChangeImageIds={handleChangeImageIds}
      action={handleAddBoard}
    />
  );
};

export default New;
