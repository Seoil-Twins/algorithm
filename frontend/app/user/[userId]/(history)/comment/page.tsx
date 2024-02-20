import { getBoardTypes } from "@/api/board";
import { getMyComments } from "@/api/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Comment = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const comments = await getMyComments({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table
        items={comments.data.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 댓글이 없습니다."
      />
      <Pagination
        count={count}
        total={comments.data.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Comment;
