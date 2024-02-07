"use client";

import React, { useCallback, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { notosansBold } from "@/styles/_font";
import styles from "./snsAccount.module.scss";

import { Link } from "@/interfaces/link";

interface SNSLinking {
  id: string;
  title: string;
  imgSrc: string;
  disabled: boolean;
}

type SnsAccountProps = {
  sns: {
    userId: number;
    links: Link[];
  };
};

const SnsAccount = ({ sns }: SnsAccountProps) => {
  const router = useRouter();
  const snsId = {
    github: "1001",
    google: "1002",
    naver: "1003",
    kakao: "1004",
  };

  const [snsLinkings, _] = useState<SNSLinking[]>([
    {
      id: snsId.github,
      title: "Github",
      imgSrc: "./svgs/github.svg",
      disabled: sns.links[0].linkKind === snsId.github,
    },
    {
      id: snsId.google,
      title: "Google",
      imgSrc: "./svgs/google.svg",
      disabled: sns.links[0].linkKind === snsId.google,
    },
    {
      id: snsId.naver,
      title: "Naver",
      imgSrc: "./svgs/naver.svg",
      disabled: sns.links[0].linkKind === snsId.naver,
    },
    {
      id: snsId.kakao,
      title: "Kakako",
      imgSrc: "./svgs/kakao.svg",
      disabled: sns.links[0].linkKind === snsId.kakao,
    },
  ]);

  const findSnsLinkInfo = useCallback(
    (id: string) => {
      const finded = snsLinkings.find((value: SNSLinking) => value.id === id);
      return finded;
    },
    [snsLinkings],
  );

  const handleGithub = useCallback(() => {
    if (findSnsLinkInfo("1001")?.disabled) return;

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
  }, [findSnsLinkInfo, router]);

  const handleGoogle = useCallback(() => {
    if (findSnsLinkInfo("1002")?.disabled) return;

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
  }, [findSnsLinkInfo, router]);

  const handleNaver = useCallback(() => {
    if (findSnsLinkInfo("1003")?.disabled) return;

    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_NAVER_CODE_REDIRECT_URI;
    const state = process.env.NEXT_PUBLIC_NAVER_STATE;
    if (!clientId || !redirectUri || !state) return;

    const baseUrl = "https://nid.naver.com/oauth2.0/authorize";
    const config = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      // CSRF를 방지하기 위한 인증 값으로, 임의의 값을 넣어주면 된다.
      state: state,
    };
    const params = new URLSearchParams(config);
    const naverUrl = `${baseUrl}?${params.toString()}`;

    router.push(naverUrl);
  }, [findSnsLinkInfo, router]);

  const handleKakao = useCallback(() => {
    if (findSnsLinkInfo("1004")?.disabled) return;

    const clientId = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_KAKAO_CODE_REDIRECT_URI;
    const state = process.env.NEXT_PUBLIC_KAKAO_STATE;
    if (!clientId || !redirectUri || !state) return;

    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
    const config = {
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "code",
      // CSRF를 방지하기 위한 인증 값으로, 임의의 값을 넣어주면 된다.
      state: state,
      scope: "profile_nickname,profile_image",
    };
    const params = new URLSearchParams(config);
    const kakaoUrl = `${baseUrl}?${params.toString()}`;

    router.push(kakaoUrl);
  }, [findSnsLinkInfo, router]);

  const handleSnsLinking = useCallback(
    (id: string) => {
      switch (id) {
        case "1001":
          handleGithub();
          break;
        case "1002":
          handleGoogle();
          break;
        case "1003":
          handleNaver();
          break;
        case "1004":
          handleKakao();
          break;
        default:
          break;
      }
    },
    [handleGithub, handleGoogle, handleNaver, handleKakao],
  );

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
            className={`${
              item.disabled ? styles.disabledBtn : styles.linkingBtn
            } ${notosansBold.className}`}
            onClick={() => handleSnsLinking(item.id)}
          >
            {item.disabled ? "연동 완료" : "연동"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SnsAccount;
