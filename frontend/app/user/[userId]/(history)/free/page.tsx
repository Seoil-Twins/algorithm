import { BoardAPI } from "@/api/board";
import { UserAPI } from "@/api/user";
import { BoardTypeItem, MyBoardIntro } from "@/app/api/model/board";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

type PageParams = {
  userId: number;
};

const Free = async ({
  params,
  searchParams,
}: {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;

  const boardTypes: BoardTypeItem[] = (
    await (await BoardAPI.getBoardTypes()).json()
  ).types;
  const free: MyBoardIntro = await (
    await UserAPI.getMyFree(params.userId.toString(), page, count)
  ).json();

  return (
    <>
      <Table
        boardTypes={boardTypes}
        items={free.boards}
        total={free.total}
        errorTitle="작성하신 자유 게시글이 없습니다."
      />
      <Pagination
        count={count}
        total={free.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Free;
