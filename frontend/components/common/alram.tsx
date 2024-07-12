import React, { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { NotificationItem, RequireUser } from "@/app/api/model/user";

import { notosansMedium } from "@/styles/_font";
import styles from "./alram.module.scss";
import { NotificationType } from "@/types/notiication.d";
import { IMAGE_URL } from "@/api";

type AlramProps = {
  isVisible: boolean;
  alrams: NotificationItem[];
};

type Notification = {
  title: string;
  content: string;
  link: string;
  fromUser: RequireUser;
  createdTime: string;
};

const renderNotifications = (alrams: NotificationItem[]) => {
  const notifications: Notification[] = [];

  alrams.forEach((item: NotificationItem) => {
    const notification: Notification = {
      title: "",
      content: "",
      link: "",
      fromUser: item.fromUser,
      createdTime: item.createdTime,
    };

    switch (item.notificationType) {
      case NotificationType.NOTICE:
        notification.title = "공지사항";
        notification.content = `공지사항 '${
          item.notice!.title
        }'이 올라왔습니다`;
        notification.link = `/notice/${item.notice!.noticeId}`;
        break;
      case NotificationType.EVENT:
        notification.title = "이벤트";
        notification.content = `이벤트 '${item.notice!.title}'이 올라왔습니다.`;
        notification.link = `/notice/${item.notice!.noticeId}`;
        break;
      case NotificationType.COMMENT:
        notification.title = `댓글`;
        notification.content = `${item.fromUser.nickname}님이 댓글을 남겼습니다.`;
        notification.link = `/forum/${item.board!.boardId}`;
        break;
      case NotificationType.BOARD_FAVORITE:
        notification.title = `게시글 좋아요`;
        notification.content = `${item.fromUser.nickname}님이 게시글을 좋아요했습니다.`;
        notification.link = `/forum/${item.board!.boardId}`;
        break;
      case NotificationType.COMMENT_FAVORITE:
        notification.title = `댓글 좋아요`;
        notification.content = `${item.fromUser.nickname}님이 댓글을 좋아요했습니다.`;
        notification.link = `/forum/${item.board!.boardId}`;
        break;
      case NotificationType.ANSWER:
        notification.title = `답변`;
        notification.content = `${item.fromUser.nickname}님이 답변을 남겼습니다.`;
        notification.link = `/forum/${item.board!.boardId}`;
        break;
    }

    notifications.push(notification);
  });

  return notifications;
};

const Alram = forwardRef<HTMLDivElement, AlramProps>(
  ({ isVisible, alrams }, ref) => {
    const notitifcations: Notification[] = renderNotifications(alrams);

    return (
      <>
        {isVisible && (
          <div className={styles.alramModalBox} ref={ref}>
            <div className={styles.title}>알림</div>
            <div className={styles.content}>
              {alrams ? (
                notitifcations.map((notitifcation, idx) => (
                  <Link href={notitifcation.link} key={idx}>
                    <div className={styles.item}>
                      <div>
                        <Image
                          src={`${IMAGE_URL}/${notitifcation.fromUser.profile}`}
                          alt="프로필 사진"
                          width={28}
                          height={28}
                          className={styles.profileImg}
                        />
                      </div>
                      <div>{notitifcation.fromUser.nickname}</div>
                      <div>{notitifcation.createdTime}</div>
                      <div
                        className={`${styles.oneline} ${notosansMedium.className}`}
                      >
                        {notitifcation.title}
                      </div>
                      <div className={styles.oneline}>
                        {notitifcation.content}
                      </div>
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
