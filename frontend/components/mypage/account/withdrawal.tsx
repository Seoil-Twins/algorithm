"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import styles from "./withdrawal.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import { useUser } from "@/hooks/useUser";

import { UserAPI } from "@/api/user";
import { CustomException } from "@/app/api";

const Withdrawal = () => {
  const { removeUser } = useUser();

  const [isCheck, setIsCheck] = useState<boolean>(false);

  const handleIsCheck = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  const deleteUser = async () => {
    if (!isCheck) {
      toast.error("회원 탈퇴에 동의해주세요.");
      return;
    }

    try {
      await UserAPI.deleteUser();

      removeUser();
      toast.success("회원 탈퇴에 성공하였습니다.");
      location.replace("/");
    } catch (error) {
      const exception: CustomException = error as CustomException;
      toast.error(exception.message);
    }
  };

  return (
    <div className={styles.form}>
      <p>
        회원 탈퇴일부터 계정 정보(아이디/이메일/닉네임)는 <br />
        <Link
          href="privacy-policy"
          className={`${styles.terms} ${notosansMedium.className}`}
        >
          개인정보 보호방침
        </Link>
        에 따라 60일간 보관되며, 60일 경과된 후에는 모든 개인 정보는 삭제됩니다.
      </p>
      <p>
        작성된 게시물은 삭제되지 않으며, 익명으로 처리 후 저희 Algorithm 소유가
        됩니다.
      </p>
      <div className={styles.submit}>
        <div className={styles.alignCenter}>
          <input type="checkbox" id="withdrawal" onClick={handleIsCheck} />
          <label htmlFor="withdrawal">
            계정 삭제에 관한 정책을 읽었으며, 이에 동의합니다.
          </label>
        </div>
        <button
          type="submit"
          className={`${styles.delete} ${notosansBold.className}`}
          onClick={deleteUser}
        >
          계정 삭제
        </button>
      </div>
    </div>
  );
};

export default Withdrawal;
