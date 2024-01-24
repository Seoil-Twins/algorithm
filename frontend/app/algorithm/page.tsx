/* eslint-disable react/jsx-key */
import Image from "next/image";

import {
  AlgorithmOptions,
  KIND_OPTIONS_ARRAY,
  KindOptions,
  RATE_OPTIONS_ARRAY,
  RateOptions,
  SOLVED_OPTIONS_ARRAY,
  SORT_OPTIONS_ARRAY,
  SolvedOptions,
  SortOptions,
  checkMyType,
  getAlgorithmKinds,
  getAlgorithms,
} from "@/api/algorithm/algorithm";
import Navigation from "@/components/algorithm/navigation";
import Table, { TableData } from "@/components/algorithm/table";
import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";

import styles from "./algorithm.module.scss";
import { notosansBold } from "@/styles/_font";

import { Algorithm as AlgorithmType } from "@/interfaces/algorithm";

const tableHeaders = ["상태", "제목", "난이도", "분류", "정답률"];

const Algorithm = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const sortOptions: AlgorithmOptions = {
    count: Number(searchParams?.count) || 20,
    page: Number(searchParams?.page) || 1,
    solved: checkMyType(
      SOLVED_OPTIONS_ARRAY,
      searchParams?.solved as SolvedOptions,
    )
      ? (searchParams?.solved as SolvedOptions)
      : "a",
    sort: checkMyType(SORT_OPTIONS_ARRAY, searchParams?.sort as SortOptions)
      ? (searchParams?.sort as SortOptions)
      : "r",
    level: Number(searchParams?.level) || 0,
    kind: checkMyType(KIND_OPTIONS_ARRAY, searchParams?.kind as KindOptions)
      ? (searchParams?.kind as KindOptions)
      : "a",
    rate: checkMyType(RATE_OPTIONS_ARRAY, searchParams?.rate as RateOptions)
      ? (searchParams?.rate as RateOptions)
      : undefined,
    tag: Number(searchParams?.tag) || undefined,
    keyword: (searchParams?.keyword as string) || undefined,
  };

  const algorithms = await getAlgorithms(sortOptions);
  const algorithmKinds = await getAlgorithmKinds();

  const tableDatas: TableData[] = algorithms.algorithms.map(
    (algorithm: AlgorithmType) => {
      return {
        datas: [
          <Image
            src={`${
              algorithm.solved
                ? "/svgs/valid_check.svg"
                : "/svgs/invalid_check.svg"
            }`}
            alt="정답 여부 아이콘"
            width={24}
            height={24}
          />,
          <span>{algorithm.title}</span>,
          <span
            className={`${styles[`level${algorithm.level}`]} ${
              notosansBold.className
            }`}
          >
            Level. {algorithm.level}
          </span>,
          <span>{algorithm.kinds[0]}</span>,
          <span>{algorithm.solvedRate}%</span>,
        ],
        link: `/algorithm/detail/${algorithm.algorithmId}`,
      };
    },
  );

  return (
    <>
      <Navigation algorithmKinds={algorithmKinds} />
      {algorithms.total > 0 ? (
        <>
          <Table
            headers={tableHeaders}
            datas={tableDatas}
            sizes={[10, 50, 15, 15, 10]}
          />
          <Pagination
            count={5}
            total={algorithms.total}
            current={sortOptions.page}
            marginTop={25}
          />
        </>
      ) : (
        <NotFound
          title="아직 게시된 알고리즘이 없습니다."
          description="잠시만 기다려주시면 바로 만들겠습니다 !"
        />
      )}
    </>
  );
};

export default Algorithm;
