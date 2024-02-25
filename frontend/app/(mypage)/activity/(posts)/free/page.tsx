import { getBoardTypes } from "@/app/actions/baord";
import { getMyFrees } from "@/app/actions/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Free = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const boardTypes = await getBoardTypes();
  let frees;
  try {
    const responseFrees = await getMyFrees({ page, count });
    frees = responseFrees.data;
  } catch (error) {
    frees = {
      results: [],
      totals: 0,
    };
  }

  return (
    <>
      <Table
        items={frees.results}
        boardTypes={boardTypes}
        errorTitle="작성하신 자유 게시글이 없습니다."
      />
      <Pagination
        count={count}
        total={frees.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Free;
