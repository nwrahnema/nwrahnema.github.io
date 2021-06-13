import styles from "./SpinningSelector.module.scss";
import useWebAnimations, { AnimateOptions } from "@wellyshen/use-web-animations";
import { useEffect, useRef, useState } from "react";

type Props = {
  spinSpeed?: number;
  options: string[];
};

/**
 * Animation for starting the spinner from a stopped position. `start` is a ratio
 * between 0 and 1 indicating the percentage of a full rotation to start at.
 */
const startSpinAnimation = (props: Props, start: number): AnimateOptions => {
  return {
    id: "startSpin",
    keyframes: {
      transform: [`rotateX(${start * -360}deg)`, "rotateX(-360deg)"],
    },
    animationOptions: {
      duration: (1000 * props.options.length) / (props.spinSpeed || 10),
      easing: "ease-in",
      iterations: 1,
    },
  };
};

/**
 * Animation for the spinner in motion.
 */
const spinAnimation = (props: Props): AnimateOptions => {
  return {
    id: "spin",
    keyframes: {
      transform: ["rotateX(0)", "rotateX(-360deg)"],
    },
    animationOptions: {
      duration: (1000 * props.options.length) / (props.spinSpeed || 10),
      iterations: Infinity,
    },
  };
};

/**
 * Animation for stopping the spinner. `start` and `end` are ratios between
 * 0 and 1 indicating the percentage of a full rotation to start and end at.
 */
const stopSpinAnimation = (props: Props, start: number, end: number): AnimateOptions => {
  if (start >= end) {
    end += 1;
  }

  return {
    id: "stopSpin",
    keyframes: {
      transform: [`rotateX(${start * -360}deg)`, `rotateX(${end * -360}deg)`],
    },
    animationOptions: {
      duration: (1000 * props.options.length) / (props.spinSpeed || 10),
      easing: "ease-out",
      fill: "forwards",
      iterations: 1,
    },
  };
};

const SpinningSelector = (props: Props) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const stoppedAt = useRef(0);

  const { ref, animate, getAnimation } = useWebAnimations<HTMLDivElement>({
    onFinish: ({ animate, animation }) => {
      // Chain spin to the end of startSpin if startSpin is the currently running
      // animation
      if (animation.id === "startSpin" && animation.id === getAnimation()?.id) {
        animate(spinAnimation(props));
      }
    },
  });

  useEffect(() => {
    if (selected) {
      const animation = getAnimation();
      const currentTime = animation?.currentTime;
      const iterationDuration = animation?.effect?.getComputedTiming().duration as number;
      if (currentTime && iterationDuration) {
        stoppedAt.current = props.options.indexOf(selected) / props.options.length;
        animate(
          stopSpinAnimation(
            props,
            (currentTime % iterationDuration) / iterationDuration,
            stoppedAt.current
          )
        );
      }
    } else {
      animate(startSpinAnimation(props, stoppedAt.current));
    }
  }, [animate, getAnimation, props, selected]);

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
            onMouseDown={() => {
              selected ? setSelected(undefined) : setSelected(option);
            }}
            style={{ "--spin-index": i }}
          >
            {option}
          </div>
        ))}
      </div>
      <div className={styles.placeholderList}>
        {props.options.map((option, i) => (
          <div aria-hidden="true" className={styles.placeholder} key={i}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinningSelector;
