import { getSessionId } from "@/utils/serverSideSession";

const Mypage = async () => {
  const sessionId = await getSessionId();

  return <div>hi? {sessionId}</div>;
};

export default Mypage;
