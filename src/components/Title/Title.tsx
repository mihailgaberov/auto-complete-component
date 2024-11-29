import styles from "./Title.module.scss";

type Props = {
  content: string;
  size?: "small" | "big";
};

export default function Title({ content, size = "small" }: Props) {
  return <h2 className={`${styles.container} ${styles[size]}`}>{content}</h2>;
}
