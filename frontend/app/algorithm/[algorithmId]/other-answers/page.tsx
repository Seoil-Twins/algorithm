import styles from "./otherAnswers.module.scss";

import DetailNav from "@/components/detail/detailNav";
import Answer from "@/components/algorithm/detail/other-answers/answer";
import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";

import { AlgorithmAPI } from "@/api/algorithm";
import { Corrects } from "@/app/api/model/algorithm";
import { CodeLanguage, getTitleByCodeType } from "@/types/constants";

const OtherAnswers = async ({
  params,
  searchParams,
}: {
  params: { algorithmId: number };
  searchParams: { [key: string]: string | undefined };
}) => {
  const algorithmId = params.algorithmId;
  const language = searchParams.language || String(CodeLanguage.PYTHON);
  const count = Number(searchParams?.count) || 5;
  const page = Number(searchParams?.page) || 1;

  const answers: Corrects = await (
    await AlgorithmAPI.getAlgorithmCorrects(algorithmId, {
      count,
      page,
      language,
    })
  ).json();

  answers.corrects = answers.corrects.map((code) => {
    const newCode = `<pre><code class="language-${getTitleByCodeType(
      (language as any) || CodeLanguage.PYTHON,
    )} hljs">${code.code}</code></pre>`;
    return { ...code, code: newCode };
  });

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
        <DetailNav isEditable={false} isDeletable={false} />
      </div>
      <div className={styles.answers}>
        {answers.corrects.map((answer) => (
          <Answer
            key={answer.correctId}
            algorithmId={algorithmId}
            answer={answer}
          />
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
