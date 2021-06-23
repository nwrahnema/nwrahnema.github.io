import SpinningSelector from "./components/SpinningSelector";
import styles from "./App.module.scss";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
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
  website: "my website",
  github: "my GitHub",
  name: "my name",
  email: "my email",
  linkedin: "my LinkedIn",
};

function App() {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [aboutMeRef, aboutMeInView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });
  const timeout = useRef<NodeJS.Timeout>();

  const stopSpinner = useCallback((value: string) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    setSelected(value);
    timeout.current = setTimeout(() => setSelected(undefined), 5000);
  }, []);

  const pickRandomOption = useCallback(() => {
    const randomOptionsDiff = randomOptions.filter((value) => value !== selected);

    return randomOptionsDiff[Math.floor(Math.random() * randomOptionsDiff.length)];
  }, [selected]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selected === undefined) {
        stopSpinner(pickRandomOption());
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [selected, stopSpinner, pickRandomOption]);

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a
          className={styles.title}
          href="/"
          onMouseEnter={() => stopSpinner(interactiveOptions.name)}
        >
          Nima Rahnema
        </a>
        <div className={styles.socials}>
          <a
            href="mailto:nwrahnema@gmail.com"
            title="Email"
            onMouseEnter={() => stopSpinner(interactiveOptions.email)}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a
            href="https://github.com/nwrahnema"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            onMouseEnter={() => stopSpinner(interactiveOptions.github)}
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://linkedin.com/in/nima-rahnema"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            onMouseEnter={() => stopSpinner(interactiveOptions.linkedin)}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <h1 className={styles.headline}>
          <span>This is</span>
          <SpinningSelector
            options={Object.values(interactiveOptions).concat(randomOptions)}
            onOptionClick={() => stopSpinner(pickRandomOption())}
            selected={selected}
            optionClassName={styles.spinnerOption}
          ></SpinningSelector>
        </h1>
        <section
          className={`${styles.aboutMe} ${aboutMeInView ? styles.visible : ""}`}
          ref={aboutMeRef}
        >
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
