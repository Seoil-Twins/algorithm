"use client";

import { useRouter, useParams } from "next/navigation";

import styles from "./detailNav.module.scss";
import { useCallback } from "react";
import Link from "next/link";

type DetailNavProps = {
  isEditable: boolean;
};

const DetailNav = ({ isEditable }: DetailNavProps) => {
  const router = useRouter();
  const params = useParams();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleDelete = useCallback(() => {
    console.log("Delete API");
    router.back();
  }, [router]);

  return (
    <nav className={styles.detailNav}>
      <button className={styles.back} onClick={handleBack}>
        뒤로 가기
      </button>
      {isEditable && (
        <div className={styles.editable}>
          <Link
            href={`/algorithm/detail/${params.algorithmId}/update`}
            className={`${styles.update}`}
          >
            글 수정
          </Link>
          <button className={`${styles.delete}`} onClick={handleDelete}>
            글 삭제
          </button>
        </div>
      )}
    </nav>
  );
};

export default DetailNav;
