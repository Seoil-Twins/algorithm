import { getBoardTypes } from "@/api/board";
import { getMyFavorites } from "@/api/user";

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
      <Table
        items={favorites.data.results}
        boardTypes={boardTypes}
        errorTitle="좋아요한 게시글이 없습니다."
      />
      <Pagination
        count={count}
        total={favorites.data.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Answer;
