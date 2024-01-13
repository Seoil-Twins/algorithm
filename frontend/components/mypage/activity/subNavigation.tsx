"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

import styles from "./subNavigation.module.scss";
import { useEffect, useState } from "react";
import { notosansMedium } from "@/styles/_font";

export type NavItem = {
  title: string;
  link: string;
};

type SubNavigationProps = {
  queryKey: string;
  defaultValue: string;
  items: NavItem[];
  onChange: (kind: string) => void;
};

const SubNavigation = ({
  queryKey,
  defaultValue,
  items,
  onChange,
}: SubNavigationProps) => {
  const params = useSearchParams();
  const currentParams = new URLSearchParams(params.toString()).toString();

  const [kind, setKind] = useState<string | null>(params.get(queryKey));

  useEffect(() => {
    const kind = params.get(queryKey) ? params.get(queryKey) : defaultValue;
    setKind(kind);
  }, [params, defaultValue, queryKey, setKind]);

  useEffect(() => {
    if (kind) onChange(kind);
  }, [kind, onChange]);

  return (
    <nav className={styles.nav}>
      {items.map((item: NavItem, idx: number) => (
        <Link
          href={`/activity?${
            currentParams.includes(queryKey)
              ? `${currentParams.replace(
                  params.get(queryKey) || "",
                  item.link,
                )}`
              : `${currentParams}&${queryKey}=${item.link}`
          }`}
          key={idx}
          shallow
          scroll={false}
        >
          <button
            className={`${styles.btn} ${notosansMedium.className} ${
              (params.get(queryKey) || defaultValue) === item.link &&
              styles.active
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
