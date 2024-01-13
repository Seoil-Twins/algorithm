"use client";

import { useCallback, useEffect, useState } from "react";

import SubNavigation, { NavItem } from "./subNavigation";
import Table from "./table";
import Pagination from "@/components/common/pagination";
import Spinner from "@/components/common/spinner";
import Board from "@/interfaces/board";
import {
  Response,
  getMyFavorites,
  getMyPostAnswers,
  getMyPostComments,
  getMyPosts,
} from "@/api/board";

import styles from "./communityBoard.module.scss";

const count = 5;
const kindType = {
  post: "post",
  comment: "feedcommentback",
  answer: "com_answer",
  favorite: "favorite",
};
const communityNavItems: NavItem[] = [
  {
    title: "작성한 글",
    link: kindType.post,
  },
  {
    title: "작성한 댓글",
    link: kindType.comment,
  },
  {
    title: "작성한 답변",
    link: kindType.answer,
  },
  {
    title: "좋아요한 글",
    link: kindType.favorite,
  },
];

const fetchPosts = async (page: number, count: number) => {
  const response: Response = await getMyPosts({ page, count });
  return response;
};

const fetchComments = async (page: number, count: number) => {
  const response: Response = await getMyPostComments({ page, count });
  return response;
};

const fetchAnswer = async (page: number, count: number) => {
  const response: Response = await getMyPostAnswers({ page, count });
  return response;
};

const fetchFavorites = async (page: number, count: number) => {
  const response: Response = await getMyFavorites({ page, count });
  return response;
};

const CommunityBoard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kind, setKind] = useState<string>();
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [boards, setBoards] = useState<Board[]>([]);

  const callFetchPosts = useCallback(async () => {
    const response: Response = await fetchPosts(page, count);
    setBoards(response.contents);
    setTotal(response.total);
    setIsLoading(false);
  }, [page]);

  const callFetchComments = useCallback(async () => {
    const response: Response = await fetchComments(page, count);
    setBoards(response.contents);
    setTotal(response.total);
    setIsLoading(false);
  }, [page]);

  const callFetchAnswer = useCallback(async () => {
    const response: Response = await fetchAnswer(page, count);
    setBoards(response.contents);
    setTotal(response.total);
    setIsLoading(false);
  }, [page]);

  const callFetchFavorites = useCallback(async () => {
    const response: Response = await fetchFavorites(page, count);
    setBoards(response.contents);
    setTotal(response.total);
    setIsLoading(false);
  }, [page]);

  const handleChangeKind = useCallback((kind: string) => {
    setIsLoading(true);
    setBoards([]);
    setKind(kind);
    setTotal(0);
    setPage(0);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [kind]);

  useEffect(() => {
    if (kind === kindType.post) {
      callFetchPosts();
    } else if (kind === kindType.comment) {
      callFetchComments();
    } else if (kind === kindType.answer) {
      callFetchAnswer();
    } else if (kind === kindType.favorite) {
      callFetchFavorites();
    }
  }, [
    kind,
    page,
    callFetchPosts,
    callFetchComments,
    callFetchAnswer,
    callFetchFavorites,
  ]);

  return (
    <div className={styles.board}>
      <SubNavigation
        queryKey="community"
        defaultValue={communityNavItems[0].link}
        items={communityNavItems}
        onChange={handleChangeKind}
      />
      <div className={styles.content}>
        {!isLoading ? (
          <>
            <Table items={boards} />
            <Pagination
              count={count}
              total={total}
              onChange={setPage}
              marginTop={25}
            />
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default CommunityBoard;
