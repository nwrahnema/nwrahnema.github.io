import styles from "./SpinningSelector.module.scss";
import useWebAnimations from "@wellyshen/use-web-animations";

type Props = {
  spinDuration?: number;
  options: string[];
};

const SpinningSelector = (props: Props) => {
  return (
    <div
      className={styles.container}
      style={{ "--spin-duration": props.spinDuration, "--num-options": props.options.length }}
    >
      {props.options.map((option, i) => (
        <div key={i} className={styles.option} style={{ "--spin-index": i }}>
          {option}
        </div>
      ))}
    </div>
  );
};

export default SpinningSelector;
