import styles from "./Suggestion.module.scss";

interface Props {
  name: string;
  flag: string;
  searchValue: string;
  isSelected?: boolean;
}

export default function Suggestion({
  name,
  flag,
  searchValue,
  isSelected,
}: Props) {
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }

    const regex = new RegExp(`^(${highlight})`, "i");
    const match = text.match(regex);

    if (match) {
      return (
        <span>
          <mark className={styles.highlight} data-testid="highlighted-text">
            {match[0]}
          </mark>
          {text.substring(match[0].length)}
        </span>
      );
    }

    return <span>{text}</span>;
  };

  return (
    <div className={`${styles.container} ${isSelected ? styles.selected : ""}`}>
      <span className={styles.flag}>{flag}</span>
      {highlightText(name, searchValue)}
    </div>
  );
}
