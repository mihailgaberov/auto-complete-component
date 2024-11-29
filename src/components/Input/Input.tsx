import { useEffect, useRef } from "react";
import styles from "./Input.module.scss";

interface Props {
  onChangeHandler: (value: string) => void;
  value: string;
}

export default function Input({ onChangeHandler, value }: Props) {
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
      value={value}
      className={styles.container}
      placeholder="Type a country name..."
    />
  );
}
