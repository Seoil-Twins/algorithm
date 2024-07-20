import Image from "next/image";
import Link from "next/link";

import styles from "./boardDetail.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import DetailNav from "./detailNav";
import EditorViewer from "../common/editorViewer";
import RecommendPost from "./recommendPost";
import CommentEditor from "./commentEditor";
import Pagination from "../common/pagination";
import NotFound from "../common/notFound";
import Comment from "./comment";
import FeedbackSolve from "./feedbackSolve";
import { User } from "@/app/api/model/user";
import { UserAPI } from "@/api/user";
import { Board } from "@/app/api/model/board";
import { BoardAPI } from "@/api/board";
import { IMAGE_URL } from "@/api";
import { BoardTypeId } from "@/types/constants";
import { CommentList, CommentListItem } from "@/app/api/model/comment";

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

  const count = Number(searchParams?.count) || 10;
  const page = Number(searchParams?.page) || 1;
  const comment: CommentList = await (
    await BoardAPI.getBoardComments(boardId, {
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
            (board.isSolved ? (
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
        {board.isSolved && (
          <span className={`${styles.solved} ${notosansMedium.className}`}>
            해결 완료
          </span>
        )}
        {!board.isSolved && <span className={styles.notSolved}>미해결</span>}
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
            apiUrl={`/recommend/board/${board.boardId}`}
            isRecommend={board.isRecommend}
            recommendCount={Number(board.recommendCount)}
            userId={user?.userId}
            requestId={board.boardId}
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
                solved={Number(board.isSolved)}
              />
            ))}
            <Pagination
              current={page}
              count={count}
              total={comment.total}
              marginTop={25}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
