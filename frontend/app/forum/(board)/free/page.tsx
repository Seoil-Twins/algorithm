import { BOARD_TYPE } from "@/types2/constants";

import { getBoards } from "@/app/actions/baord";

import NotFound from "@/components/common/notFound";
import Pagination from "@/components/common/pagination";
import Table from "@/components/forum/table";

const Free = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const page = Number(searchParams?.page) || 1;
  const count = Number(searchParams?.count) || 10;
  const keyword = searchParams?.keyword;

  const boardResponse = await getBoards({
    count,
    page,
    kind: BOARD_TYPE.PUBLIC_FREE,
    keyword,
  });
  const boards = boardResponse.data;

  if (typeof boards === "string") {
    return (
      <NotFound
        title="서버와의 통신 중 에러가 발생하였습니다."
        description="나중에 다시 시도해주세요."
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

export default Free;
