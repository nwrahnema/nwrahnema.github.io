import styles from "./SpinningSelector.module.scss";
import useWebAnimations, { AnimateOptions } from "@wellyshen/use-web-animations";
import { useEffect, MouseEvent } from "react";
import { getXRotation } from "../utils";

type Props = {
  options: string[];
  selected?: string;
  spinSpeed?: number;
  onOptionClick?: (e: MouseEvent, option: string) => void;
  optionClassName?: string;
};

function makeAnimation<T extends any[]>(id: string, options: (...args: T) => AnimateOptions) {
  return {
    id: id,
    options: (...args: T) => {
      return { id: id, ...options(...args) };
    },
  };
}

const SpinningSelector = ({
  options,
  selected,
  spinSpeed = 10,
  onOptionClick,
  optionClassName,
}: Props) => {
  const spin = makeAnimation("spin", () => {
    return {
      keyframes: {
        transform: ["rotateX(0deg)", "rotateX(-360deg)"],
      },
      animationOptions: {
        duration: (1000 * options.length) / spinSpeed,
        iterations: Infinity,
      },
    };
  });

  const startSpin = makeAnimation("startSpin", (curPosition: number) => {
    return {
      keyframes: {
        transform: [`rotateX(${curPosition}deg)`, "rotateX(-360deg)"],
      },
      animationOptions: {
        duration: (1000 * options.length) / spinSpeed,
        easing: "ease-in",
        iterations: 1,
      },
    };
  });

  const stopSpin = makeAnimation("stopSpin", (curPosition: number, endPosition: number) => {
    return {
      keyframes: {
        transform: [`rotateX(${curPosition}deg)`, `rotateX(${endPosition}deg)`],
      },
      animationOptions: {
        duration: (1000 * options.length) / spinSpeed,
        easing: "ease-out",
        fill: "forwards",
        iterations: 1,
      },
    };
  });

  const { ref, animate, getAnimation } = useWebAnimations<HTMLDivElement>({
    onFinish: ({ animate, animation }) => {
      const curAnimation = getAnimation();
      /** Chain spin animation to the end of startSpin animation only if it has not been
          replaced by another animation **/
      if (
        animation.id === startSpin.id &&
        curAnimation?.id === startSpin.id &&
        curAnimation?.playState === "finished"
      ) {
        animate(spin.options());
      }
    },
  });

  useEffect(() => {
    const curPosition = getXRotation(ref);
    if (curPosition === undefined) {
      return;
    }
    if (selected !== undefined) {
      const selectedIndex = options.indexOf(selected);
      if (selectedIndex < 0) {
        console.error(`Selected value ${selected} is not present in 'options' array.`);
        return;
      }
      let endPosition = (selectedIndex / options.length) * -360;
      if (endPosition !== curPosition) {
        if (endPosition > curPosition) {
          endPosition -= 360;
        }
        animate(stopSpin.options(curPosition, endPosition));
      }
    } else {
      const animation = getAnimation();
      if (animation && animation.id !== startSpin.id && animation.id !== spin.id) {
        animate(startSpin.options(curPosition));
      }
    }
  }, [animate, getAnimation, options, spinSpeed, selected, ref, spin, startSpin, stopSpin]);

  return (
    <div
      className={styles.container}
      style={{ "--spin-speed": spinSpeed, "--num-options": options.length }}
    >
      <div className={styles.optionsList} ref={ref} role="listbox">
        {options.map((option, i) => (
          <div
            key={i}
            className={`${styles.option} ${optionClassName}`}
            onMouseDown={(e) => {
              onOptionClick?.(e, option);
            }}
            style={{ "--spin-index": i }}
            aria-selected={option === selected ? "true" : "false"}
            role="option"
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
