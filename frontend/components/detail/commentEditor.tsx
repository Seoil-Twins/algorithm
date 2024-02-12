"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";

import Editor from "../common/editor";

import styles from "./commentEditor.module.scss";

import { useAuth } from "@/providers/authProvider";
import { IMAGE_URL } from "@/api";

type CommentEditorProps = {
  apiUrl: string;
  isVisibleToolbar?: boolean;
};

const CommentEditor = ({
  apiUrl,
  isVisibleToolbar = true,
}: CommentEditorProps) => {
  const { user } = useAuth();

  const [value, setValue] = useState<string>("");

  const handleChange = useCallback((newVal: string) => {
    setValue(newVal);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log(apiUrl, value);
    },
    [apiUrl, value],
  );

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
            alt="유저 아이콘"
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
