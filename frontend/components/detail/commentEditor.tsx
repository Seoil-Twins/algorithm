"use client";

import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { postComment } from "@/app/actions/comment";

import { useAuth } from "@/providers/authProvider";

import Editor from "../common/editor";
import styles from "./commentEditor.module.scss";
import SubmitButton from "../common/submitButton";
import { IMAGE_URL } from "@/api";
import { CommentAPI } from "@/api/comment";

type CommentEditorProps = {
  requestId: string;
  type?: "comment" | "code";
  isVisibleToolbar?: boolean;
};

const CommentEditor = ({
  requestId,
  type = "comment",
  isVisibleToolbar = true,
}: CommentEditorProps) => {
  const router = useRouter();
  const { user } = useAuth();

  const [isPending, setIsPending] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [init, setInit] = useState<boolean>(false);

  const handleAddComment = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      try {
        setIsPending(true);
        await CommentAPI.addComment(requestId, {
          content: value,
        });

        setInit(true);
        toast.success("댓글이 작성되었습니다.");
        router.refresh();
      } catch (error: any) {
        if (error.status === 401 && type === "comment") {
          router.push(
            `/login?error=unauthorized&redirect_url=/forum/${requestId}`,
          );
        } else if (error.status === 401 && type === "code") {
          router.push(
            `/login?error=unauthorized&redirect_url=/algorithm/${requestId}/other-answers`,
          );
        } else {
          toast.error("서버와 통신 중에 오류가 발생했습니다.");
        }
      } finally {
        setIsPending(false);
      }
    },
    [requestId, type, router, value],
  );

  const handleChange = useCallback((newVal: string) => {
    setValue(newVal);
  }, []);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  return (
    <form className={styles.commentEditor} onSubmit={handleAddComment}>
      <div className={styles.editorBox}>
        <div className={styles.profileImgBox}>
          <Image
            src={`${IMAGE_URL}${user?.profile}`}
            alt="프로필 사진"
            width={38}
            height={38}
            className={styles.profileImg}
          />
        </div>
        <Editor
          value={value}
          onChange={handleChange}
          placeholder="Markdown을 지원하는 댓글창입니다."
          className={styles.editor}
          isVisibleToolbar={isVisibleToolbar}
          init={init}
        />
      </div>
      <div className={styles.btnBox}>
        <SubmitButton
          isPending={isPending}
          btnTitle="답변 작성"
          pendingTitle="작성 중"
          className={`${styles.btn} ${styles.comment}`}
        />
      </div>
    </form>
  );
};

export default CommentEditor;
