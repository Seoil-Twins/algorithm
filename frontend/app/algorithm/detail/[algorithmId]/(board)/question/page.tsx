import Content from "../content";

type QuestionParams = { algorithmId: number };

const Question = async ({ params }: { params: QuestionParams }) => {
  return (
    <>
      <Content type={3} algorithmId={params.algorithmId} />
    </>
  );
};

export default Question;
