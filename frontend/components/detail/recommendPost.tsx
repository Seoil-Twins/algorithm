"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import { useRouter } from "next/navigation";

import styles from "./recommendPost.module.scss";

import Modal from "../common/modal";
import { axiosInstance } from "@/app/actions";
import toast from "react-hot-toast";

type RecommendPostProps = {
  apiUrl: string;
  userId?: string | number;
  requestId: string | number;
  isRecommend?: boolean | null;
  recommendCount: number;
  padding?: number;
};

const RecommendPost = ({
  apiUrl,
  userId,
  requestId,
  isRecommend,
  recommendCount,
  padding = 12,
}: RecommendPostProps) => {
  const router = useRouter();

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [count, setCount] = useState<number>(recommendCount);

  const handleIsVisibleModal = useCallback(() => {
    setIsVisibleModal((prev) => !prev);
  }, []);

  const handleOk = useCallback(() => {
    setIsVisibleModal(false);
    router.push("/login");
  }, [router]);

  const handleRecommend = useDebouncedCallback(
    useCallback(
      async (changeIsRecommend: boolean) => {
        const changeCount = changeIsRecommend ? count + 1 : count - 1;
        const isDisableWithUndefined =
          isRecommend === undefined &&
          Math.abs(recommendCount - changeCount) >= 2;

        const isDisableWithFalse =
          isRecommend === false &&
          (changeCount < recommendCount || changeCount >= recommendCount + 3);

        const isDisableWithTrue =
          isRecommend === true &&
          (changeCount > recommendCount || changeCount <= recommendCount - 3);

        if (isDisableWithUndefined || isDisableWithFalse || isDisableWithTrue) {
          return;
        } else if (!userId) {
          setIsVisibleModal(true);
          return;
        }

        try {
          if (isRecommend !== null) {
            await axiosInstance.delete(apiUrl);
            toast.success("추천을 취소했습니다.");
          } else {
            await axiosInstance.post(apiUrl, {
              value: changeIsRecommend,
            });
            toast.success("추천했습니다.");
          }

          setCount((prev) => (changeIsRecommend ? prev + 1 : prev - 1));
        } catch (error) {
          console.log(error);
          toast.error("추천에 실패했습니다.");
        }
      },
      [count, recommendCount, userId, isRecommend, apiUrl],
    ),
    1000,
  );

  return (
    <div className={styles.recommendWrapper}>
      <div className={styles.recommend}>
        <button
          className={styles.btn}
          style={{ padding }}
          onClick={() => handleRecommend(false)}
        >
          <Image
            src="/svgs/recommend_down.svg"
            alt="추천 안 함"
            width={10}
            height={10}
          />
        </button>
        <div
          className={`${styles.count} ${
            isRecommend === true && recommendCount === count && styles.active
          } ${
            isRecommend === false &&
            recommendCount + 2 === count &&
            styles.active
          } ${
            isRecommend === undefined &&
            recommendCount + 1 === count &&
            styles.active
          }`}
          style={{ padding: `0px ${padding}px` }}
        >
          {count}
        </div>
        <button
          className={styles.btn}
          style={{ padding }}
          onClick={() => handleRecommend(true)}
        >
          <Image
            src="/svgs/recommend_up.svg"
            alt="추천함"
            width={10}
            height={10}
          />
        </button>
      </div>
      <Modal
        isVisible={isVisibleModal}
        onOk={handleOk}
        onCancel={handleIsVisibleModal}
        title="로그인이 필요한 기능입니다"
        maxWidth={45}
      >
        <p>로그인이 필요한 기능입니다. 로그인 하시겠습니까?</p>
      </Modal>
    </div>
  );
};

export default RecommendPost;
