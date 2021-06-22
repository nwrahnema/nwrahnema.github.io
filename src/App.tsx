import SpinningSelector from "./components/SpinningSelector";
import styles from "./App.module.scss";
import { useEffect, useRef, useState, MouseEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const randomOptions = [
  "in progress",
  "a test",
  "silly",
  "made in React",
  "overengineered",
  "a wheel",
];

const interactiveOptions = {
  github: "my GitHub",
  name: "my name",
  email: "my email",
  linkedin: "my LinkedIn",
  website: "my website",
};

function App() {
  const [selected, setSelected] = useState<string | undefined>(interactiveOptions.website);
  const timeoutComplete = useRef(false);

  const spinSpinner = () => {
    if (timeoutComplete.current) {
      setSelected(undefined);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      timeoutComplete.current = true;
      spinSpinner();
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const stopSpinner = (e: MouseEvent, value: string) => {
    e.stopPropagation();
    setSelected(value);
  };

  const pickRandomOption = () => {
    const randomOptionsDiff = randomOptions.filter((value) => value !== selected);

    return randomOptionsDiff[Math.floor(Math.random() * randomOptionsDiff.length)];
  };

  return (
    <div className={styles.page} onMouseMove={spinSpinner}>
      <header className={styles.header}>
        <a
          className={styles.title}
          href="/"
          onMouseMove={(e) => stopSpinner(e, interactiveOptions.name)}
        >
          Nima Rahnema
        </a>
        <div className={styles.socials}>
          <a
            href="mailto:nwrahnema@gmail.com"
            title="Email"
            onMouseMove={(e) => stopSpinner(e, interactiveOptions.email)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href="https://github.com/nwrahnema"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            onMouseMove={(e) => stopSpinner(e, interactiveOptions.github)}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/nima-rahnema"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            onMouseMove={(e) => stopSpinner(e, interactiveOptions.linkedin)}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.headline}>
          <span>This is</span>
          <div onMouseMove={(e) => stopSpinner(e, selected ?? pickRandomOption())}>
            <SpinningSelector
              options={randomOptions.concat(Object.values(interactiveOptions))}
              onOptionClick={(e) => stopSpinner(e, pickRandomOption())}
              selected={selected}
              optionClassName={styles.spinnerOption}
            ></SpinningSelector>
          </div>
        </h1>
        <section className={styles.aboutMe}>
          <h2>About Me</h2>
          <p>
            I'm a Software Engineer from Toronto. I graduated from the{" "}
            <a href="https://uwaterloo.ca/" target="_blank" rel="noopener noreferrer">
              University of Waterloo
            </a>{" "}
            with a Bachelor's of Computer Science.
          </p>
        </section>
        <section className={styles.forest}></section>
      </main>
    </div>
  );
}

export default App;
