"use client";

import { useCallback, useState } from "react";
import styles from "./toggleButton.module.scss";

type ToggleButtonProps = {
  value?: boolean;
  onChange: (value: boolean) => void;
};

const ToggleButton = (props: ToggleButtonProps) => {
  const [value, setValue] = useState<boolean>(props.value || false);

  const handleChange = useCallback(() => {
    setValue(!value);
    props.onChange(!value);
  }, [props, value]);

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
