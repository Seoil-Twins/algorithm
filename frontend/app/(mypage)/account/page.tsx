import SnsAccount from "@/components/mypage/account/snsAccount";
import UserProfileForm from "@/components/mypage/account/userProfileForm";
import Withdrawal from "@/components/mypage/account/withdrawal";
import Content from "@/components/mypage/content";

const Account = () => {
  return (
    <>
      <Content title="프로필">
        <UserProfileForm />
      </Content>
      <Content title="계정 연동">
        <SnsAccount />
      </Content>
      <Content title="계정 삭제">
        <Withdrawal />
      </Content>
    </>
  );
};

export default Account;
