import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import AlramType from "@/interfaces/alram";

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
                        {alram.otherUser.profile ? (
                          <Image
                            src={alram.otherUser.profile}
                            alt="다른 사용자 이미지"
                            width={28}
                            height={28}
                          />
                        ) : (
                          <Image
                            src="/svgs/user_profile_default.svg"
                            alt="기본 사용자 이미지"
                            width={28}
                            height={28}
                          />
                        )}
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