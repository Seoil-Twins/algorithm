"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import CommentType from "@/types/comment";

import { IMAGE_URL } from "@/api";
import { deleteComment } from "@/api/comment";

import { useAuth } from "@/providers/authProvider";

import styles from "./comment.module.scss";
import { notosansMedium } from "@/styles/_font";

import EditorViewer from "@/components/common/editorViewer";
import CommentUpdateEditor from "@/components/detail/commentUpdateEditor";
import Link from "next/link";
import Modal from "@/components/common/modal";

type CommentProps = {
  comment: Pick<CommentType, "commentId" | "user" | "content" | "createdTime">;
};

const Comment = ({ comment }: CommentProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const [content, setContent] = useState<string>(comment.content);
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);

  const handleIsVisibleCommentEditor = useCallback(() => {
    setIsVisibleEditor((prev) => !prev);
  }, []);

  const handleISVisibleModal = useCallback(() => {
    setIsVisibleModal((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    (value: string) => {
      console.log(value, comment.commentId);
      setContent(value);
      setIsVisibleEditor(false);
    },
    [comment.commentId],
  );

  const handleCommentDelete = useCallback(async () => {
    await deleteComment(comment.commentId);
    router.refresh();
    setIsVisibleModal(false);
  }, [comment.commentId, router]);

  return (
    <div className={styles.comment}>
      <Link href={`/user/${comment.user.userId}/question`}>
        <Image
          src={
            comment.user.profile
              ? `${IMAGE_URL}/${comment.user.profile}`
              : "/svgs/user_profile_default.svg"
          }
          alt="유저 아이콘"
          width={32}
          height={32}
          className={styles.profileImg}
        />
      </Link>
      <div className={styles.content}>
        <div className={styles.user}>
          <Link href={`/user/${comment.user.userId}/question`}>
            <span className={notosansMedium.className}>
              {comment.user.nickname}
            </span>
          </Link>
          <span className={styles.createdTime}>{comment.createdTime}</span>
          {comment.user.userId === user?.userId && (
            <div>
              <button
                className={styles.blue}
                onClick={handleIsVisibleCommentEditor}
              >
                수정
              </button>{" "}
              ·{" "}
              <button className={styles.red} onClick={handleISVisibleModal}>
                삭제
              </button>
            </div>
          )}
        </div>
        {isVisibleEditor ? (
          <CommentUpdateEditor
            initialValue={content}
            onSubmit={handleSubmit}
            isVisibleToolbar={false}
          />
        ) : (
          <EditorViewer content={content} />
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
