import { useEffect, useRef } from "react";
import styles from "./Input.module.scss";

export default function Input() {
  const inputSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  return (
    <input
      ref={inputSearchRef}
      type="text"
      className={styles.container}
      placeholder="Start typing..."
    />
  );
}
