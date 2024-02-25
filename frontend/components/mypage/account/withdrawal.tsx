"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import styles from "./withdrawal.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import { useAuth } from "@/providers/authProvider";
import { useFormState } from "react-dom";
import { deleteUser } from "@/app/actions/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Withdrawal = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isCheck, setIsCheck] = useState<boolean>(false);
  const [state, formAction] = useFormState(async () => {
    if (!user?.userId) return;

    return await deleteUser(isCheck, user.userId);
  }, null);

  const handleIsCheck = useCallback(() => {
    setIsCheck((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!state) return;

    if (state.status === 200) {
      logout();
      router.replace("/");
    } else {
      toast.error(state.data, {
        position: "top-center",
        duration: 3000,
      });
    }
  }, [router, state, logout]);

  return (
    <form className={styles.form} action={formAction}>
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
        >
          계정 삭제
        </button>
      </div>
    </form>
  );
};

export default Withdrawal;
