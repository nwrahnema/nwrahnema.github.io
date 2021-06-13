import styles from "./SpinningSelector.module.scss";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useEffect, useState } from "react";
import { getXRotation } from "../utils";

type Props = {
  spinSpeed?: number;
  options: string[];
};

const SpinningSelector = (props: Props) => {
  const [selected, setSelected] = useState<string | undefined>(undefined);

  const { ref, animate, getAnimation } = useWebAnimations<HTMLDivElement>({
    onFinish: ({ animate, animation }) => {
      // Chain spin animation to the end of startSpin animation if the startSpin
      // animation is the currently active one
      if (animation.id === "startSpin" && getAnimation()?.playState === "finished") {
        animate({
          id: "spin",
          keyframes: {
            transform: ["rotateX(0deg)", "rotateX(-360deg)"],
          },
          animationOptions: {
            duration: (1000 * props.options.length) / (props.spinSpeed || 10),
            iterations: Infinity,
          },
        });
      }
    },
  });

  useEffect(() => {
    let curPosition = getXRotation(ref);
    if (curPosition !== undefined) {
      if (selected !== undefined) {
        let endPosition = (props.options.indexOf(selected) / props.options.length) * -360;
        if (endPosition > curPosition) {
          endPosition -= 360;
        }
        animate({
          id: "stopSpin",
          keyframes: {
            transform: [`rotateX(${curPosition}deg)`, `rotateX(${endPosition}deg)`],
          },
          animationOptions: {
            duration: (1000 * props.options.length) / (props.spinSpeed || 10),
            easing: "ease-out",
            fill: "forwards",
            iterations: 1,
          },
        });
      } else {
        animate({
          id: "startSpin",
          keyframes: {
            transform: [`rotateX(${curPosition}deg)`, "rotateX(-360deg)"],
          },
          animationOptions: {
            duration: (1000 * props.options.length) / (props.spinSpeed || 10),
            easing: "ease-in",
            iterations: 1,
          },
        });
      }
    }
  }, [animate, getAnimation, props, ref, selected]);

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
