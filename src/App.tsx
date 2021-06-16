import SpinningSelector from "./components/SpinningSelector";
import styles from "./App.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.title}>Nima Rahnema</div>
        <div className={styles.socials}>
          <a href="mailto:nwrahnema@gmail.com">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="https://github.com/nwrahnema">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://linkedin.com/in/nima-rahnema">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.headline}>
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
      </div>
    </div>
  );
}

export default App;
