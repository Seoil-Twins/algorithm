import Image from "next/image";
import styles from "./algorithmNavbar.module.scss";

import { Algorithm } from "@/interfaces/algorithm";
import Link from "next/link";
import { notosansBold } from "@/styles/_font";

type AlgorithmNavbarProps = {
  algorithm: Algorithm;
};

const AlgorithmNavbar = ({ algorithm }: AlgorithmNavbarProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.chapter}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/svgs/logo.svg"
            alt="로고 이미지"
            width={35}
            height={35}
          />
        </Link>
        <span>알고리즘</span>
        <Image
          src="/svgs/arrow_right_gray.svg"
          alt="오른쪽 회색 화살표"
          width={12}
          height={12}
          className={styles.m15}
        />
        <span>{algorithm.kinds[0]}</span>
        <Image
          src="/svgs/arrow_right_gray.svg"
          alt="오른쪽 회색 화살표"
          width={12}
          height={12}
          className={styles.m15}
        />
        <span className={notosansBold.className}>{algorithm.title}</span>
      </div>
    </header>
  );
};

export default AlgorithmNavbar;
