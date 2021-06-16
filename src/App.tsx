import SpinningSelector from "./components/SpinningSelector";
import styles from "./App.module.scss";
import { useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const randomOptions = [
  "my website",
  "stupid",
  "a test",
  "silly",
  "not funny",
  "dumb",
  "pointless",
  "overengineered",
  "a waste of time",
];

const interactiveOptions = {
  name: "my name",
  email: "my email",
  github: "my GitHub",
  linkedin: "my LinkedIn",
  spinner: "a spinny thing",
};

function App() {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const spinSpinner = () => {
    setSelected(undefined);
  };

  const stopSpinner = (e: MouseEvent, value: string) => {
    e.stopPropagation();
    setSelected(value);
  };

  return (
    <div className={styles.page} onMouseMove={spinSpinner}>
      <header className={styles.header}>
        <div className={styles.title} onMouseMove={(e) => stopSpinner(e, interactiveOptions.name)}>
          Nima Rahnema
        </div>
        <div className={styles.socials}>
          <a
            href="mailto:nwrahnema@gmail.com"
            onMouseMove={(e) => stopSpinner(e, interactiveOptions.email)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href="https://github.com/nwrahnema"
            onMouseMove={(e) => stopSpinner(e, interactiveOptions.github)}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/nima-rahnema"
            onMouseMove={(e) => stopSpinner(e, interactiveOptions.linkedin)}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </header>
      <div className={styles.main}>
        <div className={styles.headline}>
          <span>This is</span>
          <SpinningSelector
            onMouseDown={() => {
              const randomOptionsDiff = [...randomOptions];
              if (selected !== undefined) {
                randomOptionsDiff.splice(randomOptionsDiff.indexOf(selected), 1);
              }
              setSelected(randomOptionsDiff[Math.floor(Math.random() * randomOptionsDiff.length)]);
            }}
            onMouseMove={(e) => {
              stopSpinner(e, selected ?? interactiveOptions.spinner);
            }}
            options={Object.values(interactiveOptions).concat(randomOptions)}
            selected={selected}
          ></SpinningSelector>
        </div>
      </div>
    </div>
  );
}

export default App;
