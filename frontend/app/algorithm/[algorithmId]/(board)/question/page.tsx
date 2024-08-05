import { BoardType } from "@/types/constants";
import Content from "../content";

type QuestionParams = { algorithmId: number };

const Question = async ({
  params,
  searchParams,
}: {
  params: QuestionParams;
  searchParams?: { [key: string]: string | undefined };
}) => {
  return (
    <>
      <Content
        algorithmId={params.algorithmId}
        options={{
          boardType: BoardType.ALGORITHM_QUESTION,
          page: Number(searchParams?.page) || 1,
          count: Number(searchParams?.count) || 10,
          keyword: searchParams?.keyword,
        }}
      />
    </>
  );
};

export default Question;
