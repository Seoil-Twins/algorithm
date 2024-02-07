import { getBoardTypes, getMyFavorites } from "@/api/board";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Answer = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const favorites = await getMyFavorites({ page, count });
  const boardTypes = await getBoardTypes();

  return (
    <>
      <Table items={favorites.contents} boardTypes={boardTypes} />
      <Pagination
        count={count}
        total={favorites.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Answer;
