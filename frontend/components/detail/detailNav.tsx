"use client";

import { useRouter, useParams } from "next/navigation";

import styles from "./detailNav.module.scss";
import { useCallback, useState } from "react";
import Link from "next/link";
import Modal from "../common/modal";

type DetailNavProps = {
  isEditable: boolean;
};

const DetailNav = ({ isEditable }: DetailNavProps) => {
  const router = useRouter();
  const params = useParams();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const handleDelete = useCallback(() => {
    console.log("Delete API");
    setIsVisible(false);
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
            href={`/forum/${params.boardId}/update`}
            className={`${styles.update}`}
          >
            글 수정
          </Link>
          <button className={`${styles.delete}`} onClick={handleVisible}>
            글 삭제
          </button>
        </div>
      )}
      <Modal
        isVisible={isVisible}
        title="정말 삭제하겠습니까?"
        primaryType="danger"
        primaryMsg="삭제"
        onOk={handleDelete}
        visibleCancel
        onCancel={handleVisible}
        maxWidth={45}
      >
        <div>삭제하게 되면 더 이상 글을 복구할 수 없게됩니다.</div>
        <div>다시 한 번 신중히 생각 후 결정해주세요.</div>
      </Modal>
    </nav>
  );
};

export default DetailNav;
