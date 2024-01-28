import Board from "@/interfaces/board";
import { ResponseComment, getBoardDetail, getComments } from "@/api/board";
import Image from "next/image";

import { getSessionId } from "@/utils/serverSideSession";

import DetailNav from "./detailNav";
import EditorViewer from "../common/editorViewer";

import styles from "./boardDetail.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";
import RecommendPost from "./recommendPost";

type BoardDetailProps = {
  boardId: number;
};

const BoardDetail = async ({ boardId }: BoardDetailProps) => {
  const sessionId = await getSessionId();
  const board: Board = await getBoardDetail(boardId);
  const comments: ResponseComment = await getComments(boardId);

  return (
    <div>
      <DetailNav isEditable={board.user.userId === Number(sessionId)} />
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
        {board.isSolved ? (
          <span className={`${styles.solved} ${notosansMedium.className}`}>
            해결
          </span>
        ) : (
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
      </div>
      {/** CommentEditor (Client) => Profile Image는 ? (optional) */}
      {/** Comment (Client) => 수정, 삭제, 추천, 안에서 수정 누르면 CommendEdtiro 부르기 */}
      {/** Comment (Client) => BoardDetail에서 처음 comment는 주고 N번째는 comment component에서 api 부르기 */}
    </div>
  );
};

export default BoardDetail;
