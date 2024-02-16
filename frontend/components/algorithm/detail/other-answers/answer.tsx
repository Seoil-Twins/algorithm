"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { IMAGE_URL } from "@/api";
import { ResponseAnswerItem } from "@/api/code";

import { useAuth } from "@/providers/authProvider";

import styles from "./answer.module.scss";
import { notosansBold } from "@/styles/_font";

import Comment from "./comment";
import EditorViewer from "@/components/common/editorViewer";
import CommentEditor from "@/components/detail/commentEditor";
import RecommendPost from "@/components/detail/recommendPost";

type AnswerProps = {
  answer: ResponseAnswerItem;
};

const Answer = ({ answer }: AnswerProps) => {
  const { user } = useAuth();

  return (
    <div className={styles.answer}>
      <div className={styles.user}>
        <div className={styles.title}>
          <Link
            href={`/user/${answer.user.userId}/question`}
            className={styles.flex}
          >
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

            <span className={notosansBold.className}>
              {answer.user.nickname}
            </span>
          </Link>
          <span>님의 풀이</span>
        </div>
        <div className={styles.recommend}>
          {/** 코드 댓글 recommend가 API 나오면 바꿔야 합니다. */}
          <RecommendPost
            apiUrl={`/code/favorite/${answer.codeId}`}
            userId={user?.userId}
            requestId={answer.codeId}
            isRecommend={undefined}
            recommendCount={Number(answer.recommendCount)}
            padding={10}
          />
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
