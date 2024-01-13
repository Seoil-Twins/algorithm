"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback } from "react";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./table.module.scss";

import Board from "@/interfaces/board";

import { getTimeAgo } from "@/utils/day";

type TableProps = {
  items: Board[];
};

const getTitleById = (type: number) => {
  switch (type) {
    case 1:
    case 3:
      return "질문";
    case 2:
      return "피드백";
    case 4:
      return "자유";
    default:
      return "";
  }
};

const Table = ({ items }: TableProps) => {
  return (
    <div className={styles.table}>
      {items.map((item: Board) => (
        <Link
          href={`/board/${item.boardType}/${item.boardId}`}
          key={item.boardId}
        >
          <div className={styles.container}>
            <div className={`${styles.kind} ${notosansBold.className}`}>
              {getTitleById(item.boardType)}
            </div>
            <div className={`${styles.title} ${notosansMedium.className}`}>
              {item.title}
            </div>
            <div className={styles.imgBox}>
              <Image
                src="/svgs/thumb_up.svg"
                alt="좋아요 아이콘"
                width={18}
                height={18}
              />
              <span className={styles.mr10}>{item.likeTotal}</span>
              <Image
                src="/svgs/comment.svg"
                alt="댓글 아이콘"
                width={18}
                height={18}
              />
              {item.commentTotal}
            </div>
            <div className={styles.content}>{item.content}</div>
            <div className={styles.createdTime}>
              {getTimeAgo(item.createdTime)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Table;
