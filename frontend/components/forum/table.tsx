import Image from "next/image";
import Link from "next/link";

import { notosansMedium } from "@/styles/_font";
import styles from "./table.module.scss";

import { getTimeAgo } from "@/utils/day";

import { IMAGE_URL } from "@/api";
import { BoardList, BoardType } from "@/app/api/model/board";
import { BoardAPI } from "@/api/board";
import { BoardTypeId } from "@/types/constants";

type TableProps = {
  item: BoardList;
};

const Table = async ({ item }: TableProps) => {
  const boardType: BoardType = await (await BoardAPI.getBoardTypes()).json();

  return (
    <div className={styles.table}>
      {item.boards.map((board) => (
        <Link href={`/forum/${board.boardId}`} key={board.boardId}>
          <div className={styles.item}>
            <Image
              src={`${IMAGE_URL}${board.user.profile}`}
              alt="프로필 사진"
              width={46}
              height={46}
              className={styles.profileImg}
            />
            <div className={styles.contentBox}>
              <div className={styles.content}>
                <div className={styles.boardType}>
                  {
                    boardType.types
                      .find((type) => String(type.typeId) === board.boardType)
                      ?.typeName.split(" ")[1]
                  }
                </div>
                <div className={`${styles.title} ${notosansMedium.className}`}>
                  {board.title}
                </div>
                <div className={styles.etc}>
                  <div>{board.user.nickname}</div>
                  <div className={styles.line}></div>
                  <div>{getTimeAgo(board.createdTime)}</div>
                </div>
              </div>
              <div className={styles.infoWrapper}>
                <div className={styles.infoBox}>
                  {board.boardType !== String(BoardTypeId.PUBLIC_FREE) &&
                    (board.isSolved ? (
                      <>
                        <Image
                          src="/svgs/answer_check_active.svg"
                          alt="답변 채택"
                          width={32}
                          height={32}
                        />
                        <span className={`${styles.answer} ${styles.active}`}>
                          답변 채택
                        </span>
                      </>
                    ) : (
                      <>
                        <Image
                          src="/svgs/answer_check_none.svg"
                          alt="답변 필요"
                          width={32}
                          height={32}
                        />
                        <span className={styles.answer}>답변 필요</span>
                      </>
                    ))}
                </div>
                <div className={styles.line}></div>
                <div className={styles.infoBox}>
                  <Image
                    src="/svgs/eye.svg"
                    alt="조회수"
                    width={32}
                    height={32}
                  />
                  {board.viewCount}
                </div>
                <div className={styles.line}></div>
                <div className={styles.infoBox}>
                  <Image
                    src="/svgs/heart.svg"
                    alt="좋아요"
                    width={32}
                    height={32}
                  />
                  {board.recommendCount}
                </div>
                <div className={styles.line}></div>
                <div className={styles.infoBox}>
                  <Image
                    src="/svgs/comment.svg"
                    alt="댓글"
                    width={32}
                    height={32}
                  />
                  {board.commentCount}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Table;
