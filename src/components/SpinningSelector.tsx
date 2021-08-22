import styles from "./SpinningSelector.module.scss";
import useXRotationAnimation from "hooks/useXRotationAnimation";
import { MouseEvent, useEffect } from "react";

type Props = {
  options: string[];
  selected?: string;
  // spinSpeed is in units 'options per second'
  spinSpeed?: number;
  onOptionClick?: (e: MouseEvent, option: string) => void;
  optionClassName?: string;
};

const SpinningSelector = ({
  options,
  selected,
  spinSpeed = 10,
  onOptionClick,
  optionClassName,
}: Props) => {
  const { ref, rotate, stopRotate } = useXRotationAnimation<HTMLDivElement>(
    options.length / spinSpeed
  );

  useEffect(() => {
    if (selected === undefined) {
      rotate();
    } else {
      const index = options.indexOf(selected);
      if (index < 0) {
        throw new Error(`Option '${selected}' is not present in 'options' array.`);
      }
      const stopRotation = (index / options.length) * -360;

      stopRotate(stopRotation - 360);
    }
  }, [rotate, stopRotate, selected, options]);

  return (
    <div className={styles.container} style={{ "--num-options": options.length }}>
      <div className={styles.optionsList} ref={ref} role="listbox">
        {options.map((option, i) => (
          <div
            style={{ "--option-index": i }}
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
