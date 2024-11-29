import styles from "./App.module.scss";
import Autocomplete from "./components/Autocomplete";
import Title from "./components/Title";

function App() {
  return (
    <div className={styles.container}>
      <Title />
      <Autocomplete />
    </div>
  );
}

export default App;
