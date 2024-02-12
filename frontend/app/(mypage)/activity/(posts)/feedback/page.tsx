import { getBoardTypes } from "@/api/board";
import { getMyFeedbacks } from "@/api/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Feedback = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const feedbacks = await getMyFeedbacks({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table
        items={feedbacks.data.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 피드백이 없습니다."
      />
      <Pagination
        count={count}
        total={feedbacks.data.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Feedback;
