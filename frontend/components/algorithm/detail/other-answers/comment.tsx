"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import { IMAGE_URL } from "@/api";
import { CommentAPI } from "@/api/comment";

import { CommentListItem } from "@/app/api/model/comment";

import { useAuth } from "@/providers/authProvider";

import styles from "./comment.module.scss";
import { notosansMedium } from "@/styles/_font";

import EditorViewer from "@/components/common/editorViewer";
import CommentUpdateEditor from "@/components/detail/commentUpdateEditor";
import Modal from "@/components/common/modal";

type CommentProps = {
  comment: CommentListItem;
};

const Comment = ({ comment }: CommentProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);
  const [isVisibleEditor, setIsVisibleEditor] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);

  const handleIsVisibleCommentEditor = useCallback(() => {
    setIsVisibleEditor((prev) => !prev);
  }, []);

  const handleISVisibleModal = useCallback(() => {
    setIsVisibleModal((prev) => !prev);
  }, []);

  const handleCommentUpdate = useCallback(
    async (value: string) => {
      try {
        await CommentAPI.updateComment(comment.commentId, {
          content: value,
        });

        router.refresh();
        setIsVisibleEditor(false);
      } catch (error) {
        toast.error("댓글 수정에 실패하였습니다.");
      }
    },
    [comment.commentId, router],
  );

  const handleCommentDelete = useCallback(async () => {
    try {
      await CommentAPI.deleteComment(comment.commentId);
      router.refresh();
      setIsVisibleModal(false);
    } catch (error) {
      toast.error("댓글 삭제에 실패하였습니다.");
    }
  }, [comment.commentId, router]);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    if (!isVisibleEditor) {
      setInit(true);
    }
  }, [isVisibleEditor]);

  return (
    <div className={styles.comment}>
      <Link href={`/user/${comment.user.userId}/question`}>
        <Image
          src={`${IMAGE_URL}${comment.user.profile}`}
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
            initialValue={comment.content}
            onSubmit={handleCommentUpdate}
            isVisibleToolbar={false}
            init={init}
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
