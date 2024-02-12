"use client";

import { useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useSWR from "swr";

import { useAuth } from "@/providers/authProvider";

import {
  ResponseNotification,
  UserKeys,
  getNotifications,
  updateNotifications,
} from "@/api/user";

import styles from "./notification.module.scss";

import Content from "@/components/mypage/content";
import ToggleButton from "@/components/common/toggleButton";
import Spinner from "@/components/common/spinner";

type NotificationSettings = {
  title: string;
  contents: string;
  paramKey: keyof ResponseNotification;
  value: boolean;
};

const defaultNotifications: NotificationSettings[] = [
  {
    title: "공지사항 알림",
    contents: "공지사항 알림을 받겠습니다.",
    paramKey: "annoNofi",
    value: false,
  },
  {
    title: "소스 코드 알림",
    contents: "다른 사람이 내 소스 코드를 읽었을 때 알림이 발생합니다.",
    paramKey: "postNofi",
    value: false,
  },
  {
    title: "댓글 알림",
    contents:
      "내가 쓴 글 또는 내가 단 갯글에 댓글이 달렸을 때 알람이 발생합니다.",
    paramKey: "commentNofi",
    value: false,
  },
  {
    title: "좋아요 알림",
    contents:
      "내가 쓴 글 또는 내가 단 댓글에 좋아요가 발생하였을 때 알림이 발생합니다.",
    paramKey: "likeNofi",
    value: false,
  },
  {
    title: "답변 알림",
    contents:
      "질문 게시판, 문제 질문, 질문 피드백에 답변이 달렸을 때 알람이 발생합니다.",
    paramKey: "answerNofi",
    value: false,
  },
  {
    title: "마케팅 활용 및 광고 수신 알림",
    contents: "각종 이벤트, 혜택, 할인 행사 등 마케팅 관련 알림이 발생합니다.",
    paramKey: "eventNofi",
    value: false,
  },
];

const Notification = () => {
  const { user } = useAuth();
  const {
    data: notificationsWithAPI,
    isLoading: notificationLoading,
    mutate,
  } = useSWR(UserKeys.getNotification, getNotifications);

  const [notifications, setNotifications] =
    useState<NotificationSettings[]>(defaultNotifications);

  const updateNotification = useDebouncedCallback(
    useCallback(
      async (notifications: NotificationSettings[]) => {
        if (!user) return;

        const notificationSettings: ResponseNotification = notifications.reduce(
          (result, { paramKey, value }) => {
            result[paramKey] = value;
            return result;
          },
          {} as ResponseNotification,
        );

        try {
          await updateNotifications(user.userId, notificationSettings);
        } catch (error) {
          alert("나중에 다시 시도해주세요.");
        }
      },
      [user],
    ),
    600,
  );

  const handleChange = useCallback(
    (idx: number, value: boolean) => {
      setNotifications((prev) => {
        const newNotification = [...prev];
        newNotification[idx].value = value;

        updateNotification(newNotification);

        return newNotification;
      });
    },
    [updateNotification],
  );

  const callFetchNotification = useCallback(async () => {
    if (notificationsWithAPI?.data) {
      setNotifications((prev) =>
        prev.map((notification: NotificationSettings) => ({
          ...notification,
          value: notificationsWithAPI?.data[notification.paramKey],
        })),
      );
    }
  }, [notificationsWithAPI]);

  useEffect(() => {
    callFetchNotification();
  }, [callFetchNotification]);

  return (
    <Content title="알림">
      <div className={styles.container}>
        {!notificationLoading && (
          <>
            {notifications.map((notification, idx) => (
              <div className={styles.item} key={notification.paramKey}>
                <div className={styles.title}>{notification.title}</div>
                <div className={styles.bottom}>
                  <div className={styles.contents}>{notification.contents}</div>
                  <ToggleButton
                    value={notification.value || false}
                    onChange={(value) => handleChange(idx, value)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
        <Spinner isVisible={notificationLoading} />
      </div>
    </Content>
  );
};

export default Notification;
