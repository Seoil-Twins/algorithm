import Image from "next/image";
import React from "react";

import styles from "./notFound.module.scss";
import { notosansBold } from "@/styles/_font";

import PrimaryHeader from "@/components/common/navbar";
import Footer from "@/components/common/footer";

const notFound = async () => {
  return (
    <>
      <div className={styles.notFound}>
        <div className={`${styles.ft22} ${notosansBold.className}`}>
          다시 한 번 확인해 주세요 !
        </div>
        <div className={styles.grayText}>
          입력하신 페이지는 존재하지 않습니다.
        </div>
        <div className={styles.grayText}>
          주소를 다시 확인해주시거나, 관련 문의사항은{" "}
          <span className={styles.underline}>kseungyong20@naver.com</span>로
          알려주시면
        </div>
        <div className={`${styles.grayText} ${styles.mb35}`}>
          친절하게 안내해 드리곘습니다.
        </div>
        <Image
          src="/svgs/not_found.svg"
          width={500}
          height={500}
          alt="페이지를 찾을 수 없습니다."
        />
      </div>
    </>
  );
};

export default notFound;
