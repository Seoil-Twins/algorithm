import { getBoardTypes } from "@/api/board";
import { getMyQuestions } from "@/api/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Question = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const questions = await getMyQuestions({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table
        items={questions.data.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 질문이 없습니다."
      />
      <Pagination
        count={count}
        total={questions.data.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Question;
