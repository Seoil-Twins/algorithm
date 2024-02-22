import { ResponseAnswer, getAnswer } from "@/api/code";

import styles from "./otherAnswers.module.scss";

import DetailNav from "@/components/detail/detailNav";
import Answer from "@/components/algorithm/detail/other-answers/answer";
import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";
import { getCodeValue } from "@/providers/codeTypeProvider";

const OtherAnswers = async ({
  params,
  searchParams,
}: {
  params: { algorithmId: number };
  searchParams: { [key: string]: string | undefined };
}) => {
  const algorithmId = params.algorithmId;
  const language = Number(searchParams.language) || 3001;
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;

  const answersResponse = await getAnswer(algorithmId, {
    count,
    page,
    language,
  });
  // 추후 total 생성 시 .data만 추가
  const answers: ResponseAnswer = { ...answersResponse.data, total: 3 };

  if (answers.total <= 0)
    return (
      <NotFound
        title="아직 게시된 답변이 없습니다,"
        description="새로운 답변의 주인공이 되어보세요 !"
      />
    );

  return (
    <div className={styles.otherAnswers}>
      <div className={styles.mb35}>
        <DetailNav isEditable={false} />
      </div>
      <div className={styles.answers}>
        {answers.codes.map((answer) => (
          // comments 붙여지면 answer만 넘기면 됨
          <Answer key={answer.codeId} answer={{ ...answer, comments: [] }} />
        ))}
      </div>
      <Pagination
        current={page}
        count={count}
        total={answers.total}
        marginTop={25}
      />
    </div>
  );
};

export default OtherAnswers;
