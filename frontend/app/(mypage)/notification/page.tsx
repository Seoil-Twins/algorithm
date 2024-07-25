"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import useSWR, { useSWRConfig } from "swr";
import toast from "react-hot-toast";

import { NotificationSetting } from "@/app/api/model/user";

import { useAuth } from "@/providers/authProvider";

import styles from "./notification.module.scss";

import Content from "@/components/mypage/content";
import ToggleButton from "@/components/common/toggleButton";
import Spinner from "@/components/common/spinner";

import { SWRKeys } from "@/types/constants";
import { updateNotifications } from "@/app/actions/user";
import { UserAPI } from "@/api/user";
import { CustomException } from "@/app/api";

type NotificationSettings = {
  title: string;
  contents: string;
  paramKey: keyof NotificationSetting;
  value: boolean;
};

const defaultNotifications: NotificationSettings[] = [
  {
    title: "공지사항 알림",
    contents: "공지사항 알림을 받겠습니다.",
    paramKey: "primaryNofi",
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
  const { data: notification, isLoading } = useSWR(
    SWRKeys.getNotification,
    async () => {
      try {
        return (await (
          await UserAPI.getNotification()
        ).json()) as NotificationSetting;
      } catch (error: any) {
        toast.error((error as CustomException).message);
      }
    },
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

        const notificationSettings: NotificationSetting = request.reduce(
          (result, { paramKey, value }) => {
            result[paramKey] = value;
            return result;
          },
          {} as NotificationSetting,
        );

        try {
          await UserAPI.updateNotification(notificationSettings);
          mutate(SWRKeys.getNotification);
          toast.success("알림 설정을 변경하였습니다.");
        } catch (error) {
          const exception: CustomException = error as CustomException;
          toast.error(exception.message);
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [user, mutate],
    ),
    600,
  );

  const handleChange = useCallback(
    (idx: number, value: boolean) => {
      setNotifications(() => {
        const newNotification = JSON.parse(JSON.stringify(notifications));
        newNotification[idx].value = value;

        updateNotification(newNotification);
        return newNotification;
      });
    },
    [notifications, updateNotification],
  );

  const callFetchNotification = useCallback(async () => {
    if (!notification) return;

    if (notification) {
      setNotifications((prev) => {
        prevNotifications.current = prev;

        return prev.map((item: NotificationSettings) => ({
          ...item,
          value: notification[item.paramKey],
        }));
      });
    }
  }, [notification]);

  useEffect(() => {
    callFetchNotification();
  }, [callFetchNotification]);

  return (
    <Content title="알림">
      <div className={styles.container}>
        {!isLoading && (
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
        <Spinner isVisible={isLoading} />
      </div>
    </Content>
  );
};

export default Notification;
