"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AxiosError } from "axios";
import { useSWRConfig } from "swr";

import { notosansBold } from "@/styles/_font";
import styles from "./userProfileForm.module.scss";

import { User } from "@/interfaces/user";

import {
  updateProfileImg,
  updateProfileUser,
  sendVerifyCode as sendVerifyCodeAPI,
  compareVerifyCode,
  UserKeys,
} from "@/api/user";
import { IMAGE_URL } from "@/api";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";
import Spinner from "@/components/common/spinner";

import {
  ValidationError,
  changeErrorInfo,
  validationEmail,
  validationNickname,
} from "@/utils/validation";
import { useSession } from "next-auth/react";

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
  const { mutate } = useSWRConfig();
  const { update } = useSession();

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
  const [isSending, setIsSending] = useState<boolean>(false);

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

      try {
        const data: { email?: string; nickname?: string } = {};

        if (user.nickname !== profileInfo.nickname.value) {
          data.nickname = profileInfo.nickname.value;
        }
        if (user.email !== profileInfo.email.value && isVerified) {
          data.email = profileInfo.email.value;
        }

        const response = await updateProfileUser(user.userId, data);

        if (response.status === 200) {
          setIsVerified(false);
          setProfileInfo((prev: UserProfile) => {
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
                value: response.data.nickname,
              },
              email: {
                ...emailField,
                value: response.data.email,
                disabled: true,
              },
              verifyCode: {
                ...verifyCodeField,
                value: "",
                disabled: true,
              },
            } as UserProfile;
          });

          update({
            user: {
              nickname: response.data.nickname,
              email: response.data.email,
            },
          });
          await mutate(UserKeys.getUser);
        }

        setIsProfileDisabled(true);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.data.errorCode === 40910) {
            const { ["nickname"]: nicknameField, ...prev } = profileInfo;
            setProfileInfo({
              ...prev,
              nickname: {
                ...nicknameField,
                errMsg: "중복된 닉네임입니다.",
                isError: true,
              },
            });
          }
        } else {
          alert(
            "알 수 없는 오류가 발생하였습니다.\n 나중에 다시 시도해주세요.",
          );
        }
      }
    },
    [
      profileInfo,
      user.nickname,
      user.email,
      user.userId,
      isVerified,
      update,
      mutate,
      validationProfile,
    ],
  );

  const handleProfileImg = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !user) return;

      const profile = files[0];

      try {
        const response = await updateProfileImg(user.userId, {
          image: profile,
        });

        if (response.status === 200) {
          await update({
            profile: response.data.profile,
          });
          setProfileImg(response.data.profile);
        }
      } catch (error) {
        alert("나중에 다시 시도해주세요.");
      }
    },
    [user],
  );

  const sendVerifyCode = useCallback(async () => {
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
    try {
      setIsSending(true);
      await sendVerifyCodeAPI({
        email: profileInfo.email.value,
      });
      setIsSending(false);

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
    } catch (error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.errorCode === 40920
      ) {
        const { ["email"]: emailField, ...prev } = profileInfo;

        setProfileInfo({
          ...prev,
          email: {
            ...emailField,
            isError: true,
            errMsg: "중복된 이메일입니다.",
          },
        });
      } else {
        alert("나중에 다시 시도해주세요.");
      }
    } finally {
      setIsSending(false);
    }
  }, [isVerified, profileInfo, user?.email]);

  const checkVerifyCode = useCallback(async () => {
    if (profileInfo.verifyCode.disabled || isVerified) return;

    let isError = false;
    let errMsg = "인증 번호가 맞지 않습니다.";
    const { ["verifyCode"]: verifyCodeField, ...prev } = profileInfo;

    try {
      const response = await compareVerifyCode({
        email: profileInfo.email.value,
        verifyCode: profileInfo.verifyCode.value,
      });

      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          isError = true;
          errMsg = "인증 번호가 맞지 않습니다.";
        } else if (error.response?.status === 500) {
          isError = true;
          errMsg =
            "예상치 못한 오류가 발생하였습니다.\n나중에 다시 시도해주세요.";
        }
      }
    }

    setProfileInfo({
      ...prev,
      verifyCode: {
        ...verifyCodeField,
        isError,
        errMsg,
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
      <Spinner isVisible={isSending} isPage />
      <form className={styles.form} onSubmit={handleSubmitProfile}>
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
