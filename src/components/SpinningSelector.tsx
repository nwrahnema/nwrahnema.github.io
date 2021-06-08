import styles from "./SpinningSelector.module.scss";
import useWebAnimations from "@wellyshen/use-web-animations";

type Props = {
  spinSpeed?: number;
  options: string[];
};

const SpinningSelector = (props: Props) => {
  return (
    <div
      className={styles.container}
      style={{ "--spin-speed": props.spinSpeed, "--num-options": props.options.length }}
    >
      <div className={styles.optionsList}>
        {props.options.map((option, i) => (
          <div key={i} className={styles.option} style={{ "--spin-index": i }}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinningSelector;
