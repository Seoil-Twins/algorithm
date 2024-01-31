import Image from "next/image";

import Board from "@/interfaces/board";

import { getBoardDetail } from "@/api/board";
import { ResponseComment, getComments } from "@/api/comment";
import { getUser } from "@/api/user";
import { User } from "@/interfaces/user";

import { getSessionId } from "@/utils/serverSideSession";

import DetailNav from "./detailNav";
import EditorViewer from "../common/editorViewer";
import RecommendPost from "./recommendPost";
import CommentEditor from "./commentEditor";
import Comment from "./comment";

import styles from "./boardDetail.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

type BoardDetailProps = {
  boardId: number;
};

const BoardDetail = async ({ boardId }: BoardDetailProps) => {
  const sessionId = await getSessionId();
  const user: User | undefined = await getUser(sessionId);
  const board: Board = await getBoardDetail(boardId);
  const comments: ResponseComment = await getComments(boardId);

  return (
    <div>
      <DetailNav isEditable={user?.userId === board.user.userId} />
      <div className={styles.contentBox}>
        <div className={styles.user}>
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
        <RecommendPost
          isFavorite={board.isLike}
          recommendCount={board.likeTotal}
          userId={sessionId}
          boardId={board.boardId}
        />
        <hr className={styles.line} />
        <div className={styles.commentTotal}>{comments.total}개의 답변</div>
        {sessionId && <CommentEditor />}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
