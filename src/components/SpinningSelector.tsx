import styles from "./SpinningSelector.module.scss";
import useWebAnimations from "@wellyshen/use-web-animations";
import { useEffect, MouseEvent } from "react";
import { getXRotation } from "../utils";

type Props = {
  selected?: string;
  spinSpeed?: number;
  onMouseDown?: (e: MouseEvent) => void;
  onMouseMove?: (e: MouseEvent) => void;
  options: string[];
};

const SpinningSelector = ({
  selected,
  spinSpeed = 10,
  onMouseDown,
  onMouseMove,
  options,
}: Props) => {
  const { ref, animate, getAnimation } = useWebAnimations<HTMLDivElement>({
    onFinish: ({ animate, animation }) => {
      const curAnimation = getAnimation();
      // Chain spin animation to the end of startSpin animation only if it has not been
      // replaced by another animation
      if (
        animation.id === "startSpin" &&
        curAnimation?.id === "startSpin" &&
        curAnimation?.playState === "finished"
      ) {
        animate({
          id: "spin",
          keyframes: {
            transform: ["rotateX(0deg)", "rotateX(-360deg)"],
          },
          animationOptions: {
            duration: (1000 * options.length) / spinSpeed,
            iterations: Infinity,
          },
        });
      }
    },
  });

  useEffect(() => {
    const curPosition = getXRotation(ref);
    if (curPosition !== undefined) {
      if (selected !== undefined) {
        const selectedIndex = options.indexOf(selected);
        if (selectedIndex < 0) {
          console.error(`Selected value ${selected} is not present in 'options' array.`);
          return;
        }
        let endPosition = (selectedIndex / options.length) * -360;
        if (endPosition >= curPosition) {
          endPosition -= 360;
        }
        animate({
          id: "stopSpin",
          keyframes: {
            transform: [`rotateX(${curPosition}deg)`, `rotateX(${endPosition}deg)`],
          },
          animationOptions: {
            duration: (1000 * options.length) / spinSpeed,
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
            duration: (1000 * options.length) / spinSpeed,
            easing: "ease-in",
            iterations: 1,
          },
        });
      }
    }
  }, [animate, getAnimation, options, spinSpeed, ref, selected]);

  return (
    <div
      className={styles.container}
      onMouseMove={onMouseMove}
      style={{ "--spin-speed": spinSpeed, "--num-options": options.length }}
    >
      <div className={styles.optionsList} ref={ref}>
        {options.map((option, i) => (
          <div
            key={i}
            className={styles.option}
            onMouseDown={onMouseDown}
            style={{ "--spin-index": i }}
          >
            {option}
          </div>
        ))}
      </div>
      {/* This gives the SpinningSelector the correct width */}
      <div className={styles.placeholderList}>
        {options.map((option, i) => (
          <div aria-hidden="true" className={styles.placeholder} key={i}>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpinningSelector;
