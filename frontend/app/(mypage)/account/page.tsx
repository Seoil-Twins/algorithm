import SnsAccount from "@/components/mypage/account/snsAccount";
import UserProfileForm from "@/components/mypage/account/userProfileForm";
import Withdrawal from "@/components/mypage/account/withdrawal";
import Content from "@/components/mypage/content";

import { UserAPI } from "@/api/user";
import { SnsInfo, User } from "@/app/api/model/user";

const Account = async () => {
  const user: User = await (await UserAPI.getUser()).json();
  const snsInfo: SnsInfo = await (await UserAPI.getSnsInfo()).json();

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
