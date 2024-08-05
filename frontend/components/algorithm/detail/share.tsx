"use client";

import ThemeImage from "@/components/common/themeImage";
import Script from "next/script";
import { useCallback, useState } from "react";

type ShareProps = {
  algorithmId: number;
  title: string;
  description: string;
  thumbnail?: string | null;
};

const Share = ({ algorithmId, title, description, thumbnail }: ShareProps) => {
  const [isReady, setIsReady] = useState<boolean>(false);

  const onLoadKakao = useCallback(() => {
    const javascriptKey = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;

    if (!javascriptKey) {
      alert("알 수 없는 에러가 발생하였습니다.\n나중에 다시 시도해주세요.");
      return;
    }

    window.Kakao.init(javascriptKey);

    if (!window.Kakao.isInitialized()) {
      alert("알 수 없는 에러가 발생하였습니다.\n나중에 다시 시도해주세요.");
      return;
    }

    setIsReady(true);
  }, []);

  const share = useCallback(() => {
    if (!isReady) {
      alert("나중에 다시 시도해주세요.");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl: thumbnail
          ? thumbnail
          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbV4d7vhKXWp6RMvWRuhcWde75m2CFgRpC7g&usqp=CAU",
        link: {
          mobileWebUrl: `http://localhost:3000/algorithm/${algorithmId}`,
          webUrl: `http://localhost:3000/algorithm/${algorithmId}`,
        },
      },
      buttons: [
        {
          title: "웹으로 이동",
          link: {
            mobileWebUrl: `http://localhost:3000/algorithm/${algorithmId}`,
            webUrl: `http://localhost:3000/algorithm/${algorithmId}`,
          },
        },
      ],
    });
  }, [algorithmId, description, thumbnail, title, isReady]);

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
        integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        onLoad={onLoadKakao}
      />
      <button onClick={share}>
        <ThemeImage
          lightSrc="/svgs/share_black.svg"
          darkSrc="/svgs/share_white.svg"
          alt="공유"
          width={25}
          height={25}
        />
      </button>
    </>
  );
};

export default Share;
