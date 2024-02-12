import styles from "./detail.module.scss";

import { getAlgorithm } from "@/api/algorithm/algorithm";

import Navbar from "@/components/algorithm/detail/navbar";
import Contents from "@/components/algorithm/detail/contents";

type PageParams = {
  algorithmId: number;
};

const Detail = async ({ params }: { params: PageParams }) => {
  const algorithmId = params.algorithmId;
  const algorithmResponse = await getAlgorithm(algorithmId);
  const algorithm = await algorithmResponse.data;

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
