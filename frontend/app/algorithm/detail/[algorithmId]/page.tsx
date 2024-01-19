import styles from "./detail.module.scss";

import { getAlgorithm } from "@/api/algorithm";

import Navbar from "@/components/algorithm/detail/navbar";
import Contents from "@/components/algorithm/detail/contents";

type PageParams = {
  algorithmId: number;
};

const Detail = async ({ params }: { params: PageParams }) => {
  const algorithmId = params.algorithmId;
  const algorithm = await getAlgorithm(algorithmId);

  return (
    <div className={styles.algorithmDetail}>
      <style>{`
        .mainCenterBox {
          max-width: none;
          padding: 0;
        }

        .ql-container {
          font-family: inherit !important;
        }

        .ql-editor {
          font-size: 1rem;
          padding: 0 !important;
          white-space: normal !important;
        }

        .cm-scroller,
        .cm-gutter {
          background-color: #1d202a;
        }

        .ql-editor pre {
          margin-top: 5px !important;
          background-color: #32394f !important;
        }

        .ql-editor img {
          width: 100%;
        }
      `}</style>
      <Navbar algorithm={algorithm} />
      <Contents algorithm={algorithm} />
      <footer style={{ height: "44px" }}>footer</footer>
    </div>
  );
};

export default Detail;
