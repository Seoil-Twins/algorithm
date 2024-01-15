import { getBoardTypes, getMyQuestions } from "@/api/board";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Question = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const questions = await getMyQuestions({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table items={questions.contents} boardTypes={boardTypes} />
      <Pagination
        count={count}
        total={questions.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Question;
