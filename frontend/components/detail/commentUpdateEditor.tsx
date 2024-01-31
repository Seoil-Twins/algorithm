"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";

import Editor from "../common/editor";

import styles from "./commentEditor.module.scss";

import { useParams, useRouter } from "next/navigation";

type CommentUpdateEditorProps = {
  commentId: number;
  initialValue: string;
  onChangeComment: () => void;
};

const CommentUpdateEditor = ({
  commentId,
  initialValue,
  onChangeComment,
}: CommentUpdateEditorProps) => {
  const router = useRouter();
  const { algorithmId, boardId } = useParams();

  const [value, setValue] = useState<string>(initialValue);

  const handleChange = useCallback((newVal: string) => {
    setValue(newVal);
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      console.log(algorithmId, boardId, commentId, value);
      router.refresh();
      // local에서만 업데이트 할 거면 여기서 인자 값에다가 content 넘기면 됨
      onChangeComment();
    },
    [algorithmId, boardId, commentId, value, router, onChangeComment],
  );

  return (
    <form className={styles.commentEditor} onSubmit={handleSubmit}>
      <div className={styles.editorBox}>
        <Editor
          value={value}
          onChange={handleChange}
          placeholder="Markdown을 지원하는 댓글창입니다."
          className={styles.editor}
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
