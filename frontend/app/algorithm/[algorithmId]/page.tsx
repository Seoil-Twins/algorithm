import styles from "./detail.module.scss";

import { getAlgorithm } from "@/app/actions/algorithm";

import Navbar from "@/components/algorithm/detail/navbar";
import Contents from "@/components/algorithm/detail/contents";

type PageParams = {
  algorithmId: number;
};

const Detail = async ({ params }: { params: PageParams }) => {
  const algorithmId = params.algorithmId;
  const algorithm = (await getAlgorithm(algorithmId)).data;

  return (
    <div className={styles.algorithmDetail}>
      <style>{`
        .mainCenterBox {
          max-width: none;
          padding: 0;
        }

        .cm-scroller,
        .cm-gutter {
          background-color: var(--color-background);
        }
      `}</style>
      <Navbar algorithm={algorithm} />
      <Contents algorithm={algorithm} />
    </div>
  );
};

export default Detail;
