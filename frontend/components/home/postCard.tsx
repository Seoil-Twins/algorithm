import React from "react";
import Link from "next/link";
import Image from "next/image";

import Board from "@/interfaces/board";

import styles from "./postCard.module.scss";
import { notosansMedium } from "@/styles/_font";

import TagSlider from "./tagSlider";
import { getRecommendPosts } from "@/api/board";

const fetchRecommendPosts = async () => {
  const result: Board[] = await getRecommendPosts();
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
                {post.thumbnail ? (
                  <Image
                    src={post.thumbnail}
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
