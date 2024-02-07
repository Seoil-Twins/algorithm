import Content from "../content";

type AllParams = { algorithmId: number };

const All = async ({ params }: { params: AllParams }) => {
  return (
    <>
      <Content type={6} algorithmId={params.algorithmId} />
    </>
  );
};

export default All;
