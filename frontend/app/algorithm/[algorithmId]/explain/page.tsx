import { getAlgorithm, getExplain } from "@/api/algorithm/algorithm";

import styles from "./explain.module.scss";
import { notosansBold, notosansMedium } from "@/styles/_font";

import EditorViewer from "@/components/common/editorViewer";

type ExplainProps = {
  algorithmId: number;
};

const Explain = async ({ params }: { params: ExplainProps }) => {
  const algorithm = await getAlgorithm(params.algorithmId);
  const explain = await getExplain(params.algorithmId);

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
          <span className={styles.kind}>{algorithm.kinds[0]}</span>
        </div>
      </div>
      <EditorViewer content={explain.content} />
    </div>
  );
};

export default Explain;
