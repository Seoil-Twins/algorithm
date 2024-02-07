import Content from "../content";

type FeedbackParams = { algorithmId: number };

const Feedback = async ({ params }: { params: FeedbackParams }) => {
  return (
    <>
      <Content type={4} algorithmId={params.algorithmId} />
    </>
  );
};

export default Feedback;
