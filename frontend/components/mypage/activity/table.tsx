import Link from "next/link";
import Image from "next/image";

import { notosansBold, notosansMedium } from "@/styles/_font";
import styles from "./table.module.scss";

import { getTimeAgo } from "@/utils/day";

import ThemeImage from "@/components/common/themeImage";
import NotFound from "@/components/common/notFound";

import { BoardTypeItem, MyBoardIntroItem } from "@/app/api/model/board";
import { useCallback } from "react";

type TableProps = {
  boardTypes: BoardTypeItem[];
  items: MyBoardIntroItem[];
  total: number;
  errorTitle: string;
};

const Table = ({ boardTypes, items, total, errorTitle }: TableProps) => {
  const getTitleById = useCallback(
    (type: number | string) => {
      for (const boardType of boardTypes) {
        if (boardType.typeId === Number(type)) {
          return boardType.typeName;
        }
      }

      return "";
    },
    [boardTypes],
  );

  return (
    <div className={styles.table}>
      {total <= 0 && (
        <NotFound title={errorTitle} description={""} size={70} marginTop={0} />
      )}
      {items.map((item, idx) => (
        <Link href={`/forum/${item.boardId}`} key={idx}>
          <div className={styles.container}>
            <div className={`${styles.kind} ${notosansBold.className}`}>
              {getTitleById(item.boardType)}
            </div>
            <div
              className={`${styles.title} ${notosansMedium.className} ${
                item.isSolved && styles.isSolved
              }`}
            >
              {item.title}
            </div>
            <div className={styles.imgBox}>
              {item.isSolved !== undefined && item.isSolved && (
                <Image
                  src="/svgs/selection_active.svg"
                  alt="해결완료 아이콘"
                  width={18}
                  height={18}
                  className={styles.mr10}
                />
              )}
              {item.isSolved !== undefined && item.isSolved === null && (
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
              <span className={styles.mr10}>{item.likeCount}</span>
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
