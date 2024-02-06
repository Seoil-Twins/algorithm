"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { notosansBold } from "@/styles/_font";
import styles from "./userProfileForm.module.scss";

import { User } from "@/interfaces/user";

import { updateProfileImg, updateProfileUser } from "@/api/user";

import { useAuth } from "@/providers/authProvider";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";

import {
  ValidationError,
  changeErrorInfo,
  validationEmail,
  validationNickname,
} from "@/utils/validation";

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
  } & ValidationError;
};

type UserProfileProps = {
  user: User;
};

const UserProfileForm = ({ user }: UserProfileProps) => {
  const { mutate } = useAuth()!;

  const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    email: {
      value: user?.email,
      isError: false,
      errMsg: "",
      disabled: true,
    },
    nickname: {
      value: user?.nickname,
      isError: false,
      errMsg: "",
    },
    verifyCode: {
      value: "",
      errMsg: "인증 번호가 맞지 않습니다.",
      isError: false,
      disabled: true,
    },
  });
  const [profileImg, setProfileImg] = useState<string | undefined>(
    user.profile,
  );
  const [isVerified, setIsVerified] = useState<boolean>(false);

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

  const validationProfile = useCallback(() => {
    let isValid = true;
    let newProfileInfo: UserProfile = {
      ...profileInfo,
    };

    const isNicknameValid = validationNickname(profileInfo.nickname.value);
    newProfileInfo = changeErrorInfo<UserProfile, "nickname">(
      newProfileInfo,
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    ) as UserProfile;

    const isEmailValid = validationEmail(profileInfo.email.value);
    newProfileInfo = changeErrorInfo<UserProfile, "email">(
      newProfileInfo,
      "email",
      isEmailValid.isError,
      isEmailValid.errMsg,
    ) as UserProfile;

    const isNotVerifiedEmail =
      !isVerified && user?.email != profileInfo.email.value;
    if (isNotVerifiedEmail) {
      newProfileInfo = changeErrorInfo<UserProfile, "verifyCode">(
        newProfileInfo,
        "verifyCode",
        true,
        "인증이 필요합니다.",
      ) as UserProfile;
    }

    if (isNicknameValid.isError || isEmailValid.isError || isNotVerifiedEmail)
      isValid = false;

    setProfileInfo(newProfileInfo);
    return isValid;
  }, [isVerified, profileInfo, user?.email]);

  const handleSubmitProfile = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const isValid = validationProfile();
      if (!isValid) {
        profileInfo.nickname.value = user.nickname;
        profileInfo.email.value = user.email;
        return;
      }

      const response = await updateProfileUser(
        profileInfo.nickname.value!,
        profileInfo.email.value!,
      );

      if (response.statusCode === 204) {
        setIsVerified(false);
        setProfileInfo((prev: UserProfile) => {
          const {
            ["email"]: emailField,
            ["verifyCode"]: verifyCodeField,
            ...rest
          } = prev;

          return {
            ...rest,
            email: {
              ...emailField,
              disabled: true,
            },
            verifyCode: {
              ...verifyCodeField,
              value: "",
              disabled: true,
            },
          } as UserProfile;
        });

        await mutate();
      } else {
        alert("에러 발생");
      }

      setIsProfileDisabled(true);
    },
    [
      validationProfile,
      profileInfo.nickname,
      profileInfo.email,
      user.nickname,
      user.email,
      mutate,
    ],
  );

  const handleProfileImg = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !user) return;

      const profile = files[0];
      const response = await updateProfileImg(profile);

      if (response.statusCode === 204) {
        setProfileImg(URL.createObjectURL(profile));
        await mutate();
      } else {
        alert("에러 발생");
      }
    },
    [user, mutate],
  );

  const sendVerifyCode = useCallback(() => {
    const changeErrorInfo = (
      name: UserProfileKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      const { [name]: updatedField } = profileInfo;
      const newProfileInfo = {
        ...profileInfo,
        [name]: {
          ...updatedField,
          isError,
          errMsg,
        },
      };

      return newProfileInfo;
    };

    const isEmailValid = validationEmail(profileInfo.email.value);

    if (isEmailValid.isError) {
      const newProfileInfo = changeErrorInfo(
        "email",
        isEmailValid.isError,
        isEmailValid.errMsg,
      );
      setProfileInfo(newProfileInfo);
      return;
    } else if (!profileInfo.verifyCode.disabled || isVerified) return;
    else if (user?.email === profileInfo.email.value) return;

    // 이메일 전송 API 구현
    const {
      ["email"]: emailField,
      ["verifyCode"]: verifyCodeField,
      ...prev
    } = profileInfo;

    setProfileInfo({
      ...prev,
      email: {
        ...emailField,
        isError: false,
        errMsg: "",
        disabled: true,
      },
      verifyCode: {
        ...verifyCodeField,
        disabled: false,
      },
    });
  }, [isVerified, profileInfo, user?.email]);

  const checkVerifyCode = useCallback(() => {
    if (profileInfo.verifyCode.disabled || isVerified) return;

    let isError = false;
    const { ["verifyCode"]: verifyCodeField, ...prev } = profileInfo;

    if (profileInfo.verifyCode.value === "1234") {
      setIsVerified(true);
    } else {
      isError = true;
    }

    setProfileInfo({
      ...prev,
      verifyCode: {
        ...verifyCodeField,
        isError,
        errMsg: "인증 번호가 맞지 않습니다.",
      },
    });
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

      console.log(user.nickname);

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
          isError: false,
        },
        verifyCode: {
          ...verifyCodeField,
          value: "",
          disabled: true,
          isError: false,
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

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmitProfile}>
        <div className={styles.profile}>
          <label htmlFor="profile">
            <Image
              src={profileImg ? profileImg : "/svgs/user_profile_default.svg"}
              alt="유저 프로필 사진"
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
          value={profileInfo.nickname.value}
          disabled={isProfileDisabled}
          isError={profileInfo.nickname.isError}
          errorMsg={profileInfo.nickname.errMsg}
          onChange={(changedValue: string) =>
            handleProfileInfo(changedValue, "nickname")
          }
        />
        {isProfileDisabled && !isVerified ? (
          <Input
            title="이메일"
            type="email"
            value={profileInfo.email.value}
            disabled={profileInfo.email.disabled}
            isError={profileInfo.email.isError}
            errorMsg={profileInfo.email.errMsg}
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
              <button
                type="submit"
                className={`${styles.update} ${notosansBold.className}`}
              >
                수정
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default UserProfileForm;
