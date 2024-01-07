"use client";

import { SetStateAction, useCallback, useEffect, useState } from "react";
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

interface UserProfile {
  nickname?: string;
  email?: string;
}

type UserProfileKeys = keyof UserProfile;

type UserProfileError = {
  [key in UserProfileKeys]: ValidationError;
};

const Account = () => {
  const { user } = useAuth()!;
  const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    email: user?.email,
    nickname: user?.nickname,
  });
  const [errorInfo, setErrorInfo] = useState<UserProfileError>({
    email: {
      errMsg: "",
      isError: false,
    },
    nickname: {
      errMsg: "",
      isError: false,
    },
  });

  const handleProfileInfo = useCallback(
    (changedValue: string, name: UserProfileKeys) => {
      setProfileInfo((prev) => {
        return {
          ...prev,
          [name]: changedValue,
        };
      });
    },
    [profileInfo],
  );

  const validationProfile = useCallback(() => {
    let isValid = true;
    let newErrorInfo = {
      ...errorInfo,
    };
    const changeErrorInfo = (
      name: UserProfileKeys,
      isError: boolean,
      errMsg?: string,
    ) => {
      newErrorInfo = {
        ...newErrorInfo,
        [name]: {
          isError,
          errMsg,
        },
      };

      if (isError) isValid = false;
    };

    const isNicknameValid = validationNickname(profileInfo.nickname);
    changeErrorInfo(
      "nickname",
      isNicknameValid.isError,
      isNicknameValid.errMsg,
    );

    const isEmailValid = validationEmail(profileInfo.email);
    changeErrorInfo("email", isEmailValid.isError, isEmailValid.errMsg);

    setErrorInfo(newErrorInfo);
    return isValid;
  }, [profileInfo.nickname, profileInfo.email]);

  const handleSubmitProfile = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();

      const isValid = validationProfile();
      if (!isValid) return;

      const response = await updateProfileUser(
        profileInfo.nickname!,
        profileInfo.email!,
      );

      if (response.statusCode === 204) {
        const event = new Event("update");
        document.dispatchEvent(event);
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
        const event = new Event("update");
        document.dispatchEvent(event);
      } else {
        alert("에러 발생");
      }
    },
    [user?.profile],
  );

  const handleUpdateBtn = useCallback(() => {
    setIsProfileDisabled((prev) => {
      return !prev;
    });
  }, [isProfileDisabled]);

  useEffect(() => {
    if (!user) return;

    setProfileInfo({
      nickname: user.nickname,
      email: user.email,
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
                isError={errorInfo.nickname.isError}
                errorMsg={errorInfo.nickname.errMsg}
                onChange={(changedValue: string) =>
                  handleProfileInfo(changedValue, "nickname")
                }
              />
              <Input
                title="이메일"
                type="email"
                defaultValue={user.email}
                disabled={isProfileDisabled}
                isError={errorInfo.email.isError}
                errorMsg={errorInfo.email.errMsg}
                useEmailVerified
                isVerified={user.emailVerified}
                onChange={(changedValue: string) =>
                  handleProfileInfo(changedValue, "email")
                }
              />
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
          <Content title="비밀번호">div</Content>
          <Content title="계정 연동">하이 ㅋㅋ</Content>
          <Content title="계정 삭제">하이 ㅋㅋ</Content>
        </>
      ) : null}
    </>
  );
};

export default Account;
