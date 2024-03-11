import Image from "next/image";
import Link from "next/link";

import { User } from "@/types/user";
import { CommentResponse } from "@/types/comment";

import { getComments } from "@/app/actions/comment";
import { IMAGE_URL } from "@/app/actions";
import { getUser } from "@/app/actions/user";
import { getBoardDetail } from "@/app/actions/baord";

import styles from "./boardDetail.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import DetailNav from "./detailNav";
import EditorViewer from "../common/editorViewer";
import RecommendPost from "./recommendPost";
import CommentEditor from "./commentEditor";
import Pagination from "../common/pagination";
import NotFound from "../common/notFound";
import Comment from "./comment";
import { BOARD_TYPE } from "@/types/constants";
import FeedbackSolve from "./feedbackSolve";

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
  const userResponse = await getUser();
  let user;
  if (userResponse.status === 200) {
    user = userResponse.data as User;
  } else {
    user = undefined;
  }

  const boardResponse = await getBoardDetail(boardId);
  if (typeof boardResponse.data === "string") {
    return (
      <NotFound
        title="게시글이 존재하지 않습니다."
        description="URL을 다시 확인해주세요."
      />
    );
  }
  const board = boardResponse.data;

  const count = Number(searchParams?.count) || 10;
  const page = Number(searchParams?.page) || 1;
  const commentsResponse = await getComments(boardId, { count, page });

  let comments: CommentResponse = {
    total: 0,
    comments: [],
  };
  if (commentsResponse.status === 200) {
    comments = commentsResponse.data as CommentResponse;
  }

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
                  ? `${IMAGE_URL}/${board.user.profile}`
                  : "/svgs/user_profile_default.svg"
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
          {board.boardType === BOARD_TYPE.ALGORITHM_FEEDBACK &&
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
        {comments.total > 0 && (
          <div className={styles.commentBox}>
            {comments.comments.map((comment) => (
              <Comment
                key={comment.commentId}
                comment={comment}
                userId={board.user.userId}
                boardTypeId={board.boardType}
                solved={Number(board.solved)}
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
