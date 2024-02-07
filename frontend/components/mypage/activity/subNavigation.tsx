"use client";

import Link from "next/link";

import styles from "./subNavigation.module.scss";
import { notosansMedium } from "@/styles/_font";
import { usePathname } from "next/navigation";

export type NavItem = {
  title: string;
  link: string;
};

type SubNavigationProps = {
  items: NavItem[];
};

const SubNavigation = ({ items }: SubNavigationProps) => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {items.map((item: NavItem, idx: number) => (
        <Link href={item.link} key={idx} shallow scroll={false}>
          <button
            className={`${styles.btn} ${notosansMedium.className} ${
              pathname === item.link && styles.active
            }`}
          >
            {item.title}
          </button>
        </Link>
      ))}
    </nav>
  );
};

export default SubNavigation;
