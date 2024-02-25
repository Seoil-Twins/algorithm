import { getBoardTypes } from "@/app/actions/baord";
import { getMyAnswers } from "@/app/actions/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Answer = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const boardTypes = await getBoardTypes();
  const responseAnswers = await getMyAnswers({ page, count });
  let answers = [];
  if (responseAnswers.status === 200) {
    answers = responseAnswers.data;
  }

  return (
    <>
      <Table
        items={answers.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 답변이 없습니다."
      />
      <Pagination
        count={count}
        total={answers.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Answer;
