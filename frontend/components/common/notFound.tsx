import Image from "next/image";
import React from "react";

import styles from "./notfound.module.scss";
import { notosansMedium } from "@/styles/_font";

type NotFoundProps = {
  title: string;
  description: string;
  size?: number;
  marginTop?: number;
};

const NotFound = ({
  title,
  description,
  size = 100,
  marginTop = 20,
}: NotFoundProps) => {
  return (
    <div className={styles.notFound} style={{ marginTop: `${marginTop}px` }}>
      <div className={styles.imgBox}>
        <Image
          src="/svgs/no_data.svg"
          alt="데이터 없음"
          width={500}
          height={500}
          className={styles.dynamicImg}
          style={{ width: `${size}%` }}
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
