import BoardDetail from "@/components/detail/boardDetail";

type BoardParams = {
  boardId: number;
};

const Board = async ({ params }: { params: BoardParams }) => {
  const boardId = params.boardId;

  return <BoardDetail boardId={boardId} />;
};

export default Board;
