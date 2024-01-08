import UserProfileForm from "@/components/mypage/account/userProfileForm";
import Content from "@/components/mypage/content";

const Account = () => {
  return (
    <>
      <Content title="프로필">
        <UserProfileForm />
      </Content>
      <Content title="계정 연동">하이 ㅋㅋ</Content>
      <Content title="계정 삭제">하이 ㅋㅋ</Content>
    </>
  );
};

export default Account;
