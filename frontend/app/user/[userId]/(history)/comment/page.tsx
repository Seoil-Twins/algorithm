import { BoardAPI } from "@/api/board";
import { UserAPI } from "@/api/user";
import { BoardTypeItem, MyBoardIntro } from "@/app/api/model/board";
import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

type PageParams = {
  userId: number;
};

const Comment = async ({
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
  const comment: MyBoardIntro = await (
    await UserAPI.getMyComment(params.userId.toString(), page, count)
  ).json();

  return (
    <>
      <Table
        boardTypes={boardTypes}
        items={comment.comments}
        total={comment.total}
        errorTitle="작성하신 댓글이 없습니다."
      />
      <Pagination
        count={count}
        total={comment.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Comment;
