import Image from "next/image";

import { ResponseBoards, getBoardTypes } from "@/api/board";

import styles from "./table.module.scss";

import { getTimeAgo } from "@/utils/day";
import { notosansMedium } from "@/styles/_font";
import Link from "next/link";

type TableProps = {
  item: ResponseBoards;
};

const Table = async ({ item }: TableProps) => {
  const boardType = await getBoardTypes();

  return (
    <div className={styles.table}>
      {item.contents.map((content) => (
        <Link href={`/forum/${content.boardId}`} key={content.boardId}>
          <div className={styles.item}>
            <Image
              src={
                content.user.profile
                  ? content.user.profile
                  : "/svgs/user_profile_default.svg"
              }
              alt="프로필 사진"
              width={46}
              height={46}
              className={styles.profileImg}
            />
            <div className={styles.contentBox}>
              <div className={styles.content}>
                <div className={styles.boardType}>
                  {
                    boardType
                      .find((type) => type.boardTypeId === content.boardType)
                      ?.title.split(" ")[1]
                  }
                </div>
                <div className={`${styles.title} ${notosansMedium.className}`}>
                  {content.title}
                </div>
                <div className={styles.etc}>
                  <div>{content.user.nickname}</div>
                  <div className={styles.line}></div>
                  <div>{getTimeAgo(content.createdTime)}</div>
                </div>
              </div>
              <div className={styles.infoWrapper}>
                {content.solved !== undefined && (
                  <>
                    <div className={styles.infoBox}>
                      {typeof content.solved === "number" ? (
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
                      )}
                    </div>
                    <div className={styles.line}></div>
                  </>
                )}
                <div className={styles.infoBox}>
                  <Image
                    src="/svgs/eye.svg"
                    alt="조회수"
                    width={32}
                    height={32}
                  />
                  {content.views}
                </div>
                <div className={styles.line}></div>
                <div className={styles.infoBox}>
                  <Image
                    src="/svgs/heart.svg"
                    alt="좋아요"
                    width={32}
                    height={32}
                  />
                  {content.favorites}
                </div>
                <div className={styles.line}></div>
                <div className={styles.infoBox}>
                  <Image
                    src="/svgs/comment.svg"
                    alt="댓글"
                    width={32}
                    height={32}
                  />
                  {content.comments}
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
