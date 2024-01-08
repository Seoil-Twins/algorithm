"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import styles from "./account.module.scss";

import { useAuth } from "@/providers/AuthProvider";

import { updateProfileImg, updateProfileUser } from "@/api/user";

import Content from "@/components/mypage/content";
import Input from "@/components/common/input";
import { notosansBold } from "@/styles/_font";
import {
  ValidationError,
  validationEmail,
  validationNickname,
} from "@/utils/validation";

interface UserProfileProperty {
  nickname?: string;
  email?: string;
  verifyCode?: string;
}

type UserProfileKeys = keyof UserProfileProperty;

type UserProfile = {
  [key in UserProfileKeys]: {
    value: UserProfileProperty[key];
    disabled?: boolean;
  } & ValidationError;
};

const Account = () => {
  const { user, mutate } = useAuth()!;
  const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    email: {
      value: user?.email,
      isError: false,
      errMsg: "",
      disabled: false,
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
    [profileInfo],
  );

  const validationProfile = useCallback(() => {
    let isValid = true;
    let newProfileInfo: UserProfile = {
      ...profileInfo,
    };

    const changeErrorInfo = (
      name: UserProfileKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      const { [name]: updatedField } = profileInfo;

      newProfileInfo = {
        ...newProfileInfo,
        [name]: {
          ...updatedField,
          isError,
          errMsg,
        },
      };

      if (isError) isValid = false;
    };

    const isNicknameValid = validationNickname(profileInfo.nickname.value);
    changeErrorInfo(
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    );

    const isEmailValid = validationEmail(profileInfo.email.value);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    if (!isVerified && user?.email != profileInfo.email.value)
      changeErrorInfo("verifyCode", true, "인증이 필요합니다.");

    setProfileInfo(newProfileInfo);
    return isValid;
  }, [profileInfo]);

  const handleSubmitProfile = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const isValid = validationProfile();
      if (!isValid) return;

      const response = await updateProfileUser(
        profileInfo.nickname.value!,
        profileInfo.email.value!,
      );

      if (response.statusCode === 204) {
        await mutate();
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
              disabled: false,
            },
            verifyCode: {
              ...verifyCodeField,
              disabled: true,
            },
          } as UserProfile;
        });
      } else {
        alert("에러 발생");
      }

      setIsProfileDisabled(true);
    },
    [profileInfo],
  );

  const handleProfileImg = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !user) return;

      const profile = files[0];
      const response = await updateProfileImg(profile);

      if (response.statusCode === 204) {
        await mutate();
      } else {
        alert("에러 발생");
      }
    },
    [user?.profile],
  );

  const sendVerifyCode = useCallback(() => {
    if (!profileInfo.verifyCode.disabled || isVerified) return;
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
        disabled: true,
      },
      verifyCode: {
        ...verifyCodeField,
        disabled: false,
      },
    });
  }, [profileInfo]);

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
  }, [profileInfo]);

  const handleUpdateBtn = useCallback(() => {
    setIsProfileDisabled((prev) => {
      return !prev;
    });
  }, [isProfileDisabled]);

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
      {user ? (
        <>
          <Content title="프로필">
            <form className={styles.form} onSubmit={handleSubmitProfile}>
              <div className={styles.profile}>
                <label htmlFor="profile">
                  <Image
                    src={
                      user.profile
                        ? user.profile
                        : "/svgs/user_profile_default.svg"
                    }
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
                defaultValue={user.nickname}
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
                  defaultValue={user.email}
                  disabled={profileInfo.email.disabled}
                  isError={profileInfo.email.isError}
                  errorMsg={profileInfo.email.errMsg}
                  onChange={(changedValue: string) =>
                    handleProfileInfo(changedValue, "email")
                  }
                />
              ) : (
                <>
                  <div className={styles.flexBox}>
                    <Input
                      title="이메일"
                      type="email"
                      defaultValue={user.email}
                      disabled={isProfileDisabled}
                      isError={profileInfo.email.isError}
                      errorMsg={profileInfo.email.errMsg}
                      onChange={(changedValue: string) =>
                        handleProfileInfo(changedValue, "email")
                      }
                    />
                    <button
                      type="button"
                      className={`
            ${
              profileInfo.email.disabled ? styles.disabledBtn : styles.activeBtn
            }
            ${styles.codeBtn}
          `}
                      onClick={sendVerifyCode}
                    >
                      인증 번호 발송
                    </button>
                  </div>
                  <div>
                    <Input
                      placeholder="인증 번호 입력"
                      length={6}
                      disabled={profileInfo.verifyCode.disabled}
                      isError={profileInfo.verifyCode.isError}
                      errorMsg={profileInfo.verifyCode.errMsg}
                      onChange={(changedValue: string) =>
                        handleProfileInfo(changedValue, "verifyCode")
                      }
                    />
                  </div>
                  <button
                    type="button"
                    className={`${
                      profileInfo.verifyCode.disabled
                        ? styles.disabledBtn
                        : styles.activeBtn
                    }
                    ${isVerified && styles.verifiedBtn}
                    ${styles.verifyBtn}`}
                    onClick={checkVerifyCode}
                  >
                    {isVerified ? "인증 완료" : "인증 번호 확인"}
                  </button>
                </>
              )}
              <div className={styles.btnBox}>
                {isProfileDisabled ? (
                  <input
                    type="button"
                    value="수정"
                    onClick={handleUpdateBtn}
                    className={`${styles.btn} ${styles.update} ${notosansBold.className}`}
                  />
                ) : (
                  <>
                    <input
                      type="button"
                      className={`${styles.btn} ${styles.cancel} ${notosansBold.className}`}
                      value="취소"
                    />
                    <button
                      type="submit"
                      className={`${styles.btn} ${styles.update} ${notosansBold.className}`}
                    >
                      수정
                    </button>
                  </>
                )}
              </div>
            </form>
          </Content>
          <Content title="계정 연동">하이 ㅋㅋ</Content>
          <Content title="계정 삭제">하이 ㅋㅋ</Content>
        </>
      ) : null}
    </>
  );
};

export default Account;
