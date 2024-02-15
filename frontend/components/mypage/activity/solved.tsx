import React from "react";

import styles from "./solved.module.scss";
import { notosansBold } from "@/styles/_font";

type SolvedProps = {
  info: {
    solved: number;
    tried: number;
    favorite: number;
  };
};

const Solved = ({ info }: SolvedProps) => {
  return (
    <div className={styles.algorithmCount}>
      <div className={styles.item}>
        <div
          className={`${styles.correct} ${styles.number} ${notosansBold.className}`}
        >
          {info.solved}
        </div>
        <div>맞힌 문제</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.item}>
        <div
          className={`${styles.incorrect} ${styles.number} ${notosansBold.className}`}
        >
          {info.tried}
        </div>
        <div>시도한 문제</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.item}>
        <div
          className={`${styles.bookmark} ${styles.number} ${notosansBold.className}`}
        >
          {info.favorite}
        </div>
        <div>찜한 문제</div>
      </div>
    </div>
  );
};

export default Solved;
