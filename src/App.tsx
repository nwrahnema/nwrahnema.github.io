import SpinningSelector from "./components/SpinningSelector";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.title}>
          <div>This is</div>
          <SpinningSelector
            options={[
              "my website",
              "stupid",
              "a test",
              "silly",
              "not funny",
              "dumb",
              "pointless",
              "overengineered",
              "a waste of time",
            ]}
          ></SpinningSelector>
        </div>
      </header>
    </div>
  );
}

export default App;
