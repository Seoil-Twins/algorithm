"use client";

import { useEffect, useState } from "react";

import styles from "./account.module.scss";

import Content from "@/components/mypage/content";

import { useAuth } from "@/providers/AuthProvider";

import { getUser } from "@/api/user";

import { User } from "@/interfaces/user";

const Account = () => {
  const { session } = useAuth()!;
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(session.sessionId);
      setUser(user);
    };

    fetchUser();
  }, [session.sessionId]);

  return (
    <>
      {user ? (
        <>
          <Content title="프로필">하이 ㅋㅋ하이 ㅋㅋ하이 ㅋㅋ하이 ㅋㅋ</Content>
          <Content title="비밀번호">div</Content>
          <Content title="계정 연동">하이 ㅋㅋ</Content>
          <Content title="계정 삭제">하이 ㅋㅋ</Content>
        </>
      ) : null}
    </>
  );
};

export default Account;
