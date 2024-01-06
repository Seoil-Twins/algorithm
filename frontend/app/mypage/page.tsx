import Link from "next/link";

const Mypage = async () => {
  return (
    <div>
      <Link href="/mypage?test=test1" shallow>
        하이?
      </Link>
    </div>
  );
};

export default Mypage;
