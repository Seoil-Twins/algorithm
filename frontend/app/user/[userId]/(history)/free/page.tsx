import { getBoardTypes } from "@/api/board";
import { getMyFrees } from "@/api/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Free = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const frees = await getMyFrees({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table
        items={frees.data.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 자유 게시글이 없습니다."
      />
      <Pagination
        count={count}
        total={frees.data.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Free;
