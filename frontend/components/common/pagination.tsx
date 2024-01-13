"use client";

import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDebouncedCallback } from "use-debounce";

import styles from "./pagination.module.scss";

type PaginationProps = {
  count: number;
  total: number;
  defaultPage?: number;
  marginTop: number;
  onChange: (page: number) => void;
};

function getClosestGreaterNumbers(arr: number[], target: number): number[] {
  const greatersToTarget = arr.filter((val) => val >= target);
  if (greatersToTarget.length === 0) return arr;

  const sliceIdx =
    -greatersToTarget.length + 1 === 0
      ? arr.length
      : -greatersToTarget.length + 1;

  return arr.slice(0, sliceIdx);
}

const getPaginationBoundary = (
  total: number,
  count: number,
  current: number,
) => {
  if (total === 1) return [1];

  const boundary = [];
  let initial = 0;

  if (current === total) {
    initial = current - count + 1;
  } else if (current % count === 0) {
    initial = Math.floor((current - 1) / count) * count + 1;
  } else {
    initial = Math.floor(current / count) * count + 1;
  }

  for (let i = initial; i <= initial + count - 1; i++) {
    if (i > total) {
      break;
    }

    boundary.push(i);
  }

  const sliceCountBoundarys = getClosestGreaterNumbers(
    boundary.map((val) => val * count),
    total,
  );
  const result = sliceCountBoundarys.map((val) => val / count);

  return result;
};

const Pagination = ({
  total,
  count,
  defaultPage = 1,
  marginTop = 25,
  onChange,
}: PaginationProps) => {
  const [current, setCurrent] = useState<number>(defaultPage);
  const [viewPages, setViewPages] = useState<number[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const handleWindowSize = useDebouncedCallback(
    useCallback(() => {
      if (window.innerWidth <= 329) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }, []),
    400,
  );

  const handlePrevois = useCallback(() => {
    setCurrent(current - 1);
    onChange(current - 1);
  }, [current, onChange]);

  const handleChange = useCallback(
    (num: number) => {
      setCurrent(num);
      onChange(num);
    },
    [onChange],
  );

  const handleNext = useCallback(() => {
    setCurrent(current + 1);
    onChange(current + 1);
  }, [current, onChange]);

  useEffect(() => {
    const newViewPages = getPaginationBoundary(total, count, current);
    setViewPages(newViewPages);
  }, [total, count, current]);

  useEffect(() => {
    const isMobile = /iphone|ipad|ipod|android/i.test(
      navigator.userAgent.toLowerCase(),
    );

    if (isMobile) setIsVisible(false);

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, [handleWindowSize]);

  return (
    <>
      {total != 0 && (
        <ul className={styles.pagination} style={{ marginTop }}>
          <li className={styles.previous}>
            <button disabled={current === 1} onClick={handlePrevois}>
              <Image
                src={`${
                  current === 1
                    ? "/svgs/arrow_left_white.svg"
                    : "/svgs/arrow_left_gray.svg"
                }`}
                alt="왼쪽 이동 아이콘"
                width={18}
                height={18}
              />
            </button>
          </li>
          {isVisible ? (
            viewPages.map((num: number) => (
              <li key={num}>
                <button
                  className={`${styles.btn} ${
                    current === num ? styles.active : null
                  }`}
                  onClick={() => handleChange(num)}
                >
                  {num}
                </button>
              </li>
            ))
          ) : (
            <li className={styles.empty} />
          )}
          <li className={styles.next}>
            <button disabled={current * count >= total} onClick={handleNext}>
              <Image
                src={`${
                  current * count >= total
                    ? "/svgs/arrow_right_white.svg"
                    : "/svgs/arrow_right_gray.svg"
                }`}
                alt="오른쪽 이동 아이콘"
                width={18}
                height={18}
              />
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default Pagination;
