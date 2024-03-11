"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { useFormState } from "react-dom";

import { User } from "@/types/user";
import { UserKeys } from "@/types/constants";

import { IMAGE_URL } from "@/app/actions";
import {
  compareVerifyCode,
  sendVerifyCode as sendVerifyCodeAPI,
  updateProfileImg,
  updateProfileUser,
} from "@/app/actions/user";

import { notosansBold } from "@/styles/_font";
import styles from "./userProfileForm.module.scss";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";
import Spinner from "@/components/common/spinner";
import SubmitButton from "@/components/common/submitButton";

interface UserProfileProperty {
  nickname: string;
  email: string;
  verifyCode: string;
}

type UserProfileKeys = keyof UserProfileProperty;

type UserProfile = {
  [key in UserProfileKeys]: {
    value: UserProfileProperty[key];
    disabled?: boolean;
  };
};

type UserProfileProps = {
  user: User;
};

const UserProfileForm = ({ user }: UserProfileProps) => {
  const { mutate } = useSWRConfig();

  const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    email: {
      value: user?.email,
      disabled: true,
    },
    nickname: {
      value: user?.nickname,
    },
    verifyCode: {
      value: "",
      disabled: true,
    },
  });
  const [profileImg, setProfileImg] = useState<string | undefined>(
    user.profile,
  );
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isChangeNickname, setIsChangeNickname] = useState<boolean>(false);
  const [isChangeEmail, setIsChangeEmail] = useState<boolean>(false);
  const [state, formAction] = useFormState(
    async (_: any, formData: FormData) => {
      return await updateProfileUser(
        isVerified,
        isChangeEmail,
        isChangeNickname,
        profileInfo.email.value,
        formData,
      );
    },
    null,
  );

  const handleProfileInfo = useCallback(
    (changedValue: string, name: UserProfileKeys) => {
      setProfileInfo((prev: UserProfile) => {
        const { [name]: updatedField, ...rest } = prev;

        return {
          ...rest,
          [name]: {
            ...updatedField,
            value: changedValue,
          },
        } as UserProfile;
      });
    },
    [],
  );

  const handleProfileImg = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !user) return;

      const profile = files[0];
      const response = await updateProfileImg(user.userId, {
        image: profile,
      });

      if (response.status === 200) {
        mutate(UserKeys.getUser);
        setProfileImg(response.data.profile);
      } else {
        toast.error("서버와의 통신 중 오류가 발생하였습니다.");
      }
    },
    [user, mutate],
  );

  const sendVerifyCode = useCallback(async () => {
    if (!profileInfo.verifyCode.disabled || isVerified) return;
    else if (user?.email === profileInfo.email.value) {
      toast.error("이메일을 변경하고 시도해주세요.");
      return;
    }

    // 이메일 전송 API 구현
    try {
      setIsSending(true);
      const response = await sendVerifyCodeAPI({
        email: profileInfo.email.value,
      });

      if (response.status === 200) {
        const {
          ["email"]: emailField,
          ["verifyCode"]: verifyCodeField,
          ...prev
        } = profileInfo;

        setProfileInfo({
          ...prev,
          email: {
            ...emailField,
            disabled: true,
          },
          verifyCode: {
            ...verifyCodeField,
            disabled: false,
          },
        });
      } else if (response.status === 40920) {
        toast.error("이미 가입된 이메일입니다.");
      } else if (response.status === 400) {
        toast.error(response.data);
      } else {
        toast.error("서버와의 통신 중 오류가 발생하였습니다.");
      }
    } catch (error) {
      toast.error("나중에 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  }, [isVerified, profileInfo, user?.email]);

  const checkVerifyCode = useCallback(async () => {
    if (profileInfo.verifyCode.disabled || isVerified) return;

    try {
      const response = await compareVerifyCode({
        email: profileInfo.email.value,
        verifyCode: profileInfo.verifyCode.value,
      });

      if (response.status === 200) {
        setIsVerified(true);
      } else if (response.status === 406) {
        toast.error("인증 번호가 맞지 않습니다.");
      } else {
        toast.error("나중에 다시 시도해주세요.");
      }
    } catch (error) {
      toast.error("서버와의 통신 중 오류가 발생하였습니다.");
    }
  }, [isVerified, profileInfo]);

  const handleCancel = useCallback(() => {
    setIsProfileDisabled(true);
    setIsVerified(false);

    setProfileInfo((prev: UserProfile) => {
      const {
        ["nickname"]: nicknameField,
        ["email"]: emailField,
        ["verifyCode"]: verifyCodeField,
      } = prev;

      return {
        ...prev,
        nickname: {
          ...nicknameField,
          value: user.nickname,
        },
        email: {
          ...emailField,
          value: user?.email,
          disabled: true,
        },
        verifyCode: {
          ...verifyCodeField,
          value: "",
          disabled: true,
        },
      };
    });
  }, [user.email, user.nickname]);

  const handleUpdateBtn = useCallback(() => {
    setIsProfileDisabled((prev) => {
      return !prev;
    });
    setProfileInfo((prev) => {
      const { ["email"]: emailField, ...rest } = prev;

      return {
        ...rest,
        email: {
          ...emailField,
          disabled: false,
        },
      };
    });
  }, []);

  useEffect(() => {
    if (!state) return;

    if (state.status === 200) {
      toast.success("정보를 성공적으로 변경하였습니다.");
      setIsVerified(false);
      setIsProfileDisabled(true);
      setProfileInfo((prev: UserProfile) => {
        const user = state.data as User;
        const {
          ["nickname"]: nicknameField,
          ["email"]: emailField,
          ["verifyCode"]: verifyCodeField,
          ...rest
        } = prev;

        return {
          ...rest,
          nickname: {
            ...nicknameField,
            value: user.nickname,
          },
          email: {
            ...emailField,
            value: user.email,
            disabled: true,
          },
          verifyCode: {
            ...verifyCodeField,
            value: "",
            disabled: true,
          },
        } as UserProfile;
      });
      mutate(UserKeys.getUser);
    } else {
      toast.error((state.data as string) || "서버 에러가 발생하였습니다.");
    }
  }, [state, mutate]);

  useEffect(() => {
    if (!user) return;

    setProfileInfo((prev) => {
      const {
        ["nickname"]: nicknameField,
        ["email"]: emailField,
        ...rest
      } = prev;

      return {
        ...rest,
        nickname: {
          ...nicknameField,
          value: user.nickname,
        },
        email: {
          ...emailField,
          value: user.email,
        },
      };
    });
  }, [user]);

  useEffect(() => {
    if (profileInfo.email.value !== user.email) {
      setIsChangeEmail(true);
    } else {
      setIsChangeEmail(false);
    }
  }, [profileInfo.email.value, user.email]);

  useEffect(() => {
    if (profileInfo.nickname.value !== user.nickname) {
      setIsChangeNickname(true);
    } else {
      setIsChangeNickname(false);
    }
  }, [profileInfo.nickname.value, user.nickname]);

  return (
    <>
      <Spinner isVisible={isSending} isPage />
      <form className={styles.form} action={formAction}>
        <input type="hidden" name="userId" value={user.userId} />
        <div className={styles.profile}>
          <label htmlFor="profile">
            <Image
              src={
                profileImg
                  ? `${IMAGE_URL}/${profileImg}`
                  : "/svgs/user_profile_default.svg"
              }
              alt="프로필 사진"
              width={96}
              height={96}
              className={styles.profileImg}
            />
            <div className={styles.edit}>
              <Image
                src="/svgs/edit_pencil.svg"
                alt="프로필 사진 변경 아이콘"
                width={25}
                height={25}
              />
            </div>
          </label>
          <input
            type="file"
            id="profile"
            accept="image/jpeg, image/png, image/svg+xml"
            onChange={handleProfileImg}
          />
        </div>
        <Input
          title="닉네임"
          name="nickname"
          type="text"
          value={profileInfo.nickname.value}
          disabled={isProfileDisabled}
          onChange={(changedValue: string) =>
            handleProfileInfo(changedValue, "nickname")
          }
          minLength={2}
          maxLength={8}
          required
        />
        {isProfileDisabled && !isVerified ? (
          <Input
            title="이메일"
            name="email"
            type="email"
            value={profileInfo.email.value}
            disabled={profileInfo.email.disabled}
            onChange={(changedValue: string) =>
              handleProfileInfo(changedValue, "email")
            }
          />
        ) : (
          <EmailVerify
            emailInfo={profileInfo as EmailInfo}
            isVerified={isVerified}
            onChange={(changedValue: string, name: string) =>
              handleProfileInfo(changedValue, name as UserProfileKeys)
            }
            onSend={sendVerifyCode}
            onCheck={checkVerifyCode}
          />
        )}
        <div className={styles.btnBox}>
          {isProfileDisabled ? (
            <input
              type="button"
              value="수정"
              onClick={handleUpdateBtn}
              className={`${styles.update} ${notosansBold.className}`}
            />
          ) : (
            <>
              <input
                type="button"
                className={`${styles.cancel} ${notosansBold.className}`}
                value="취소"
                onClick={handleCancel}
              />
              <SubmitButton
                btnTitle="수정"
                pendingTitle="수정 중"
                className={`${styles.update} ${notosansBold.className}`}
              />
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default UserProfileForm;
