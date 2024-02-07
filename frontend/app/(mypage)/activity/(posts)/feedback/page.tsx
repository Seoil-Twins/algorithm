import { getBoardTypes, getMyFeedbacks } from "@/api/board";

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
      <Table items={feedbacks.contents} boardTypes={boardTypes} />
      <Pagination
        count={count}
        total={feedbacks.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Feedback;
