"use client";

import React, { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import styles from "./recommendButton.module.scss";

import { useAuth } from "@/providers/authProvider";

import Modal from "../common/modal";
import ThemeImage from "../common/themeImage";
import { BoardAPI } from "@/api/board";
import { CommentAPI } from "@/api/comment";

type RecommendButtonProps = {
  type: "board" | "comment";
  requestId: number;
  recommendCount: number;
  isRecommend: boolean | null;
};

const RecommendPost = ({
  type,
  requestId,
  recommendCount,
  isRecommend,
}: RecommendButtonProps) => {
  const { user } = useAuth();
  const router = useRouter();

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [count, setCount] = useState<number>(recommendCount);
  const [recommend, setRecommend] = useState<boolean | null>(isRecommend);

  const handleIsVisibleModal = useCallback(() => {
    setIsVisibleModal((prev) => !prev);
  }, []);

  const handleOk = useCallback(() => {
    setIsVisibleModal(false);
    router.push("/login");
  }, [router]);

  const handleAddRecommend = useDebouncedCallback(
    useCallback(async () => {
      const newCount = count + 1;
      if (recommendCount + 1 < newCount) {
        return;
      }

      try {
        if (type === "board") {
          await BoardAPI.addRecommend(requestId);
          toast.success("게시글을 추천하였습니다.");
        } else if (type === "comment") {
          await CommentAPI.addRecommend(requestId);
          toast.success("댓글을 추천하였습니다.");
        }
      } catch (error: any) {
        toast.error(
          "예기치 못한 에러가 발생하였습니다.\n나중에 다시 시도해주세요.",
        );
        return;
      }

      setCount((prev) => prev + 1);
      setRecommend(true);
    }, [count, recommendCount, requestId, type]),
    1000,
  );

  const handleCancelRecommend = useDebouncedCallback(
    useCallback(async () => {
      const newCount = count - 1;
      if (recommendCount - 1 > newCount) {
        return;
      }

      try {
        if (type === "board") {
          await BoardAPI.deleteRecommend(requestId);
          toast.success("게시글을 추천 취소하였습니다.");
        } else if (type === "comment") {
          await CommentAPI.deleteRecommend(requestId);
          toast.success("댓글을 추천 취소하였습니다.");
        }
      } catch (error) {
        toast.error(
          "예기치 못한 에러가 발생하였습니다.\n나중에 다시 시도해주세요.",
        );
        return;
      }

      setCount((prev) => prev - 1);
      setRecommend(false);
    }, [count, recommendCount, requestId, type]),
    1000,
  );

  const handleRecommend = useCallback(() => {
    if (!user) {
      setIsVisibleModal(true);
      return;
    } else if (recommend === null) {
      setIsVisibleModal(true);
      return;
    }

    recommend ? handleCancelRecommend() : handleAddRecommend();
  }, [handleAddRecommend, handleCancelRecommend, recommend, user]);

  return (
    <>
      <button className={styles.recommendWrapper} onClick={handleRecommend}>
        <ThemeImage
          lightSrc={`${
            recommend
              ? "/svgs/recommend_active.svg"
              : "/svgs/recommend_dark_none.svg"
          }`}
          darkSrc={`${
            recommend
              ? "/svgs/recommend_active.svg"
              : "/svgs/recommend_white_none.svg"
          }`}
          alt="추천 버튼"
          width={28}
          height={28}
          className={styles.img}
        />
        <span className={styles.count}>{count}</span>
      </button>
      <Modal
        isVisible={isVisibleModal}
        onOk={handleOk}
        onCancel={handleIsVisibleModal}
        title="로그인이 필요한 기능입니다"
        maxWidth={45}
      >
        <p>로그인이 필요한 기능입니다. 로그인 하시겠습니까?</p>
      </Modal>
    </>
  );
};

export default RecommendPost;
