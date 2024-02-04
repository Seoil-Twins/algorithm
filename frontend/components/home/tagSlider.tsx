"use client";

import React, { useCallback, useEffect, useRef } from "react";
import styles from "./tagSlider.module.scss";

type PropsType = {
  tags: string[];
};

const TagSlider = ({ tags }: PropsType) => {
  const moveBoxRef = useRef<HTMLDivElement>(null);
  const moveBoxX = useRef<number>(0);
  const scrollWidth = useRef<number>(0);
  const clientWidth = useRef<number>(0);
  const startX = useRef<number>(0);
  const nowX = useRef<number>(0);
  const endX = useRef<number>(0);

  const getClientX = useCallback((e: TouchEvent | MouseEvent) => {
    if (e instanceof MouseEvent) return e.clientX;

    const isChangedTouches =
      e.changedTouches && e.changedTouches.length > 0 ? true : false;
    if (isChangedTouches) return e.changedTouches[0].clientX;

    return e.touches[0].clientX;
  }, []);

  const getLeft = useCallback(() => {
    return parseInt(getComputedStyle(moveBoxRef.current!).left);
  }, []);

  const setLeft = useCallback((leftX: number) => {
    if (moveBoxRef.current) {
      moveBoxRef.current.style.left = `${leftX}px`;
    }
  }, []);

  const onClick = useCallback(
    (e: TouchEvent | MouseEvent) => {
      if (startX.current - endX.current !== 0) {
        e.preventDefault();
      }
    },
    [startX, endX],
  );

  const onScrollMove = useCallback(
    (e: TouchEvent | MouseEvent) => {
      nowX.current = getClientX(e);
      setLeft(moveBoxX.current + nowX.current - startX.current);
    },
    [getClientX, setLeft],
  );

  const onScrollEnd = useCallback(
    (e: TouchEvent | MouseEvent) => {
      endX.current = getClientX(e);
      moveBoxX.current = getLeft();
      scrollWidth.current = moveBoxRef.current?.scrollWidth ?? 0;
      clientWidth.current = moveBoxRef.current?.clientWidth ?? 0;

      if (moveBoxX.current < clientWidth.current - scrollWidth.current) {
        setLeft(-(scrollWidth.current - clientWidth.current));
        moveBoxRef.current!.style.transition = `all 0.3s ease`;
        moveBoxX.current = -(scrollWidth.current - clientWidth.current);
      } else if (moveBoxX.current > 0) {
        setLeft(0);
        moveBoxRef.current!.style.transition = `all 0.3s ease`;
        moveBoxX.current = 0;
      }

      moveBoxRef.current?.removeEventListener("mousemove", onScrollMove);
      moveBoxRef.current?.removeEventListener("touchmove", onScrollMove);
      moveBoxRef.current?.removeEventListener("mouseup", onScrollEnd);
      moveBoxRef.current?.removeEventListener("touchend", onScrollEnd);
      moveBoxRef.current?.removeEventListener("mouseleave", onMouseLeave);
      moveBoxRef.current?.removeEventListener("click", onClick);

      setTimeout(() => {
        bindEvents();
        if (moveBoxRef.current) {
          moveBoxRef.current.style.transition = "";
        }
      }, 300);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getClientX, getLeft, onScrollMove, onClick, setLeft],
  );

  const onScrollStart = useCallback(
    (e: TouchEvent | MouseEvent) => {
      startX.current = getClientX(e);
      moveBoxX.current = getLeft();
      moveBoxRef.current?.addEventListener("mousemove", onScrollMove);
      moveBoxRef.current?.addEventListener("touchmove", onScrollMove);
      moveBoxRef.current?.addEventListener("mouseup", onScrollEnd);
      moveBoxRef.current?.addEventListener("touchend", onScrollEnd);
    },
    [getClientX, getLeft, onScrollMove, onScrollEnd],
  );

  const onMouseLeave = useCallback(() => {
    // 마우스가 moveBox 영역을 벗어나면 mouseup 이벤트를 강제 트리거
    onScrollEnd(new MouseEvent("mouseup"));
  }, [onScrollEnd]);

  const bindEvents = useCallback(() => {
    moveBoxRef.current?.addEventListener("mousedown", onScrollStart);
    moveBoxRef.current?.addEventListener("touchstart", onScrollStart);
    moveBoxRef.current?.addEventListener("mouseleave", onMouseLeave);
    moveBoxRef.current?.addEventListener("click", onClick);
  }, [onScrollStart, onMouseLeave, onClick]);

  useEffect(() => {
    const currentMoveBoxRef = moveBoxRef.current;
    const isMobile = /iphone|ipad|ipod|android/i.test(
      navigator.userAgent.toLowerCase(),
    );

    // mobile은 css overflow으로 해결
    if (currentMoveBoxRef && !isMobile) {
      bindEvents();
    }

    return () => {
      if (currentMoveBoxRef) {
        currentMoveBoxRef.removeEventListener("mousedown", onScrollStart);
        currentMoveBoxRef.removeEventListener("touchstart", onScrollStart);
        currentMoveBoxRef.removeEventListener("mouseleave", onMouseLeave);
        currentMoveBoxRef.removeEventListener("click", onClick);
        currentMoveBoxRef.removeEventListener("mousemove", onScrollMove);
        currentMoveBoxRef.removeEventListener("touchmove", onScrollMove);
        currentMoveBoxRef.removeEventListener("mouseup", onScrollEnd);
        currentMoveBoxRef.removeEventListener("touchend", onScrollEnd);
      }
    };
  }, [
    onScrollStart,
    onScrollMove,
    onScrollEnd,
    onClick,
    bindEvents,
    onMouseLeave,
  ]);

  useEffect(() => {
    const updateMoveBoxWidths = () => {
      scrollWidth.current = moveBoxRef.current?.scrollWidth ?? 0;
      clientWidth.current = moveBoxRef.current?.clientWidth ?? 0;
    };

    updateMoveBoxWidths();
    window.addEventListener("resize", updateMoveBoxWidths);

    return () => {
      window.removeEventListener("resize", updateMoveBoxWidths);
    };
  }, []);

  return (
    <div className={styles.tagBox}>
      <div className={styles.moveBox} ref={moveBoxRef}>
        {tags.map((tag: string, idx: number) => (
          <div className={styles.tag} key={idx}>
            # {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagSlider;
