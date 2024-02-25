import { getBoardTypes } from "@/app/actions/baord";
import { getMyFavorites } from "@/app/actions/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Answer = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;
  const boardTypes = await getBoardTypes();
  let favorites;
  try {
    const responseFavorites = await getMyFavorites({ page, count });
    favorites = responseFavorites.data;
  } catch (error) {
    favorites = {
      results: [],
      totals: 0,
    };
  }

  return (
    <>
      <Table
        items={favorites.results}
        boardTypes={boardTypes}
        errorTitle="좋아요한 게시글이 없습니다."
      />
      <Pagination
        count={count}
        total={favorites.totals}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Answer;
