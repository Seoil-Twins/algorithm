import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import AlramType from "@/types/alram";

import { IMAGE_URL } from "@/api";

import { notosansMedium } from "@/styles/_font";
import styles from "./alram.module.scss";

type AlramProps = {
  isVisible: boolean;
  alrams: AlramType[];
};

const Alram = forwardRef<HTMLDivElement, AlramProps>(
  ({ isVisible, alrams }, ref) => {
    return (
      <>
        {isVisible && (
          <div className={styles.alramModalBox} ref={ref}>
            <div className={styles.title}>알림</div>
            <div className={styles.content}>
              {alrams ? (
                alrams.map((alram, idx) => (
                  <Link href={`/forum/${alram.board.boardId}`} key={idx}>
                    <div className={styles.item}>
                      <div>
                        <Image
                          src={
                            alram.otherUser.profile
                              ? `${IMAGE_URL}/${alram.otherUser.profile}`
                              : "/svgs/user_profile_default.svg"
                          }
                          alt="프로필 사진"
                          width={28}
                          height={28}
                          className={styles.profileImg}
                        />
                      </div>
                      <div>{alram.otherUser.nickname}</div>
                      <div>{alram.createdTime}</div>
                      <div
                        className={`${styles.oneline} ${notosansMedium.className}`}
                      >
                        {alram.board.title}
                      </div>
                      <div className={styles.oneline}>{alram.content}</div>
                    </div>
                  </Link>
                ))
              ) : (
                <div>없음</div>
              )}
            </div>
          </div>
        )}
      </>
    );
  },
);

Alram.displayName = "Alram";

export default Alram;
