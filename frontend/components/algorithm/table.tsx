import React from "react";

import styles from "./table.module.scss";
import Link from "next/link";

export type TableData = {
  datas: React.ReactNode[];
  link: string;
};

type TableProps = {
  sizes: number[];
  headers: string[];
  datas: TableData[];
};

const Table = ({ sizes, headers, datas }: TableProps) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        <div className={styles.tr}>
          {headers.map((header: string, idx: number) => (
            <span
              key={idx}
              className={styles.cell}
              style={{ width: `${sizes[idx]}%` }}
            >
              {header}
            </span>
          ))}
        </div>
        {datas.map((items: TableData, idx: number) => (
          <Link href={items.link} key={idx} className={styles.tr}>
            {items.datas.map((node: React.ReactNode, idx: number) => (
              <div
                key={idx}
                className={styles.cell}
                style={{ width: `${sizes[idx]}%` }}
              >
                {node}
              </div>
            ))}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Table;
