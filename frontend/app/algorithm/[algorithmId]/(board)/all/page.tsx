import Content from "../content";

type AllParams = { algorithmId: number };

const All = async ({
  params,
  searchParams,
}: {
  params: AllParams;
  searchParams?: { [key: string]: string | undefined };
}) => {
  console.log(searchParams);

  return (
    <>
      <Content
        algorithmId={params.algorithmId}
        options={{
          kind: 6,
          page: Number(searchParams?.page) || 1,
          count: Number(searchParams?.count) || 10,
          keyword: searchParams?.keyword,
        }}
      />
    </>
  );
};

export default All;
