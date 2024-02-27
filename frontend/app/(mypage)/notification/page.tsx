"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useSWR, { useSWRConfig } from "swr";

import { ResponseNotification } from "@/types/user";

import { useAuth } from "@/providers/authProvider";

import styles from "./notification.module.scss";

import Content from "@/components/mypage/content";
import ToggleButton from "@/components/common/toggleButton";
import Spinner from "@/components/common/spinner";
import { UserKeys } from "@/types/constants";
import { getNotifications, updateNotifications } from "@/app/actions/user";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const { mutate } = useSWRConfig();
  const { data: notificationsWithAPI, isLoading: notificationLoading } = useSWR(
    UserKeys.getNotification,
    getNotifications,
  );

  const [notifications, setNotifications] =
    useState<NotificationSettings[]>(defaultNotifications);
  const prevNotifications = useRef<NotificationSettings[]>();

  const updateNotification = useDebouncedCallback(
    useCallback(
      async (request: NotificationSettings[]) => {
        if (!user) return;

        // 이전 값 deep copy
        prevNotifications.current = JSON.parse(JSON.stringify(notifications));

        const notificationSettings: ResponseNotification = request.reduce(
          (result, { paramKey, value }) => {
            result[paramKey] = value;
            return result;
          },
          {} as ResponseNotification,
        );

        const response = await updateNotifications(
          user.userId,
          notificationSettings,
        );
        if (response.status === 200) {
          mutate(UserKeys.getNotification);
          toast.success("알림 설정을 변경하였습니다.");
        } else {
          setNotifications(prevNotifications.current!);
          toast.error("알림 설정을 변경하는데 실패했습니다.");
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [user, mutate],
    ),
    600,
  );

  const handleChange = useCallback(
    (idx: number, value: boolean) => {
      setNotifications((prev) => {
        const newNotification = JSON.parse(JSON.stringify(notifications));
        newNotification[idx].value = value;

        updateNotification(newNotification);
        return newNotification;
      });
    },
    [notifications, updateNotification],
  );

  const callFetchNotification = useCallback(async () => {
    if (!notificationsWithAPI) return;

    if (notificationsWithAPI.data) {
      setNotifications((prev) => {
        prevNotifications.current = prev;

        return prev.map((notification: NotificationSettings) => ({
          ...notification,
          value: notificationsWithAPI.data[notification.paramKey],
        }));
      });
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
