"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./snsAccount.module.scss";

import { notosansBold } from "@/styles/_font";

interface SNSLinking {
  title: string;
  imgSrc: string;
  onClick: () => void;
}

const SnsAccount = () => {
  const router = useRouter();

  const handleGithub = useCallback(async () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    if (!clientId) return;

    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
      client_id: clientId,
      scope: "user:email read:user",
    };
    const params = new URLSearchParams(config);
    const githubUrl = `${baseUrl}?${params.toString()}`;

    // gihub Login 주소로 이동
    router.replace(githubUrl);
  }, [router]);

  const handleGoogle = useCallback(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_CODE_REDIRECT_URI;
    if (!clientId || !redirectUri) return;

    const baseUrl = "http://accounts.google.com/o/oauth2/v2/auth";
    const config = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      scope: "email profile",
    };
    const params = new URLSearchParams(config);
    const googleUrl = `${baseUrl}?${params.toString()}`;

    router.push(googleUrl);
  }, [router]);

  const handleNaver = useCallback(() => {
    console.log("naver");
  }, []);

  const handleKakao = useCallback(() => {
    console.log("kakao");
  }, []);

  const snsLinkings: SNSLinking[] = [
    {
      title: "Github",
      imgSrc: "./svgs/github.svg",
      onClick: handleGithub,
    },
    {
      title: "Google",
      imgSrc: "./svgs/google.svg",
      onClick: handleGoogle,
    },
    {
      title: "Naver",
      imgSrc: "./svgs/naver.svg",
      onClick: handleNaver,
    },
    {
      title: "Kakako",
      imgSrc: "./svgs/kakao.svg",
      onClick: handleKakao,
    },
  ];

  return (
    <div className={styles.linking}>
      {snsLinkings.map((item: SNSLinking, idx: number) => (
        <div className={styles.sns} key={idx}>
          <Image
            src={item.imgSrc}
            alt={`${item.title} 아이콘`}
            width={45}
            height={45}
          />
          <span>{item.title}</span>
          <button
            className={`${styles.linkingBtn} ${notosansBold.className}`}
            onClick={item.onClick}
          >
            연동
          </button>
        </div>
      ))}
    </div>
  );
};

export default SnsAccount;
