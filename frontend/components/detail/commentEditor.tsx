"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import Editor from "../common/editor";

import styles from "./commentEditor.module.scss";

import { IMAGE_URL } from "@/api";
import { postComment } from "@/api/comment";

import { useAuth } from "@/providers/authProvider";
import { useParams, useRouter } from "next/navigation";

type CommentEditorProps = {
  apiUrl?: string;
  isVisibleToolbar?: boolean;
};

const CommentEditor = ({ isVisibleToolbar = true }: CommentEditorProps) => {
  const param = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const boardId = Array.isArray(param.boardId)
    ? param.boardId[0]
    : param.boardId;

  const [value, setValue] = useState<string>("");
  const [init, setInit] = useState<boolean>(false);

  const handleChange = useCallback((newVal: string) => {
    setValue(newVal);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (value.trim() === "") return;

      try {
        await postComment(boardId, value);
        setInit(true);
        router.refresh();
      } catch (error) {
        alert("댓글 작성에 실패했습니다.");
      }
    },
    [boardId, router, value],
  );

  useEffect(() => {
    if (init) {
      setInit(false);
    }
  }, [init]);

  if (!user) return null;

  return (
    <form className={styles.commentEditor} onSubmit={handleSubmit}>
      <div className={styles.editorBox}>
        <div className={styles.profileImgBox}>
          <Image
            src={
              user.profile
                ? `${IMAGE_URL}/${user.profile}`
                : "/svgs/user_profile_default.svg"
            }
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
        <button type="submit" className={`${styles.btn} ${styles.comment}`}>
          답변 작성
        </button>
      </div>
    </form>
  );
};

export default CommentEditor;
