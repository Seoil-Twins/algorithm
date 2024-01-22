import Link from "next/link";
import Image from "next/image";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./table.module.scss";

import Board from "@/interfaces/board";
import { BoardType } from "@/interfaces/boardType";

import { getTimeAgo } from "@/utils/day";
import { useCallback } from "react";
import ThemeImage from "@/components/common/themeImage";

type TableProps = {
  boardTypes: BoardType[];
  items: Board[];
};

const Table = ({ boardTypes, items }: TableProps) => {
  const getTitleById = useCallback(
    (type: number) => {
      for (const boardType of boardTypes) {
        if (boardType.boardTypeId === type) {
          return boardType.title;
        }
      }

      return "";
    },
    [boardTypes],
  );

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
            <div
              className={`${styles.title} ${notosansMedium.className} ${
                item.solved === true && styles.solved
              }`}
            >
              {item.title}
            </div>
            <div className={styles.imgBox}>
              {item.solved !== undefined && item.solved === true && (
                <Image
                  src="/svgs/selection_active.svg"
                  alt="해결완료 아이콘"
                  width={18}
                  height={18}
                  className={styles.mr10}
                />
              )}
              {item.solved !== undefined && item.solved === false && (
                <ThemeImage
                  lightSrc="/svgs/selection_black.svg"
                  darkSrc="/svgs/selection_white.svg"
                  alt="미 해결 아이콘"
                  width={18}
                  height={18}
                  className={styles.mr10}
                />
              )}
              <ThemeImage
                lightSrc="/svgs/thumb_up_black.svg"
                darkSrc="/svgs/thumb_up_white.svg"
                alt="좋아요 아이콘"
                width={18}
                height={18}
              />
              <span className={styles.mr10}>{item.likeTotal}</span>
              {item.commentTotal !== undefined && (
                <>
                  <ThemeImage
                    lightSrc="/svgs/comment_black.svg"
                    darkSrc="/svgs/comment_white.svg"
                    alt="댓글 아이콘"
                    width={18}
                    height={18}
                  />
                  {item.commentTotal}
                </>
              )}
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
