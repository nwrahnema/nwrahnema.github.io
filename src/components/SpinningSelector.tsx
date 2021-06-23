import styles from "./SpinningSelector.module.scss";
import useWebAnimations, { AnimateOptions } from "@wellyshen/use-web-animations";
import { MouseEvent, useCallback, useEffect, useMemo, useRef } from "react";
import { getXRotation } from "../utils";

type Props = {
  options: string[];
  selected?: string;
  // spinSpeed is in units 'options per second'
  spinSpeed?: number;
  onOptionClick?: (e: MouseEvent, option: string) => void;
  optionClassName?: string;
};

const animateOptionsWithId = <T extends any[]>(
  id: string,
  options: (...args: T) => AnimateOptions
) => ({
  id: id,
  options: (...args: T) => ({
    id: id,
    ...options(...args),
  }),
});

const SpinningSelector = ({
  options,
  selected,
  spinSpeed = 10,
  onOptionClick,
  optionClassName,
}: Props) => {
  const getDuration = useCallback(
    (startRotation: number, endRotation: number) => {
      const optionsDistance = options.length * ((endRotation - startRotation) / -360);
      return (1000 * optionsDistance) / spinSpeed;
    },
    [options.length, spinSpeed]
  );

  const spin = useMemo(
    () =>
      animateOptionsWithId("spin", () => {
        const startRotation = 0;
        const endRotation = -360;

        return {
          keyframes: {
            transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
          },
          animationOptions: {
            duration: getDuration(startRotation, endRotation),
            iterations: Infinity,
          },
        };
      }),
    [getDuration]
  );

  const startSpin = useMemo(
    () =>
      animateOptionsWithId("startSpin", (startRotation: number) => {
        const endRotation = -360;

        return {
          keyframes: {
            transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
          },
          animationOptions: {
            duration: getDuration(startRotation, endRotation),
            easing: "cubic-bezier(.47,0,.74,.71)", // ease-in animation following a sine wave
            iterations: 1,
          },
        };
      }),
    [getDuration]
  );

  const stopSpin = useMemo(
    () =>
      animateOptionsWithId("stopSpin", (startRotation: number, endRotation: number) => ({
        keyframes: {
          transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
        },
        animationOptions: {
          duration: getDuration(startRotation, endRotation),
          easing: "cubic-bezier(.39,.58,.57,1)", // ease-out animation following a sine wave
          fill: "forwards",
          iterations: 1,
        },
      })),
    [getDuration]
  );

  const optionToRotation = useCallback(
    (option: string): number => {
      const index = options.indexOf(option);
      if (index < 0) {
        throw new Error(`Option '${option}' is not present in 'options' array.`);
      }
      return (index / options.length) * -360;
    },
    [options]
  );

  const { ref, animate, getAnimation } = useWebAnimations<HTMLDivElement>({
    onFinish: ({ animate, animation }) => {
      const curAnimation = getAnimation();
      /** Chain spin animation to the end of startSpin animation only if it has not been
          overridden by another animation **/
      if (
        animation.id === startSpin.id &&
        curAnimation?.id === startSpin.id &&
        curAnimation?.playState === "finished"
      ) {
        animate(spin.options());
      }
    },
  });

  const stoppingAt = useRef<number | undefined>(0);

  useEffect(() => {
    let curPosition = getXRotation(ref);
    if (curPosition === undefined) {
      return;
    }
    // X rotation is returned counter-clockwise. Make negative to match with CSS animation rules.
    curPosition *= -1;

    if (selected !== undefined) {
      let endPosition = optionToRotation(selected) - 360;
      if (endPosition !== curPosition && endPosition !== stoppingAt.current) {
        animate(stopSpin.options(curPosition, endPosition));
        stoppingAt.current = endPosition;
      }
    } else {
      const animation = getAnimation();
      if (!animation || (animation.id !== startSpin.id && animation.id !== spin.id)) {
        animate(startSpin.options(curPosition));
        stoppingAt.current = undefined;
      }
    }
  }, [animate, getAnimation, selected, ref, optionToRotation, spin.id, startSpin, stopSpin]);

  return (
    <div
      className={styles.container}
      style={{ "--spin-speed": spinSpeed, "--num-options": options.length }}
    >
      <div className={styles.optionsList} ref={ref} role="listbox">
        {options.map((option, i) => (
          <div
            style={{ "--spin-index": i }}
            key={i}
            className={`${styles.option} ${optionClassName}`}
            onMouseDown={(e) => {
              onOptionClick?.(e, option);
            }}
            role="option"
            aria-selected={option === selected ? "true" : "false"}
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
