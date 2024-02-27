import Content from "../content";

import { BOARD_TYPE } from "@/types/constants";

type FeedbackParams = { algorithmId: number };

const Feedback = async ({
  params,
  searchParams,
}: {
  params: FeedbackParams;
  searchParams?: { [key: string]: string | undefined };
}) => {
  return (
    <>
      <Content
        algorithmId={params.algorithmId}
        options={{
          kind: BOARD_TYPE.ALGORITHM_FEEDBACK,
          page: Number(searchParams?.page) || 1,
          count: Number(searchParams?.count) || 10,
          keyword: searchParams?.keyword,
        }}
      />
    </>
  );
};

export default Feedback;
