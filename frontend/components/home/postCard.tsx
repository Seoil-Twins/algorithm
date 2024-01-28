import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./postCard.module.scss";
import { notosansMedium } from "@/styles/_font";

import TagSlider from "./tagSlider";
import { BoardList, getRecommendPosts } from "@/api/board";

const fetchRecommendPosts = async () => {
  const result: BoardList[] = await getRecommendPosts();
  return result;
};

const PostCard = async () => {
  const recommendPosts = await fetchRecommendPosts();

  return (
    <div className={styles.cardBox}>
      {recommendPosts.map((post: BoardList) => {
        return (
          <Link
            href={`/board/${post.boardId}`}
            className={styles.itemBox}
            key={post.boardId}
          >
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
            {post.tags && (
              <div className={styles.tagSliderBox}>
                <TagSlider tags={post.tags} />
              </div>
            )}
            <div className={`${styles.title} ${notosansMedium.className}`}>
              {post.title}
            </div>
            <div className={styles.infoBox}>
              <div className={styles.username}>{post.username}</div>
              <div>{post.createdTime}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostCard;
