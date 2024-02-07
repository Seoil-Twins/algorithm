import { getBoardTypes, getMyFree } from "@/api/board";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Free = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const frees = await getMyFree({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table items={frees.contents} boardTypes={boardTypes} />
      <Pagination
        count={count}
        total={frees.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Free;
