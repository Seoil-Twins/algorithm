"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import styles from "./comment.module.scss";

import { useAuth } from "@/providers/authProvider";

import CommentType from "@/interfaces/comment";

import { IMAGE_URL } from "@/api";
import { deleteComment, modifyCommentSolved } from "@/api/comment";

import EditorViewer from "../common/editorViewer";
import CommentUpdateEditor from "./commentUpdateEditor";
import RecommendPost from "./recommendPost";
import Modal from "../common/modal";

type CommentProps = {
  comment: CommentType;
  userId: number;
  boardTypeId: number;
  solved?: number | null;
};

const Comment = ({ comment, userId, boardTypeId, solved }: CommentProps) => {
  const router = useRouter();
  const { user } = useAuth()!;

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);

  const handleSolved = useCallback(async () => {
    // call api
    await modifyCommentSolved(comment.commentId);
    router.refresh();
  }, [comment.commentId, router]);

  const handleIsVisibleCommentEditor = useCallback(() => {
    setIsVisibleEditor((prev) => !prev);
  }, []);

  const handleISVisibleModal = useCallback(() => {
    setIsVisibleModal((prev) => !prev);
  }, []);

  const handleCommentDelete = useCallback(async () => {
    await deleteComment(comment.commentId);
    router.refresh();
    setIsVisibleModal(false);
  }, [comment.commentId, router]);

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
        <button onClick={handleSolved}>
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
            <Link
              href={`/user/${comment.user.userId}/question`}
              className={styles.flex}
            >
              <Image
                src={
                  comment.user.profile
                    ? `${IMAGE_URL}/${comment.user.profile}`
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
                        onClick={handleISVisibleModal}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.recommend}>
            <div className={styles.solved}>{renderCheckMark()}</div>
            <div className={styles.recommendBtnBox}>
              <RecommendPost
                apiUrl={`/comment/favorite/${comment.commentId}`}
                isRecommend={comment.isRecommend}
                recommendCount={comment.recommend}
                userId={user?.userId}
                requestId={comment.commentId}
                padding={10}
              />
            </div>
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
      <Modal
        isVisible={isVisibleModal}
        title="정말 삭제하시겠습니까?"
        onOk={handleCommentDelete}
        onCancel={handleISVisibleModal}
        maxWidth={45}
      >
        <p>한 번 삭제하시면 되돌릴 수가 없습니다.</p>
      </Modal>
    </div>
  );
};

export default Comment;
