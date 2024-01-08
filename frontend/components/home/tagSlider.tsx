"use client";

import React, { useCallback, useEffect, useRef } from "react";

import styles from "./tagSlider.module.scss";

type PropsType = {
  tags: string[];
};

const TagSlider = ({ tags }: PropsType) => {
  // useState를 사용하면 값이 변경될 때마다 re-rendering이 일어나기 때문에
  // useRef로 관리
  const moveBoxRef = useRef<HTMLDivElement>(null);
  const moveBoxX = useRef<number>(0);
  const scrollWidth = useRef<number>(0);
  const clientWidth = useRef<number>(0);
  const startX = useRef<number>(0);
  const nowX = useRef<number>(0);
  const endX = useRef<number>(0);

  const updateMoveBoxWidths = useCallback(() => {
    scrollWidth.current = moveBoxRef.current?.scrollWidth ?? 0;
    clientWidth.current = moveBoxRef.current?.clientWidth ?? 0;
  }, [moveBoxRef]);

  const getClientX = useCallback((e: TouchEvent | MouseEvent) => {
    if (e instanceof MouseEvent) return e.clientX;

    // tocuhes : 현재 화면에 터치하고 있는 터치 정보
    // changedTouches : 이벤트에 관련된 모든 터치 정보
    const isChangedTouches =
      e.changedTouches && e.changedTouches.length > 0 ? true : false;
    if (isChangedTouches) return e.changedTouches[0].clientX;

    return e.touches[0].clientX;
  }, []);

  const getLeft = useCallback(() => {
    return parseInt(getComputedStyle(moveBoxRef.current!).left);
  }, [moveBoxRef]);

  const setLeft = useCallback(
    (leftX: number) => {
      moveBoxRef.current!.style.left = `${leftX}px`;
    },
    [moveBoxRef],
  );

  const onClick = useCallback(
    (e: TouchEvent | MouseEvent) => {
      // 마우스 이동이 있다면 click 이벤트 막기
      if (startX.current - endX.current !== 0) {
        e.preventDefault();
      }
    },
    [startX, endX],
  );

  const onMouseLeave = useCallback(() => {
    // 마우스가 moveBox 영역을 벗어나면 mouseup 이벤트를 강제 트리거
    onScrollEnd(new MouseEvent("mouseup"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onScrollStart = useCallback(
    (e: TouchEvent | MouseEvent) => {
      startX.current = getClientX(e);
      moveBoxX.current = getLeft();
      moveBoxRef.current!.addEventListener("mousemove", onScrollMove);
      moveBoxRef.current!.addEventListener("touchmove", onScrollMove);
      moveBoxRef.current!.addEventListener("mouseup", onScrollEnd);
      moveBoxRef.current!.addEventListener("touchend", onScrollEnd);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getClientX, getLeft],
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

      moveBoxRef.current!.removeEventListener("mousedown", onScrollStart);
      moveBoxRef.current!.removeEventListener("touchstart", onScrollStart);
      moveBoxRef.current!.removeEventListener("mousemove", onScrollMove);
      moveBoxRef.current!.removeEventListener("touchmove", onScrollMove);
      moveBoxRef.current!.removeEventListener("mouseup", onScrollEnd);
      moveBoxRef.current!.removeEventListener("touchend", onScrollEnd);
      moveBoxRef.current!.removeEventListener("mouseleave", onMouseLeave);
      moveBoxRef.current!.removeEventListener("click", onClick);

      setTimeout(() => {
        bindEvents();
        moveBoxRef.current!.style.transition = "";
      }, 300);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      getClientX,
      getLeft,
      onScrollStart,
      onScrollMove,
      onMouseLeave,
      onClick,
      setLeft,
    ],
  );

  const bindEvents = useCallback(() => {
    moveBoxRef.current!.addEventListener("mousedown", onScrollStart);
    moveBoxRef.current!.addEventListener("touchstart", onScrollStart);
    moveBoxRef.current!.addEventListener("mouseleave", onMouseLeave);
    moveBoxRef.current!.addEventListener("click", onClick);
  }, [onClick, onMouseLeave, onScrollStart]);

  useEffect(() => {
    const currentmoveBoxRef = moveBoxRef.current;
    const isMobile = /iphone|ipad|ipod|android/i.test(
      navigator.userAgent.toLowerCase(),
    );

    // 모바일인 경우에는 overflow-x가 터치식으로 바뀌기 때문에 할 필요가 없다.
    if (currentmoveBoxRef && !isMobile) {
      bindEvents();
    }

    return () => {
      if (currentmoveBoxRef) {
        currentmoveBoxRef.removeEventListener("mousedown", onScrollStart);
        currentmoveBoxRef.removeEventListener("touchstart", onScrollStart);
        currentmoveBoxRef.removeEventListener("mouseleave", onMouseLeave);
        currentmoveBoxRef.removeEventListener("click", onClick);
      }
      if (moveBoxRef.current) {
        moveBoxRef.current!.removeEventListener("mousemove", onScrollMove);
        moveBoxRef.current!.removeEventListener("touchmove", onScrollMove);
        moveBoxRef.current!.removeEventListener("mouseup", onScrollEnd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        moveBoxRef.current!.removeEventListener("touchend", onScrollEnd);
      }
    };
  }, [
    moveBoxRef,
    onScrollStart,
    onScrollMove,
    onScrollEnd,
    onClick,
    bindEvents,
    onMouseLeave,
  ]);

  useEffect(() => {
    updateMoveBoxWidths();
    window.addEventListener("resize", updateMoveBoxWidths);

    return () => {
      window.removeEventListener("resize", updateMoveBoxWidths);
    };
  }, [updateMoveBoxWidths]);

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
