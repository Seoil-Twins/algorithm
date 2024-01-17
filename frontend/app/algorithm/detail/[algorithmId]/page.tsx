import styles from "./detail.module.scss";

import { getAlgorithm } from "@/api/algorithm";

import AlgorithmNavbar from "@/components/algorithm/detail/algorithmNavbar";

type PageParams = {
  algorithmId: number;
};

const Detail = async ({ params }: { params: PageParams }) => {
  const algorithmId = params.algorithmId;
  const algorithm = await getAlgorithm(algorithmId);

  return (
    <>
      <AlgorithmNavbar algorithm={algorithm} />
    </>
  );
};

export default Detail;
