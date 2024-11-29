import useFetch from "../../hooks/useFetch";
import Input from "../Input";

import styles from "./Autocomplete.module.scss";

export default function Autocomplete() {
  const { data, loading, error } = useFetch();

  console.log(">>> loading: ", loading);
  console.log(">>> error: ", error);
  console.log(">>> data: ", data);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <Input />
    </div>
  );
}
