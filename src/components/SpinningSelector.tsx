import styles from "./SpinningSelector.module.scss";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useState } from "react";

type Props = {
  spinSpeed?: number;
  options: string[];
};

const SpinningSelector = (props: Props) => {
  const [isSpinning, setIsSpinning] = useState(true);

  const { ref, getAnimation } = useWebAnimations<HTMLDivElement>({
    keyframes: {
      transform: ["rotateX(0)", "rotateX(-360deg)"],
    },
    animationOptions: {
      duration: (1000 * props.options.length) / (props.spinSpeed || 10),
      iterations: Infinity,
    },
  });

  const toggleSpinning = () => {
    getAnimation()?.updatePlaybackRate(isSpinning ? 0 : 1);
    setIsSpinning(!isSpinning);
  };

  return (
    <div
      className={styles.container}
      style={{ "--spin-speed": props.spinSpeed, "--num-options": props.options.length }}
    >
      <div className={styles.optionsList} ref={ref}>
        {props.options.map((option, i) => (
          <div
            key={i}
            className={styles.option}
            onMouseDown={toggleSpinning}
            style={{ "--spin-index": i }}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinningSelector;
