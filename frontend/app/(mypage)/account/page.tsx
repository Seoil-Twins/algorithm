import { AxiosError } from "axios";
import { redirect } from "next/navigation";

import { User } from "@/types/user";

import { getUser, getUserSNSInfo } from "@/app/actions/user";

import SnsAccount from "@/components/mypage/account/snsAccount";
import UserProfileForm from "@/components/mypage/account/userProfileForm";
import Withdrawal from "@/components/mypage/account/withdrawal";
import Content from "@/components/mypage/content";

const Account = async () => {
  const responseUser = await getUser();
  if (responseUser.status !== 200) {
    redirect("/login");
  }
  const user = responseUser.data as User;

  const responseSnsInfo = await getUserSNSInfo(user.userId);
  if (responseSnsInfo.status !== 200) {
    redirect("/login");
  }
  const snsInfo = responseSnsInfo.data;

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
