import { getAlgorithm, getExplain } from "@/api/algorithm/algorithm";

import styles from "./explain.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import EditorViewer from "@/components/common/editorViewer";
import Explanation from "@/interfaces/explanation";
import { AxiosError } from "axios";
import NotFound from "@/components/common/notFound";

type ExplainProps = {
  algorithmId: number;
};

const Explain = async ({ params }: { params: ExplainProps }) => {
  const algorithmResponse = await getAlgorithm(params.algorithmId);
  const algorithm = algorithmResponse.data;

  const explain: Partial<Explanation> = {
    content: "",
  };

  try {
    const explainResponse = await getExplain(params.algorithmId);
    explain.content = explainResponse.data.content;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data.status === 404) {
      return (
        <NotFound
          title="아직 해설이 만들어지지 않았습니다."
          description="빠른 시일 내로 이해하기 쉬운 해설을 가져오겠습니다 !"
          marginTop={0}
        />
      );
    } else {
      throw new Error("Internal Server Error");
    }
  }

  return (
    <div className={styles.explain}>
      <div className={styles.top}>
        <div className={`${styles.title} ${notosansMedium.className}`}>
          {algorithm.title}
        </div>
        <div className={styles.ft14}>
          <span className={`level${algorithm.level} ${notosansBold.className}`}>
            LV. {algorithm.level}
          </span>
          <span className={styles.kind}>{algorithm.kinds}</span>
        </div>
      </div>
      <EditorViewer content={explain.content} />
    </div>
  );
};

export default Explain;
