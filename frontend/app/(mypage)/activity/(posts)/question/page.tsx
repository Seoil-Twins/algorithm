import { BoardAPI } from "@/api/board";
import { UserAPI } from "@/api/user";
import { BoardType, BoardTypeItem, MyBoardIntro } from "@/app/api/model/board";
import { User } from "@/app/api/model/user";

import Pagination from "@/components/common/pagination";
import Table from "@/components/mypage/activity/table";

const Question = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;

  const boardTypes: BoardTypeItem[] = (
    (await (await BoardAPI.getBoardTypes()).json()) as BoardType
  ).types;
  const user: User = (await (await UserAPI.getUser()).json()) as User;
  const question: MyBoardIntro = (await (
    await UserAPI.getMyQuestion(user.userId.toString(), page, count)
  ).json()) as MyBoardIntro;

  return (
    <>
      <Table
        boardTypes={boardTypes}
        items={question.boards}
        total={question.total}
        errorTitle="작성하신 질문이 없습니다."
      />
      <Pagination
        count={count}
        total={question.total}
        current={page}
        marginTop={25}
      />
    </>
  );
};

export default Question;
