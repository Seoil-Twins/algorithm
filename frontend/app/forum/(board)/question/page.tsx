import { ResponseBoard, getBoards } from "@/api/board";

import Table from "@/components/forum/table";

const All = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const page = Number(searchParams?.page) || 1;
  const count = Number(searchParams?.count) || 10;
  const keyword = searchParams?.keyword;

  const boards: ResponseBoard = await getBoards({
    count,
    page,
    kind: 1,
    keyword,
  });

  return (
    <div>
      <Table item={boards} />
    </div>
  );
};

export default All;
