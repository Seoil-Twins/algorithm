"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import CommentType from "@/interfaces/comment";

import { deleteComment } from "@/api/comment";

import { useAuth } from "@/providers/authProvider";

import styles from "./comment.module.scss";
import { notosansMedium } from "@/styles/_font";

import EditorViewer from "@/components/common/editorViewer";
import CommentUpdateEditor from "@/components/detail/commentUpdateEditor";

type CommentProps = {
  comment: Pick<CommentType, "commentId" | "user" | "content" | "createdTime">;
};

const Comment = ({ comment }: CommentProps) => {
  const router = useRouter();
  const { user } = useAuth()!;

  const [content, setContent] = useState<string>(comment.content);
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);

  const handleIsVisibleCommentEditor = useCallback(() => {
    setIsVisibleEditor((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    (value: string) => {
      console.log(value, comment.commentId);
      setContent(value);
      setIsVisibleEditor(false);
    },
    [comment.commentId],
  );

  const handleCommentDelete = useCallback(
    async (commentId: number) => {
      await deleteComment(commentId);
      router.refresh();
    },
    [router],
  );

  return (
    <div className={styles.comment}>
      <Image
        src={
          comment.user.profile
            ? comment.user.profile
            : "/svgs/user_profile_default.svg"
        }
        alt="프로필 사진"
        width={32}
        height={32}
        className={styles.profileImg}
      />
      <div className={styles.content}>
        <div className={styles.user}>
          <span className={notosansMedium.className}>
            {comment.user.nickname}
          </span>
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
              <button
                className={styles.red}
                onClick={() => handleCommentDelete(comment.commentId)}
              >
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
    </div>
  );
};

export default Comment;
