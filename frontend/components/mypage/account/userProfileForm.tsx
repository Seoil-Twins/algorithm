"use client";

import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import Image from "next/image";
import { useSWRConfig } from "swr";
import toast from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import { SWRKeys } from "@/types/constants";

import { User } from "@/app/api/model/user";

import { IMAGE_URL } from "@/api";
import { UserAPI } from "@/api/user";
import { CustomException } from "@/app/api";

import { notosansBold } from "@/styles/_font";
import styles from "./userProfileForm.module.scss";

import Input from "@/components/common/input";
import EmailVerify, { EmailInfo } from "@/components/common/emailVerify";
import Spinner from "@/components/common/spinner";
import SubmitButton from "@/components/common/submitButton";

import { validationEmail, validationNickname } from "@/utils/validation";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [isProfileDisabled, setIsProfileDisabled] = useState<boolean>(true);
  const [profileInfo, setProfileInfo] = useState<UserProfile>({
    email: {
      value: user.email,
      disabled: true,
    },
    nickname: {
      value: user.nickname,
      disabled: true,
    },
    verifyCode: {
      value: "",
      disabled: true,
    },
  });
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isChangeNickname, setIsChangeNickname] = useState<boolean>(false);
  const [isChangeEmail, setIsChangeEmail] = useState<boolean>(false);

  const handleUpdateProfileInfo = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (isChangeEmail && !isVerified) {
        toast.error("이메일 인증을 진행해주세요.");
        return;
      }

      const validatedNickname = validationNickname(profileInfo.nickname.value);
      const validatedEmail = validationEmail(profileInfo.email.value);

      if (!isChangeNickname && !isChangeEmail) {
        return;
      }
      if (isChangeNickname && validatedNickname.isError) {
        toast.error(validatedNickname.errMsg);
        return;
      }
      if (isChangeEmail && validatedEmail.isError) {
        toast.error(validatedEmail.errMsg);
        return;
      }

      try {
        setIsPending(true);

        const response = await UserAPI.updateProfile({
          email: isChangeEmail ? profileInfo.email.value : null,
          nickname: isChangeNickname ? profileInfo.nickname.value : null,
        });

        toast.success("정보를 성공적으로 변경하였습니다.");
        setIsVerified(false);
        setIsProfileDisabled(true);
        setIsChangeEmail(false);
        setIsChangeNickname(false);
        mutate(SWRKeys.getUser);

        const {
          ["nickname"]: nicknameField,
          ["email"]: emailField,
          ...prev
        } = profileInfo;

        setProfileInfo({
          ...prev,
          nickname: {
            ...nicknameField,
            disabled: true,
          },
          email: {
            ...emailField,
            disabled: true,
          },
          verifyCode: {
            value: "",
            disabled: true,
          },
        });
      } catch (error) {
        const exception: CustomException = error as CustomException;
        toast.error(exception.message);
      } finally {
        setIsPending(false);
      }
    },
    [isChangeEmail, isVerified, profileInfo, isChangeNickname, mutate],
  );

  const handleProfileImg = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || !user) return;

      const profile = files[0];
      const formData = new FormData();
      formData.append("profile", profile);

      try {
        const response = await UserAPI.updateProfileImage(formData);
        toast.success("정상적으로 변경하였습니다.");
        router.refresh();
        mutate(SWRKeys.getUser);
      } catch (error) {
        const exception: CustomException = error as CustomException;
        toast.error(exception.message);
      }
    },
    [user, router, mutate],
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

  const sendVerifyCode = useDebouncedCallback(
    useCallback(async () => {
      if (!profileInfo.verifyCode.disabled || isVerified) return;
      else if (user?.email === profileInfo.email.value) {
        toast.error("이메일을 변경하고 시도해주세요.");
        return;
      }

      try {
        setIsSending(true);

        const response = await UserAPI.sendVerfiyCode({
          email: profileInfo.email.value,
        });

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
      } catch (error) {
        const exception: CustomException = error as CustomException;
        toast.error(exception.message);
      } finally {
        setIsSending(false);
      }
    }, [isVerified, profileInfo, user?.email]),
    500,
  );

  const checkVerifyCode = useDebouncedCallback(
    useCallback(async () => {
      if (profileInfo.verifyCode.disabled || isVerified) return;

      try {
        await UserAPI.compareVerifyCode({
          email: profileInfo.email.value,
          verifyCode: profileInfo.verifyCode.value,
        });
        setIsVerified(true);
      } catch (error) {
        const exception: CustomException = error as CustomException;
        toast.error(exception.message);
      }
    }, [isVerified, profileInfo]),
    500,
  );

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
      <form className={styles.form} onSubmit={handleUpdateProfileInfo}>
        <input type="hidden" name="userId" value={user.userId} />
        <div className={styles.profile}>
          <label htmlFor="profile">
            <Image
              src={`${IMAGE_URL}/${user.profile}`}
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
          maxLength={10}
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
                isPending={isPending}
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
