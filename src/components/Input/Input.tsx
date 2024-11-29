import styles from "./Input.module.scss";

export default function Input() {
  return (
    <input
      type="text"
      className={styles.container}
      placeholder="Start typing..."
    />
  );
}
