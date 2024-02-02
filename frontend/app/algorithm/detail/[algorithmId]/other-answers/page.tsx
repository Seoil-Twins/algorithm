import { ResponseAnswer, getAnswer } from "@/api/code";
import styles from "./otherAnswers.module.scss";

import DetailNav from "@/components/detail/detailNav";
import Answer from "@/components/algorithm/detail/other-answers/answer";
import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";

const OtherAnswers = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const language = searchParams.language || "python";
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;

  const answers: ResponseAnswer = await getAnswer(language, { count, page });

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
        {answers.answers.map((answer) => (
          <Answer key={answer.codeId} answer={answer} />
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
