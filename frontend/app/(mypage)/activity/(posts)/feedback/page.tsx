import { getBoardTypes } from "@/app/actions/baord";
import { getMyFeedbacks } from "@/app/actions/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Feedback = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const boardTypes = await getBoardTypes();
  let feedbacks;
  try {
    const responseFeedbacks = await getMyFeedbacks({ page, count });
    feedbacks = responseFeedbacks.data;
  } catch (error) {
    feedbacks = {
      results: [],
      totals: 0,
    };
  }

  return (
    <>
      <Table
        items={feedbacks.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 피드백이 없습니다."
      />
      <Pagination
        count={count}
        total={feedbacks.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Feedback;
