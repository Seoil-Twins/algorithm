import Image from "next/image";
import Link from "next/link";

import styles from "./boardDetail.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import { BoardTypeId } from "@/types/constants";

import { User } from "@/app/api/model/user";
import { Board } from "@/app/api/model/board";
import { CommentList, CommentListItem } from "@/app/api/model/comment";

import { IMAGE_URL } from "@/api";
import { UserAPI } from "@/api/user";
import { BoardAPI } from "@/api/board";
import { CommentAPI } from "@/api/comment";

import DetailNav from "./detailNav";
import EditorViewer from "../common/editorViewer";
import RecommendPost from "./recommendButton";
import CommentEditor from "./commentEditor";
import Pagination from "../common/pagination";
import NotFound from "../common/notFound";
import Comment from "./comment";
import FeedbackSolve from "./feedbackSolve";

type BoardDetailProps = {
  boardId: number;
  page: number;
  count: number;
};

const BoardDetail = async ({ boardId, page, count }: BoardDetailProps) => {
  const user: User = await (await UserAPI.getUser()).json();

  let board: Board;
  try {
    board = await (await BoardAPI.getBoard(boardId)).json();
  } catch (error: any) {
    if (error.status === 404) {
      return (
        <NotFound
          title="게시글이 존재하지 않습니다."
          description="URL을 다시 확인해주세요."
        />
      );
    } else {
      throw error;
    }
  }

  const comment: CommentList = await (
    await CommentAPI.getComments(boardId, {
      count,
      page,
    })
  ).json();

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
              src={`${IMAGE_URL}${board.user.profile}`}
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
          {board.boardType === String(BoardTypeId.ALGORITHM_FEEDBACK) &&
            (board.solved ? (
              <Image
                src="/svgs/valid_check.svg"
                alt="채택"
                width={32}
                height={32}
              />
            ) : (
              <FeedbackSolve boardId={board.boardId} />
            ))}
        </div>
        {board.solved && (
          <span className={`${styles.solved} ${notosansMedium.className}`}>
            해결 완료
          </span>
        )}
        {!board.solved && <span className={styles.notSolved}>미해결</span>}
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
            type="board"
            requestId={board.boardId}
            isRecommend={board.isRecommend}
            recommendCount={Number(board.recommendCount)}
          />
        </div>
        <hr className={styles.line} />
        <div className={styles.commentTotal}>{board.commentCount}개의 답변</div>
        <CommentEditor requestId={String(board.boardId)} />
        {comment.total > 0 && (
          <div className={styles.commentBox}>
            {comment.comments.map((comment: CommentListItem) => (
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
              total={comment.total}
              marginTop={25}
              useScrollTop={false}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
