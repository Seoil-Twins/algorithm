import React from "react";
import Link from "next/link";
import Image from "next/image";

import Board from "@/interfaces/board";

import styles from "./postCard.module.scss";
import { notosansMedium } from "@/styles/_font";

import TagSlider from "./tagSlider";

const fetchRecommendPosts = async () => {
  const result: Board[] = [
    {
      boardId: 2231,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
      images: [
        {
          boardImageId: 1,
          path: "data:image/jpeg;base64,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",
          size: 3666,
          type: "image/png",
          createdTime: "2023-12-25 12:25:25",
        },
      ],
    },
    {
      boardId: 2232,
      userId: 1,
      username: "암튼 긴 닉네임",
      title:
        "이것은 정말 긴 제목입니다. 아주 긴 제목이지요. 무엇보다 다른 것보다 깁니다.",
      content:
        "이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다.이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다. 이것은 긴 내용입니다.이것은 긴 내용입니다.",
      tags: ["자유", "C++", "행복한 유치원", "이것은 아주 긴 태그입니다."],
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2233,
      userId: 1,
      title: "님들 산타가 언제 쉬는지 암?",
      username: "암튼 긴 닉네임",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2234,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2239,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
    },
    {
      boardId: 2235,
      userId: 1,
      username: "닉네임1",
      title: "님들 산타가 언제 쉬는지 암?",
      content: "산타 클로스(close) 촤하하하하",
      tags: ["질문", "Java", "피보나치 수"],
      createdTime: "2023-12-25 12:25:25",
    },
  ];

  return result;
};

const PostCard = async () => {
  const recommendPosts = await fetchRecommendPosts();

  return (
    <div className={styles.cardBox}>
      {recommendPosts.map((post: Board) => {
        return (
          <div className={styles.itemBox} key={post.boardId}>
            <Link href={`/board/${post.boardId}`}>
              <div className={styles.imgBox}>
                {post.images ? (
                  <Image
                    src={post.images[0].path}
                    alt="이미지 없음"
                    width={0}
                    height={0}
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  <div className={styles.nonImgBox}>
                    <Image
                      src="/svgs/no_image.svg"
                      alt="이미지 없음"
                      sizes="100vw"
                      width={0}
                      height={0}
                    />
                  </div>
                )}
              </div>
            </Link>
            <div className={styles.tagSliderBox}>
              <TagSlider tags={post.tags} />
            </div>
            <Link href={`/board/${post.boardId}`}>
              <div className={`${styles.title} ${notosansMedium.className}`}>
                {post.title}
              </div>
              <div className={styles.infoBox}>
                <div className={styles.username}>{post.username}</div>
                <div>{post.createdTime}</div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default PostCard;
