"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";

import { ResponseAnswerItem } from "@/api/code";

import { useAuth } from "@/providers/authProvider";

import styles from "./answer.module.scss";
import { notosansBold } from "@/styles/_font";

import Comment from "./comment";
import EditorViewer from "@/components/common/editorViewer";
import CommentEditor from "@/components/detail/commentEditor";
import { IMAGE_URL } from "@/api";

type AnswerProps = {
  answer: ResponseAnswerItem;
};

const Answer = ({ answer }: AnswerProps) => {
  const { user } = useAuth();

  const [recommend, setRecommend] = useState<number>(answer.recommend);

  const handleRecommendUp = useDebouncedCallback(
    useCallback(() => {
      console.log(answer.codeId);
      setRecommend((prev) => prev + 1);
    }, [answer]),
    500,
  );

  const handleRecommendDown = useDebouncedCallback(
    useCallback(() => {
      console.log(answer.codeId);
      setRecommend((prev) => prev - 1);
    }, [answer]),
    500,
  );

  return (
    <div className={styles.answer}>
      <div className={styles.user}>
        <div className={styles.title}>
          <Image
            src={
              answer.user.profile
                ? `${IMAGE_URL}/${answer.user.profile}`
                : "/svgs/user_profile_default.svg"
            }
            alt="유저 아이콘"
            width={38}
            height={38}
            className={styles.profileImg}
          />
          <span>
            <span className={notosansBold.className}>
              {answer.user.nickname}
            </span>
            님의 풀이
          </span>
        </div>
        <div className={styles.recommend}>
          <button
            type="button"
            className={styles.btn}
            onClick={handleRecommendUp}
          >
            <Image
              src="/svgs/recommend_down.svg"
              alt="추천 안 함"
              width={10}
              height={10}
            />
          </button>
          <div className={styles.count}>{recommend}</div>
          <button
            type="button"
            className={styles.btn}
            onClick={handleRecommendDown}
          >
            <Image
              src="/svgs/recommend_up.svg"
              alt="추천함"
              width={10}
              height={10}
            />
          </button>
        </div>
      </div>
      <div className={styles.codeBox}>
        <EditorViewer content={answer.code} className={styles.editor} />
      </div>
      <div className={styles.comment}>
        {answer.comments.map((comment, idx) => (
          <Comment key={idx} comment={comment} />
        ))}
      </div>
      {user && (
        <CommentEditor
          apiUrl={`/code/comment/${answer.codeId}`}
          isVisibleToolbar={false}
        />
      )}
    </div>
  );
};

export default Answer;
