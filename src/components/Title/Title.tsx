import React from "react";
import styles from "./Title.module.scss";

type Props = {
  content: string;
  size?: "small" | "big";
  position?: "center" | "left";
};

export default React.memo(function Title({
  content,
  size = "small",
  position = "center",
}: Props) {
  return (
    <h2 className={`${styles.container} ${styles[size]} ${styles[position]}`}>
      {content}
    </h2>
  );
});
