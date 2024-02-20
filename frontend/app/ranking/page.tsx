import Image from "next/image";

import { IMAGE_URL } from "@/api";
import { getRankings } from "@/api/ranking";

import styles from "./ranking.module.scss";

import Table, { TableData } from "@/components/algorithm/table";
import BoardNavigation, { NavItem } from "@/components/common/boardNavigation";
import NotFound from "@/components/common/notFound";
import Pagination from "@/components/common/pagination";

const navItems: NavItem[] = [
  {
    title: "정답 랭킹",
    link: `/ranking`,
  },
];

const tableHeaders = [
  "순위",
  "닉네임",
  "문제 제출 횟수",
  "문제 맞춘 횟수",
  "정답률",
];

const Ranking = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const page = Number(searchParams?.page) || 1;
  const count = Number(searchParams?.count) || 10;
  const keyword = searchParams?.keyword;

  const rankings = await getRankings({ page, count, keyword });

  const includeCommaWithNumber = (num: number) => {
    return num.toLocaleString();
  };

  const convertFloatAtTwo = (tried: number, solved: number) => {
    return ((solved / tried) * 100).toFixed(2);
  };

  const tableDatas: TableData[] = rankings.rankings.map((item) => {
    return {
      datas: [
        <span key={item.rankingId}>{item.rank}</span>,
        <div key={item.rankingId} className={styles.nickname}>
          <Image
            src={
              item.user.profile
                ? `${IMAGE_URL}/${item.user.profile}`
                : "/svgs/user_profile_default.svg"
            }
            alt="프로필 사진"
            width={38}
            height={38}
            className={styles.profileImg}
          />
          <span>{item.user.nickname}</span>
        </div>,
        <span key={item.rankingId}>{includeCommaWithNumber(item.tried)}</span>,
        <span key={item.rankingId}>{includeCommaWithNumber(item.solved)}</span>,
        <span key={item.rankingId}>
          {convertFloatAtTwo(item.tried, item.solved)}%
        </span>,
      ],
      link: `/user/${item.user.userId}/question`,
    };
  });

  if (rankings.total <= 0 && keyword)
    return (
      <>
        <BoardNavigation
          items={navItems}
          isVisiblePost={false}
          placeholder="닉네임으로 검색"
        />
        <NotFound
          title="사용자를 찾을 수 없습니다."
          description="매일 오전 12시 기준으로 랭킹에 업데이트 됩니다."
        />
      </>
    );

  if (rankings.total <= 0)
    return (
      <NotFound
        title="랭킹을 표시할 수 없습니다."
        description="매일 오전 12시 기준으로 랭킹에 업데이트 됩니다."
      />
    );

  return (
    <div className={styles.ranking}>
      <BoardNavigation
        items={navItems}
        isVisiblePost={false}
        placeholder="닉네임으로 검색"
      />
      <Table
        headers={tableHeaders}
        datas={tableDatas}
        sizes={[10, 50, 15, 15, 10]}
      />
      <Pagination
        current={page}
        count={count}
        total={rankings.total}
        marginTop={25}
      />
    </div>
  );
};

export default Ranking;
