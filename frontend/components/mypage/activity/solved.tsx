import React from "react";

import styles from "./solved.module.scss";
import { notosansBold } from "@/styles/_font";

import { HistoryAlgorithm } from "@/app/api/model/user";

type SolvedProps = {
  history: HistoryAlgorithm;
};

const Solved = ({ history }: SolvedProps) => {
  return (
    <div className={styles.algorithmCount}>
      <div className={styles.item}>
        <div
          className={`${styles.correct} ${styles.number} ${notosansBold.className}`}
        >
          {history.solved}
        </div>
        <div>맞힌 문제</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.item}>
        <div
          className={`${styles.incorrect} ${styles.number} ${notosansBold.className}`}
        >
          {history.tried}
        </div>
        <div>시도한 문제</div>
      </div>
      <div className={styles.line}></div>
      <div className={styles.item}>
        <div
          className={`${styles.bookmark} ${styles.number} ${notosansBold.className}`}
        >
          {history.favorite}
        </div>
        <div>찜한 문제</div>
      </div>
    </div>
  );
};

export default Solved;
