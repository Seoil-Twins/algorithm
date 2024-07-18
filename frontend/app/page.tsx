import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.scss";

import { notosansBold, notosansMedium } from "@/styles/_font";

import AlgorithmCard from "@/components/home/algorithmCard";
import PostCard from "@/components/home/postCard";

import { Algorithm } from "@/types2/algorithm";
import { Board } from "@/types2/board";

import { getRecommendAlgorithms } from "./actions/algorithm";
import { getRecommendPosts } from "./actions/baord";
import {
  RecommendAlgorithm,
  RecommendAlgorithmItem,
} from "./api/model/algorithm";
import { AlgorithmAPI } from "@/api/algorithm";
import { RecommendBoardItem } from "./api/model/board";
import { BoardAPI } from "@/api/board";

const Home = async () => {
  const algorithms: RecommendAlgorithmItem[] = (
    await (await AlgorithmAPI.getRecommendAlgorithms()).json()
  ).algorithms;

  const boards: RecommendBoardItem[] = (
    await (await BoardAPI.getRecommendBoards()).json()
  ).boards;

  return (
    <>
      <div className={styles.titleBox}>
        <div className={styles.topBox}>
          <Image
            src="/svgs/bright.svg"
            width={39}
            height={43}
            alt="강조 이미지"
            className={styles.brightImg}
          />
          <div className={styles.imgBox}>
            <Image
              src="/svgs/lighting.svg"
              width={34}
              height={34}
              alt="번개 이미지"
            />
          </div>
          <div className={`${notosansMedium.className} ${styles.title}`}>
            <span className={styles.emphasis}>알고리즘</span>
            <span>간단하게 공부하세요!</span>
          </div>
        </div>
        <div className={`${notosansMedium.className} ${styles.ft24}`}>
          알고리즘 기초부터 심화까지 단계별로 풀어보세요
        </div>
        <Link href="/algorithm">
          <div className={`${notosansBold.className} ${styles.algorithmBtn}`}>
            알고리즘 보러가기
          </div>
        </Link>
      </div>
      <div className={styles.videoBox}>
        <iframe
          src="http://www.youtube.com/embed/PCkiz2GUFg8"
          width="100%"
          height="100%"
        ></iframe>
      </div>
      {algorithms.length > 0 && (
        <>
          <div className={styles.cardTop}>
            <div className={styles.topBox}>
              <div className={`${styles.ft24} ${notosansMedium.className}`}>
                추천 알고리즘
              </div>
              <Link href="/algorithm" className={notosansMedium.className}>
                <button className={styles.moreBtn}>더 보기</button>
              </Link>
            </div>
          </div>
          <div className={`${styles.cardBox} ${styles.algorithmCardBox}`}>
            {algorithms.map((algorithm: RecommendAlgorithmItem) => (
              <AlgorithmCard
                key={algorithm.algorithmId}
                algorithm={algorithm}
              />
            ))}
          </div>
        </>
      )}
      {boards.length > 0 && (
        <>
          <div className={styles.cardTop}>
            <div className={styles.topBox}>
              <div className={`${styles.ft24} ${notosansMedium.className}`}>
                추천 게시물
              </div>
              <Link href="/forum" className={notosansMedium.className}>
                <button className={styles.moreBtn}>더 보기</button>
              </Link>
            </div>
          </div>
          <div className={`${styles.cardBox} ${styles.postCardBox}`}>
            {boards.map((board: RecommendBoardItem) => (
              <PostCard key={board.boardId} post={board} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
