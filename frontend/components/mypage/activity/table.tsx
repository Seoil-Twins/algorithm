import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./table.module.scss";

import { BoardType } from "@/types2/boardType";

import { getTimeAgo } from "@/utils/day";

import ThemeImage from "@/components/common/themeImage";

import { Board } from "@/types2/board";
import NotFound from "@/components/common/notFound";

type TableProps = {
  boardTypes: BoardType[];
  items: Board[];
  errorTitle: string;
};

const Table = ({ boardTypes, items, errorTitle }: TableProps) => {
  const getTitleById = useCallback(
    (type: number | string) => {
      for (const boardType of boardTypes) {
        if (boardType.boardTypeId === Number(type)) {
          return boardType.title;
        }
      }

      return "";
    },
    [boardTypes],
  );

  return (
    <div className={styles.table}>
      {items.length <= 0 && (
        <NotFound title={errorTitle} description={""} size={70} marginTop={0} />
      )}
      {items.map((item: Board) => (
        <Link href={`/forum/${item.board_id}`} key={item.boardId}>
          <div className={styles.container}>
            <div className={`${styles.kind} ${notosansBold.className}`}>
              {getTitleById(item.board_type)}
            </div>
            <div
              className={`${styles.title} ${notosansMedium.className} ${
                item.solved && styles.solved
              }`}
            >
              {item.title}
            </div>
            <div className={styles.imgBox}>
              {item.solved !== undefined && item.solved && (
                <Image
                  src="/svgs/selection_active.svg"
                  alt="해결완료 아이콘"
                  width={18}
                  height={18}
                  className={styles.mr10}
                />
              )}
              {item.solved !== undefined && item.solved === null && (
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
              <span className={styles.mr10}>{item.recommendCount}</span>
              {item.commentCount !== undefined && (
                <>
                  <ThemeImage
                    lightSrc="/svgs/comment_black.svg"
                    darkSrc="/svgs/comment_white.svg"
                    alt="댓글 아이콘"
                    width={18}
                    height={18}
                  />
                  {item.commentCount}
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
