import { BoardType } from "@/types/constants";

import { BoardAPI } from "@/api/board";
import { BoardList } from "@/app/api/model/board";

import NotFound from "@/components/common/notFound";
import Pagination from "@/components/common/pagination";
import Table from "@/components/forum/table";

const All = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const page = Number(searchParams?.page) || 1;
  const count = Number(searchParams?.count) || 10;
  const keyword = searchParams?.keyword;

  let boards: BoardList;

  try {
    boards = await (
      await BoardAPI.getBoards({
        count,
        page,
        keyword,
        boardType: BoardType.PUBLIC_QUESTION,
      })
    ).json();

    if (boards.total <= 0) {
      return (
        <NotFound
          title="아직 게시된 게시물이 없습니다."
          description="새로운 게시물의 주인공이 되어보세요 !"
        />
      );
    }
  } catch (error) {
    return (
      <NotFound
        title="서버와의 통신 중 오류가 발생하였습니다."
        description="잠시 후 다시 시도해주세요."
      />
    );
  }

  return (
    <>
      <Table item={boards} />
      <Pagination
        current={page}
        total={boards.total}
        count={count}
        marginTop={25}
      />
    </>
  );
};

export default All;
