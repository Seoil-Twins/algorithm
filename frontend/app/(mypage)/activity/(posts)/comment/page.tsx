import { getBoardTypes } from "@/app/actions/baord";
import { getMyComments } from "@/app/actions/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Comment = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const boardTypes = await getBoardTypes();
  let comments;
  try {
    const responseComment = await getMyComments({ page, count });
    comments = responseComment.data;
  } catch (error) {
    comments = {
      results: [],
      totals: 0,
    };
  }

  return (
    <>
      <Table
        items={comments.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 댓글이 없습니다."
      />
      <Pagination
        count={count}
        total={comments.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Comment;
