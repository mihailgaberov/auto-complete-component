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

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className={styles.highlight}>
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className={`${styles.container} ${isSelected ? styles.selected : ""}`}>
      <span className={styles.flag}>{flag}</span>
      {highlightText(name, searchValue)}
    </div>
  );
}
