import styles from "./detail.module.scss";

import { AlgorithmAPI } from "@/api/algorithm";
import { Algorithm } from "@/app/api/model/algorithm";

import Navbar from "@/components/algorithm/detail/navbar";
import Contents from "@/components/algorithm/detail/contents";

type PageParams = {
  algorithmId: number;
};

const Detail = async ({ params }: { params: PageParams }) => {
  const algorithm: Algorithm = await (
    await AlgorithmAPI.getAlgorithm(params.algorithmId)
  ).json();

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
