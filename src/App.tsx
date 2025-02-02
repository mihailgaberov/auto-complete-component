import Autocomplete from "@/components/Autocomplete";
import Title from "@/components/Title";

import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Title content="Countries in Europe" size="big" />
      <Autocomplete />
    </div>
  );
}

export default function AppWrapper() {
  return <App />;
}
