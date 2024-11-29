import styles from "./App.module.scss";
import Autocomplete from "./components/Autocomplete";
import Title from "./components/Title";

function App() {
  return (
    <div className={styles.container}>
      <Title content="Countries in Europe" size="big" />
      <Autocomplete />
    </div>
  );
}

export default App;
