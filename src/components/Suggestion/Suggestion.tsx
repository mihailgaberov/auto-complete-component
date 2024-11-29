import styles from "./Suggestion.module.scss";

interface Props {
  name: string;
  flag: string;
}

export default function Suggestion({ name, flag }: Props) {
  return (
    <li className={styles.container}>
      <span>{flag}</span>
      <span>{name}</span>
    </li>
  );
}
