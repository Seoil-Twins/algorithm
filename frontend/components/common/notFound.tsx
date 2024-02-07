import Image from "next/image";
import React from "react";

import styles from "./notfound.module.scss";
import { notosansMedium } from "@/styles/_font";

type NotFoundProps = {
  title: string;
  description: string;
};

const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <div className={styles.notFound}>
      <div className={styles.imgBox}>
        <Image
          src="/svgs/no_data.svg"
          alt="데이터 없음"
          width={500}
          height={500}
          className={styles.dynamicImg}
        />
      </div>
      <div className={styles.textBox}>
        <div className={`${styles.title} ${notosansMedium.className}`}>
          {title}
        </div>
        <div className={styles.desc}>{description}</div>
      </div>
    </div>
  );
};

export default NotFound;
