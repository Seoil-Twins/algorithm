import React from "react";

import { notosansBold } from "@/styles/_font";

import styles from "./content.module.scss";

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

const Content = ({ title, children }: ContentProps) => {
  return (
    <div className={styles.content}>
      <div className={`${styles.title} ${notosansBold.className}`}>{title}</div>
      <div className={styles.item}>{children}</div>
    </div>
  );
};

export default Content;
