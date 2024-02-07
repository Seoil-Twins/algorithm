"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import styles from "./comment.module.scss";

import { useAuth } from "@/providers/authProvider";

import CommentType from "@/interfaces/comment";

import { deleteComment, modifyCommentSolved } from "@/api/comment";

import EditorViewer from "../common/editorViewer";
import CommentUpdateEditor from "./commentUpdateEditor";

type CommentProps = {
  comment: CommentType;
  userId: number;
  boardTypeId: number;
  solved?: number | null;
};

const Comment = ({ comment, userId, boardTypeId, solved }: CommentProps) => {
  const router = useRouter();
  const { user } = useAuth()!;

  const [recommend, setRecommend] = useState<number>(comment.recommend);
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);

  const handleRecommendUp = useDebouncedCallback(
    useCallback(() => {
      console.log("up API");
      setRecommend((prev) => prev + 1);
    }, []),
    500,
  );

  const handleRecommendDown = useDebouncedCallback(
    useCallback(() => {
      console.log("down API");
      setRecommend((prev) => prev - 1);
    }, []),
    500,
  );

  const handleSolved = useCallback(
    async (commentId: number) => {
      // call api
      await modifyCommentSolved(commentId);
      router.refresh();
    },
    [router],
  );

  const handleIsVisibleCommentEditor = useCallback(() => {
    setIsVisibleEditor((prev) => !prev);
  }, []);

  const handleCommentDelete = useCallback(
    async (commentId: number) => {
      await deleteComment(commentId);
      router.refresh();
    },
    [router],
  );

  const handleCommentUpdate = useCallback(
    (value: string) => {
      console.log(value, comment.commentId);
      router.refresh();
      setIsVisibleEditor(false);
    },
    [comment.commentId, router],
  );

  const renderCheckMark = () => {
    if (boardTypeId !== 2 && userId === user?.userId) {
      return comment.commentId === solved ? (
        <Image src="/svgs/valid_check.svg" alt="채택" width={32} height={32} />
      ) : (
        <button onClick={() => handleSolved(comment.commentId)}>
          <Image
            src="/svgs/non_check.svg"
            alt="미채택"
            width={32}
            height={32}
          />
        </button>
      );
    } else if (userId !== user?.userId && comment.commentId === solved) {
      return (
        <Image src="/svgs/valid_check.svg" alt="채택" width={32} height={32} />
      );
    }
    return null;
  };

  return (
    <div className={styles.comment}>
      <div className={styles.contentBox}>
        <div className={styles.top}>
          <div className={styles.user}>
            <Image
              src={
                comment.user.profile
                  ? comment.user.profile
                  : "/svgs/user_profile_default.svg"
              }
              alt="프로필 사진"
              width={38}
              height={38}
              className={styles.profileImg}
            />
            <div className={styles.info}>
              <div>{comment.user.nickname}</div>
              <div className={styles.fs14}>
                <span className={styles.createdTime}>
                  {comment.createdTime}
                </span>
                {comment.user.userId === user?.userId && (
                  <>
                    <button
                      className={styles.blue}
                      onClick={handleIsVisibleCommentEditor}
                    >
                      수정
                    </button>{" "}
                    ·{" "}
                    <button
                      className={styles.red}
                      onClick={() => handleCommentDelete(comment.commentId)}
                    >
                      삭제
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.recommend}>
            <div className={styles.recommendBtnBox}>
              <button
                type="button"
                className={styles.btn}
                onClick={handleRecommendDown}
              >
                <Image
                  src="/svgs/recommend_down.svg"
                  alt="추천 안 함"
                  width={10}
                  height={10}
                />
              </button>
              <div className={styles.count}>{recommend}</div>
              <button
                type="button"
                className={styles.btn}
                onClick={handleRecommendUp}
              >
                <Image
                  src="/svgs/recommend_up.svg"
                  alt="추천함"
                  width={10}
                  height={10}
                />
              </button>
            </div>
            <div className={styles.solved}>{renderCheckMark()}</div>
          </div>
        </div>
        {isVisibleEditor ? (
          <CommentUpdateEditor
            initialValue={comment.content}
            onSubmit={handleCommentUpdate}
          />
        ) : (
          <EditorViewer content={comment.content} />
        )}
      </div>
    </div>
  );
};

export default Comment;
