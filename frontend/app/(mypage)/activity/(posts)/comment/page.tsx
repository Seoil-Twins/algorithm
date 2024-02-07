import { getBoardTypes, getMyComments } from "@/api/board";

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
      <Table items={comments.contents} boardTypes={boardTypes} />
      <Pagination
        count={count}
        total={comments.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Comment;
