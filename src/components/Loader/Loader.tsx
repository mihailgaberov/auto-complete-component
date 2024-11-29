import styles from "./Loader.module.scss";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className={styles.loading} data-testid="loader">
      <div className={styles.spinner} />
      <div>{message}</div>
    </div>
  );
}
