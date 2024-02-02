"use client";

import React, { useCallback, useState } from "react";

import Editor from "../common/editor";

import styles from "./commentUpdateEditor.module.scss";

type CommentUpdateEditorProps = {
  initialValue: string;
  isVisibleToolbar?: boolean;
  onSubmit: (value: string) => void;
};

const CommentUpdateEditor = ({
  initialValue,
  isVisibleToolbar = true,
  onSubmit,
}: CommentUpdateEditorProps) => {
  const [value, setValue] = useState<string>(initialValue);

  const handleChange = useCallback((newVal: string) => {
    setValue(newVal);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onSubmit(value);
    },
    [value, onSubmit],
  );

  return (
    <form className={styles.commentEditor} onSubmit={handleSubmit}>
      <div className={styles.editorBox}>
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
          답변 수정
        </button>
      </div>
    </form>
  );
};

export default CommentUpdateEditor;
