import styles from "./Suggestion.module.scss";

interface Props {
  name: string;
  flag: string;
  onClickHandler: (name: string) => void;
}

export default function Suggestion({ name, flag, onClickHandler }: Props) {
  return (
    <li className={styles.container} onClick={() => onClickHandler(name)}>
      <span>{flag}</span>
      <span>{name}</span>
    </li>
  );
}
