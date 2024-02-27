import { getBoardTypes } from "@/app/actions/baord";
import { getMyQuestions } from "@/app/actions/user";
import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Question = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const boardTypes = await getBoardTypes();
  let questions;
  try {
    const responseQuestions = await getMyQuestions({ page, count });
    questions = responseQuestions.data;
  } catch (error) {
    questions = {
      results: [],
      totals: 0,
    };
  }

  return (
    <>
      <Table
        items={questions.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 질문이 없습니다."
      />
      <Pagination
        count={count}
        total={questions.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Question;
