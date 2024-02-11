import { getUser, getUserSNSInfo } from "@/api/user";

import SnsAccount from "@/components/mypage/account/snsAccount";
import UserProfileForm from "@/components/mypage/account/userProfileForm";
import Withdrawal from "@/components/mypage/account/withdrawal";
import Content from "@/components/mypage/content";

const Account = async () => {
  const user = await getUser();
  const snsInfo = await getUserSNSInfo(user.data.userId);

  return (
    <>
      <Content title="프로필">
        <UserProfileForm user={user.data} />
      </Content>
      <Content title="계정 연동">
        <SnsAccount sns={snsInfo.data} />
      </Content>
      <Content title="계정 삭제">
        <Withdrawal />
      </Content>
    </>
  );
};

export default Account;
