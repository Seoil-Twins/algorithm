import styles from "./explain.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import { getAlgorithm, getExplain } from "@/app/actions/algorithm";

import EditorViewer from "@/components/common/editorViewer";
import NotFound from "@/components/common/notFound";
import Explanation from "@/types2/explanation";

type ExplainProps = {
  algorithmId: number;
};

const Explain = async ({ params }: { params: ExplainProps }) => {
  const algorithm = (await getAlgorithm(params.algorithmId)).data;

  let explain: string = "";
  const explainResponse = await getExplain(params.algorithmId);

  if (explainResponse.status === 200) {
    explain = (explainResponse.data as Explanation).content;
  } else if (explainResponse.status === 404) {
    return (
      <NotFound
        title="아직 해설이 만들어지지 않았습니다."
        description="빠른 시일 내로 이해하기 쉬운 해설을 가져오겠습니다 !"
        marginTop={0}
      />
    );
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
      <EditorViewer content={explain} />
    </div>
  );
};

export default Explain;
