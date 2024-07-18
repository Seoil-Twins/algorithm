/* eslint-disable react/jsx-key */
import Image from "next/image";

import {
  AlgorithmOptions,
  RateOptions,
  SolvedOptions,
  SortOptions,
} from "@/types/algorithm";

import {
  RATE_OPTIONS_ARRAY,
  SOLVED_OPTIONS_ARRAY,
  SORT_OPTIONS_ARRAY,
  checkMyType,
} from "@/types/constants";

import { AlgorithmAPI } from "@/api/algorithm";
import {
  AlgorithmKindItem,
  Algorithms,
  AlgorithmsItem,
} from "../api/model/algorithm";

import Navigation from "@/components/algorithm/navigation";
import Table, { TableData } from "@/components/algorithm/table";
import Pagination from "@/components/common/pagination";
import NotFound from "@/components/common/notFound";

import { notosansBold } from "@/styles/_font";

const tableHeaders = ["상태", "제목", "난이도", "분류", "정답률"];

const Algorithm = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const sortOptions: AlgorithmOptions = {
    count: Number(searchParams?.count) || 10,
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
    rate: checkMyType(RATE_OPTIONS_ARRAY, searchParams?.rate as RateOptions)
      ? (searchParams?.rate as RateOptions)
      : undefined,
    level:
      isNaN(Number(searchParams?.level)) ||
      Number(searchParams?.level) < -1 ||
      Number(searchParams?.level) > 5
        ? -1
        : Number(searchParams?.level),
    tag: Number(searchParams?.tag) || undefined,
    keyword: (searchParams?.keyword as string) || undefined,
  };

  const algorithm: Algorithms = await (
    await AlgorithmAPI.getAlgorithms(sortOptions)
  ).json();
  const algorithmKinds: AlgorithmKindItem[] = (
    await (await AlgorithmAPI.getAlgorithmKinds()).json()
  ).kinds;

  const tableDatas: TableData[] = algorithm.algorithms.map(
    (algorithm: AlgorithmsItem) => {
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
          <span className={`level${algorithm.level} ${notosansBold.className}`}>
            Level. {algorithm.level}
          </span>,
          <span>{algorithm.kind}</span>,
          <span>{algorithm.correctRate}%</span>,
        ],
        link: `/algorithm/${algorithm.algorithmId}`,
      };
    },
  );

  return (
    <>
      <Navigation algorithmKinds={algorithmKinds} />
      {algorithm.total > 0 ? (
        <>
          <Table
            headers={tableHeaders}
            datas={tableDatas}
            sizes={[10, 50, 15, 15, 10]}
          />
          <Pagination
            count={5}
            total={algorithm.total}
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
