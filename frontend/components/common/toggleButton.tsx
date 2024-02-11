"use client";

import { useCallback } from "react";
import styles from "./toggleButton.module.scss";

type ToggleButtonProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

const ToggleButton = ({ value = false, onChange }: ToggleButtonProps) => {
  const handleChange = useCallback(() => {
    onChange(!value);
  }, [value, onChange]);

  return (
    <button
      className={`${styles.btn} ${value ? styles.active : styles.none}`}
      onClick={handleChange}
    >
      <div className={styles.circle} />
    </button>
  );
};

export default ToggleButton;
