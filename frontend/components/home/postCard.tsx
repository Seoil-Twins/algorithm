import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./postCard.module.scss";
import { notosansMedium } from "@/styles/_font";

import TagSlider from "./tagSlider";

import { RecommendBoardItem } from "@/app/api/model/board";
import { IMAGE_URL } from "@/api";

type PostCardProps = {
  post: RecommendBoardItem;
};

const PostCard = async ({ post }: PostCardProps) => {
  return (
    <Link
      href={`/forum/${post.boardId}`}
      className={styles.itemBox}
      key={post.boardId}
    >
      <div className={styles.imgBox}>
        {post.thumbnail ? (
          <Image
            src={`${IMAGE_URL}${post.thumbnail}`}
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
        <div className={styles.username}>{post.user.nickname}</div>
        <div>{post.createdTime}</div>
      </div>
    </Link>
  );
};

export default PostCard;
