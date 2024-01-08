import React from "react";

import Navigation from "@/components/mypage/navigation";

import styles from "./mypage.module.scss";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.mypage}>
      <Navigation />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default layout;
