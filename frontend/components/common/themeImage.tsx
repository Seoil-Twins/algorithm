"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

type ThemeImageProps = {
  lightSrc: string;
  darkSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

const ThemeImage = ({
  lightSrc,
  darkSrc,
  alt,
  width,
  height,
  className,
}: ThemeImageProps) => {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div style={{ width, height }} className={className}>
      {isMounted && (
        <Image
          src={resolvedTheme !== "dark" ? lightSrc : darkSrc}
          alt={alt}
          width={width}
          height={height}
        />
      )}
    </div>
  );
};

export default ThemeImage;
