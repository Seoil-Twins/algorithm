import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./algorithmCard.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import { Algorithm } from "@/interfaces/algorithm";

import TagSlider from "./tagSlider";

import { getRecommendAlgorithms } from "@/api/algorithm";

const fetchRecommendAlgorithm = async () => {
  const response: Algorithm[] = await getRecommendAlgorithms();
  return response;
};

const AlgorithmCard = async () => {
  const recommendAlgorithms: Algorithm[] = await fetchRecommendAlgorithm();

  return (
    <div className={styles.cardBox}>
      {recommendAlgorithms.map((algorithm: Algorithm) => {
        return (
          <div className={styles.itemBox} key={algorithm.algorithmId}>
            <div className={`${styles.id} ${notosansBold.className}`}>
              {algorithm.algorithmId}
            </div>
            <div className={`${styles.title} ${notosansMedium.className}`}>
              {algorithm.title}
            </div>
            <div className={styles.tagSliderBox}>
              <TagSlider tags={algorithm.kinds} />
            </div>
            <div className={styles.content}>{algorithm.content}</div>
            <div className={styles.btnBox}>
              <Link href={`/algorithm/${algorithm.algorithmId}`}>
                <div className={styles.moreBtn}>
                  <Image
                    src="/svgs/more_arrow.svg"
                    alt="자세히 보기 버튼"
                    width={34}
                    height={34}
                    className={styles.moreImg}
                  />
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AlgorithmCard;
