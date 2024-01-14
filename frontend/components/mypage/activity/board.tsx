"use client";
import { useCallback, useEffect, useState } from "react";

import { PageOptions, Response } from "@/api/board";
import BoardType from "@/interfaces/board";

import Table from "./table";
import SubNavigation, { NavItem } from "./subNavigation";
import Pagination from "@/components/common/pagination";
import Spinner from "@/components/common/spinner";

import styles from "./board.module.scss";

export type KindType = {
  [key: string]: string;
};

type KindTypeKeys = keyof KindType;

export type APIs = {
  [key in KindTypeKeys]: (pageOptions: PageOptions) => Promise<Response>;
};

type PaginationOptions = {
  total: number;
} & PageOptions;

export type BoardProps = {
  apis: APIs;
  navItems: NavItem[];
  queryKey: string;
};

const Board = ({ apis, navItems, queryKey }: BoardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [kind, setKind] = useState<string | undefined>();
  const [pageOptions, setPageOptions] = useState<PaginationOptions>({
    page: 1,
    total: 0,
    count: 5,
  });
  const [boards, setBoards] = useState<BoardType[]>([]);

  const handleChangeKind = useCallback((kind: string) => {
    setIsLoading(true);
    setBoards([]);
    setKind(kind);
    setPageOptions({
      page: 1,
      total: 0,
      count: 5,
    });
  }, []);

  const handlePagination = useCallback((page: number) => {
    setPageOptions((prev) => {
      return {
        ...prev,
        page,
      };
    });
  }, []);

  const fetchAPI = useCallback(
    async (key: string | undefined) => {
      if (!key || !apis[key]) {
        setBoards([]);
        setPageOptions({
          count: 5,
          page: 1,
          total: 0,
        });
        setIsLoading(false);
        return;
      }

      const response: Response = await apis[key](pageOptions);
      setBoards(response.contents);
      setPageOptions((prev) => {
        return {
          ...prev,
          total: response.total,
        };
      });
    },
    [apis, pageOptions],
  );

  useEffect(() => {
    fetchAPI(kind);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kind]);

  useEffect(() => {
    if (boards.length > 0) {
      setIsLoading(false);
    }
  }, [boards]);

  return (
    <div className={styles.board}>
      <SubNavigation
        queryKey={queryKey}
        defaultValue={navItems[0].link}
        items={navItems}
        onChange={handleChangeKind}
      />
      <div className={styles.content}>
        {!isLoading ? (
          <>
            <Table items={boards} />
            <Pagination
              count={pageOptions.count}
              total={pageOptions.total}
              onChange={handlePagination}
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

export default Board;
