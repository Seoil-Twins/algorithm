"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

import styles from "./recommendPost.module.scss";

type RecommendPostProps = {
  userId?: string;
  boardId: string | number;
  recommendCount: number;
  isFavorite: boolean;
};

const RecommendPost = ({
  userId,
  boardId,
  recommendCount,
  isFavorite,
}: RecommendPostProps) => {
  const handleRecommend = useDebouncedCallback(
    useCallback(
      (isRecommend: boolean) => {
        if (isFavorite === isRecommend) {
          return;
        } else if (!userId) {
          return;
        }

        console.log(
          "Fetch API Favorite : ",
          String(isRecommend),
          userId,
          boardId,
        );
      },
      [boardId, isFavorite, userId],
    ),
    1000,
  );

  return (
    <div className={styles.recommendWrapper}>
      <div className={styles.recommend}>
        <button className={styles.btn} onClick={() => handleRecommend(false)}>
          <Image
            src="/svgs/recommend_down.svg"
            alt="추천 안 함"
            width={10}
            height={10}
          />
        </button>
        <div className={`${styles.count} ${isFavorite && styles.active}`}>
          {recommendCount}
        </div>
        <button className={styles.btn} onClick={() => handleRecommend(true)}>
          <Image
            src="/svgs/recommend_up.svg"
            alt="추천함"
            width={10}
            height={10}
          />
        </button>
      </div>
    </div>
  );
};

export default RecommendPost;
