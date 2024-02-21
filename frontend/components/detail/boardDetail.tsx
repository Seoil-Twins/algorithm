import Image from "next/image";
import Link from "next/link";

import Board from "@/types/board";
import { User } from "@/types/user";

import { getBoardDetail } from "@/api/board";
import { ResponseComment, getComments } from "@/api/comment";
import { getUser } from "@/api/user";

import styles from "./boardDetail.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import DetailNav from "./detailNav";
import EditorViewer from "../common/editorViewer";
import RecommendPost from "./recommendPost";
import CommentEditor from "./commentEditor";
import Comment from "./comment";
import Pagination from "../common/pagination";

type BoardDetailProps = {
  boardId: number;
};

const BoardDetail = async ({
  boardId,
  searchParams,
}: {
  boardId: BoardDetailProps["boardId"];
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  let user: User | undefined = undefined;
  try {
    user = (await getUser()).data;
  } catch (error) {
    user = undefined;
  }

  const board: Board = await getBoardDetail(boardId);

  const count = Number(searchParams?.count) || 10;
  const page = Number(searchParams?.page) || 1;
  const comments: ResponseComment = await getComments(boardId, { count, page });

  return (
    <div>
      <DetailNav isEditable={user?.userId === board.user.userId} />
      <div className={styles.contentBox}>
        <div className={styles.user}>
          <Link
            href={`/user/${board.user.userId}/question`}
            className={styles.flex}
          >
            <Image
              src={
                board.user.profile
                  ? board.user.profile
                  : "user_profile_default.svg"
              }
              alt="프로필 사진"
              width={38}
              height={38}
              className={styles.profileImg}
            />
            <div className={styles.userInfo}>
              <div className={notosansMedium.className}>
                {board.user.nickname}
              </div>
              <div className={styles.createdTime}>{board.createdTime}</div>
            </div>
          </Link>
        </div>
        {typeof board.solved === "number" && (
          <span className={`${styles.solved} ${notosansMedium.className}`}>
            해결 완료
          </span>
        )}
        {board.solved === null && (
          <span className={styles.notSolved}>미해결</span>
        )}
        <div className={`${styles.title} ${notosansBold.className}`}>
          {board.title}
        </div>
        <EditorViewer className={styles.content} content={board.content} />
        <div className={styles.bottom}>
          <div className={styles.tagBox}>
            {board.tags?.map((tag, idx) => (
              <div key={idx} className={styles.tag}>
                # {tag}
              </div>
            ))}
          </div>
          <RecommendPost
            apiUrl={`/board/favorite/${board.boardId}`}
            isRecommend={board.isRecommend}
            recommendCount={board.recommendCount}
            userId={user?.userId}
            requestId={board.boardId}
          />
        </div>
        <hr className={styles.line} />
        <div className={styles.commentTotal}>{comments.total}개의 답변</div>
        {user && <CommentEditor apiUrl={`/board/comment/${boardId}`} />}
        {comments.total > 0 && (
          <div className={styles.commentBox}>
            {comments.comments.map((comment) => (
              <Comment
                key={comment.commentId}
                comment={comment}
                userId={board.user.userId}
                boardTypeId={board.boardType}
                solved={board.solved}
              />
            ))}
            <Pagination
              current={page}
              count={count}
              total={comments.total}
              marginTop={25}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
