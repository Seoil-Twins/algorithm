"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import styles from "./answer.module.scss";
import { notosansBold } from "@/styles/_font";

import Comment from "./comment";
import EditorViewer from "@/components/common/editorViewer";
import CommentEditor from "@/components/detail/commentEditor";
import RecommendPost from "@/components/detail/recommendButton";
import { CommentListWithoutIsRecommend } from "@/app/api/model/comment";

import { IMAGE_URL } from "@/api";
import { CommentAPI } from "@/api/comment";

import { CorrectItem } from "@/app/api/model/algorithm";

type AnswerProps = {
  algorithmId: number;
  answer: CorrectItem;
};

const Answer = ({ algorithmId, answer }: AnswerProps) => {
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(5);

  const [comment, setComment] = useState<CommentListWithoutIsRecommend>();

  const getComments = useCallback(async () => {
    try {
      const response = await CommentAPI.getAnswerComments(
        algorithmId,
        answer.correctId,
        {
          page,
          count,
        },
      );

      setComment(await response.json());
    } catch (error) {
      toast.error("댓글을 불러오지 못했습니다.");
    }
  }, [algorithmId, answer, count, page]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <div className={styles.answer}>
      <div className={styles.user}>
        <div className={styles.title}>
          <Link
            href={`/user/${answer.user.userId}/question`}
            className={styles.flex}
          >
            <Image
              src={`${IMAGE_URL}${answer.user.profile}`}
              alt="유저 아이콘"
              width={38}
              height={38}
              className={styles.profileImg}
            />

            <span className={notosansBold.className}>
              {answer.user.nickname}
            </span>
          </Link>
          <span>님의 풀이</span>
        </div>
        <div className={styles.recommend}>
          <RecommendPost
            type="comment"
            requestId={answer.correctId}
            isRecommend={null}
            recommendCount={answer.recommendCount}
          />
        </div>
      </div>
      <div className={styles.codeBox}>
        <EditorViewer content={answer.code} className={styles.editor} />
      </div>
      <div className={styles.comment}>
        {comment?.comments.map((comment, idx) => (
          <Comment key={idx} comment={comment} />
        ))}
      </div>
      <CommentEditor
        type="code"
        algorithmId={String(algorithmId)}
        requestId={String(answer.correctId)}
        isVisibleToolbar={false}
      />
    </div>
  );
};

export default Answer;
