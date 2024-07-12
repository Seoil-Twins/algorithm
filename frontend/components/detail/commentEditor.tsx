"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { IMAGE_URL } from "@/app/actions";
import { postComment } from "@/app/actions/comment";

import { useAuth } from "@/providers/authProvider";

import Editor from "../common/editor";
import styles from "./commentEditor.module.scss";
import SubmitButton from "../common/submitButton";

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

  const [value, setValue] = useState<string>("");
  const [init, setInit] = useState<boolean>(false);

  const [state, formAction] = useFormState(
    async (_prevState: any, _formdata: FormData) => {
      return await postComment(type, requestId, value);
    },
    null,
  );

  const handleChange = useCallback((newVal: string) => {
    setValue(newVal);
  }, []);

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  useEffect(() => {
    if (!state) return;

    if (state.status === 201) {
      setInit(true);
      toast.success("댓글이 작성되었습니다.");
      router.refresh();
    } else if (state.status === 401 && type === "comment") {
      router.push(`/login?error=unauthorized&redirect_url=/forum/${requestId}`);
    } else if (state.status === 401 && type === "code") {
      router.push(
        `/login?error=unauthorized&redirect_url=/algorithm/${requestId}/other-answers`,
      );
    } else {
      toast.error("서버와 통신 중에 오류가 발생했습니다.");
    }
  }, [requestId, type, router, state]);

  return (
    <form className={styles.commentEditor} action={formAction}>
      <div className={styles.editorBox}>
        <div className={styles.profileImgBox}>
          <Image
            src={`${IMAGE_URL}/${user?.profile}`}
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
          btnTitle="답변 작성"
          pendingTitle="작성 중"
          className={`${styles.btn} ${styles.comment}`}
        />
      </div>
    </form>
  );
};

export default CommentEditor;
