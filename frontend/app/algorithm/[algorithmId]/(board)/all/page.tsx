import { BoardType } from "@/types/constants";
import Content from "../content";

type AllParams = { algorithmId: number };

const All = async ({
  params,
  searchParams,
}: {
  params: AllParams;
  searchParams?: { [key: string]: string | undefined };
}) => {
  return (
    <>
      <Content
        algorithmId={params.algorithmId}
        options={{
          boardType: BoardType.ALGORITHM_ALL,
          page: Number(searchParams?.page) || 1,
          count: Number(searchParams?.count) || 10,
          keyword: searchParams?.keyword,
        }}
      />
    </>
  );
};

export default All;
