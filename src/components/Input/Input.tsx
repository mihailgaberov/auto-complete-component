import { useEffect, useRef, KeyboardEvent } from "react";

import styles from "./Input.module.scss";

interface Props {
  onChangeHandler: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onFocusOut: () => void;
  value: string;
}

export default function Input({
  onChangeHandler,
  onKeyDown,
  onFocus,
  onFocusOut,
  value,
}: Props) {
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputSearchRef.current) {
      onChangeHandler(e.target.value);
    }
  };

  return (
    <input
      ref={inputSearchRef}
      type="text"
      onChange={handleInputChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onFocusOut}
      value={value}
      className={styles.container}
      placeholder="Type a country name..."
    />
  );
}
