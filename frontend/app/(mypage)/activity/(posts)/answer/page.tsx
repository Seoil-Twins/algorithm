import { getBoardTypes } from "@/api/board";
import { getMyAnswers } from "@/api/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Answer = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const answers = await getMyAnswers({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table
        items={answers.data.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 답변이 없습니다."
      />
      <Pagination
        count={count}
        total={answers.data.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Answer;
