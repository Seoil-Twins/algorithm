import Image from "next/image";

import { RankingList, RankingListItem } from "../api/model/ranking";
import { RankingAPI } from "@/api/ranking";

import styles from "./ranking.module.scss";

import Table, { TableData } from "@/components/algorithm/table";
import { NavItem } from "@/components/common/boardNavigation";
import NotFound from "@/components/common/notFound";
import Pagination from "@/components/common/pagination";
import { IMAGE_URL } from "@/api";

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
  let rankings: RankingList;

  try {
    rankings = await (await RankingAPI.getRankings(page, count)).json();
  } catch (error) {
    return (
      <NotFound
        title="랭킹을 표시할 수 없습니다."
        description="매일 오전 12시 기준으로 랭킹에 업데이트 됩니다."
      />
    );
  }

  const includeCommaWithNumber = (num: number) => {
    return num.toLocaleString();
  };

  const convertFloatAtTwo = (tried: number, solved: number) => {
    if (tried === 0 || solved === 0) {
      return 0;
    }

    return ((solved / tried) * 100).toFixed(2);
  };

  const tableDatas: TableData[] = rankings.rankings.map(
    (item: RankingListItem, idx: number) => {
      return {
        datas: [
          <span key={idx}>{idx + 1 + page * 10}</span>,
          <div key={idx} className={styles.nickname}>
            <Image
              src={`${IMAGE_URL}${item.user.profile}`}
              alt="프로필 사진"
              width={38}
              height={38}
              className={styles.profileImg}
            />
            <span>{item.user.nickname}</span>
          </div>,
          <span key={idx}>{includeCommaWithNumber(item.tried)}</span>,
          <span key={idx}>{includeCommaWithNumber(item.solved)}</span>,
          <span key={idx}>{convertFloatAtTwo(item.tried, item.solved)}%</span>,
        ],
        link: `/user/${item.user.userId}/question`,
      };
    },
  );

  return (
    <div className={styles.ranking}>
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
