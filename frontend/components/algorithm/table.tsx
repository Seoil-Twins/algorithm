import React from "react";

import styles from "./table.module.scss";
import Link from "next/link";

export type TableData = {
  datas: React.ReactNode[];
  link: string;
};

type TableProps = {
  headers: string[];
  datas: TableData[];
};

const Table = ({ headers, datas }: TableProps) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.table}>
        <div className={styles.tr}>
          {headers.map((header: string, idx: number) => (
            <span key={idx} className={styles.cell}>
              {header}
            </span>
          ))}
        </div>
        {datas.map((items: TableData, idx: number) => (
          <Link href={items.link} key={idx} className={styles.tr}>
            {items.datas.map((node: React.ReactNode, idx: number) => (
              <div key={idx} className={styles.cell}>
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
