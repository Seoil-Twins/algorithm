import BoardDetail from "@/components/detail/boardDetail";

type BoardParams = {
  boardId: number;
};

const Board = async ({
  params,
  searchParams,
}: {
  params: BoardParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const boardId = params.boardId;
  const page = Number(searchParams?.page) || 1;
  const count = Number(searchParams?.count) || 10;

  return <BoardDetail boardId={boardId} page={page} count={count} />;
};

export default Board;
