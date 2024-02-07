import Image from "next/image";

import styles from "./account.module.scss";

import { getUser, getUserSNSInfo } from "@/api/user";

import { getSessionId } from "@/utils/serverSideSession";

import SnsAccount from "@/components/mypage/account/snsAccount";
import UserProfileForm from "@/components/mypage/account/userProfileForm";
import Withdrawal from "@/components/mypage/account/withdrawal";
import Content from "@/components/mypage/content";

const Account = async () => {
  const sessionId = await getSessionId();
  const user = await getUser(sessionId);
  const snsInfo = await getUserSNSInfo(sessionId);

  if (!user || !snsInfo) {
    return (
      <div className={styles.error}>
        <Image
          src="/svgs/internal_server_error.svg"
          alt="서버 오류 발생"
          width={0}
          height={0}
          className={styles.dynamicImg}
        />
        <p>
          서버에서 알 수 없는 오류가 발생하였습니다.{" "}
          <span className={styles.emphasis}>로그아웃</span> 후 다시
          시도해주세요.
        </p>
      </div>
    );
  }

  return (
    <>
      <Content title="프로필">
        <UserProfileForm user={user} />
      </Content>
      <Content title="계정 연동">
        <SnsAccount sns={snsInfo} />
      </Content>
      <Content title="계정 삭제">
        <Withdrawal />
      </Content>
    </>
  );
};

export default Account;
