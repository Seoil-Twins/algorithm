"use client";

import { useCallback, useState } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import { AxiosError } from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

import styles from "./detailNav.module.scss";

import Modal from "../common/modal";
import { BoardAPI } from "@/api/board";

type DetailNavProps = {
  isEditable: boolean;
  isDeletable: boolean;
};

const DetailNav = ({ isEditable, isDeletable }: DetailNavProps) => {
  const router = useRouter();
  const params = useParams();
  const boardId = Number(params.boardId);

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleVisible = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const handleDelete = useCallback(async () => {
    try {
      await BoardAPI.deleteBoard(boardId);
      toast.success("글이 삭제되었습니다.");
      router.back();
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsVisible(false);
    }
  }, [boardId, router]);

  return (
    <nav className={styles.detailNav}>
      <button className={styles.back} onClick={handleBack}>
        뒤로 가기
      </button>
      <div className={styles.editable}>
        {isEditable && (
          <Link
            href={`/forum/${params.boardId}/update`}
            className={`${styles.update}`}
          >
            글 수정
          </Link>
        )}
        {isDeletable && (
          <button className={`${styles.delete}`} onClick={handleVisible}>
            글 삭제
          </button>
        )}
      </div>
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
