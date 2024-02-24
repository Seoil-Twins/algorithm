import Content from "../content";

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
          kind: 4,
          page: Number(searchParams?.page) || 1,
          count: Number(searchParams?.count) || 10,
          keyword: searchParams?.keyword,
        }}
      />
    </>
  );
};

export default Feedback;
