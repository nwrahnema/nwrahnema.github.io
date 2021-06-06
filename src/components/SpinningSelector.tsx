import { useEffect } from "react";
import styles from "./SpinningSelector.module.scss";
import useWebAnimations from "@wellyshen/use-web-animations";

type OptionProps = {
  value: string;
  spinDuration: number;
  initialDelay: number;
  iterationDelay: number;
};

const Option = (props: OptionProps) => {
  const { ref, getAnimation } = useWebAnimations<HTMLDivElement>({
    autoPlay: false,
    keyframes: {
      opacity: [0, 1, 0],
      top: ["-1em", "1em"],
    },
    animationOptions: {
      duration: props.spinDuration,
      iterations: 1,
    },
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;
    setTimeout(() => {
      interval = setInterval(() => {
        getAnimation()?.play();
      }, props.iterationDelay);
    }, props.initialDelay);
    return () => clearInterval(interval);
  }, [props.initialDelay, props.iterationDelay, getAnimation]);

  return (
    <div className={styles.option} ref={ref}>
      {props.value}
    </div>
  );
};

type Props = {
  spinDuration?: number;
  options: string[];
};

const SpinningSelector = (props: Props) => {
  const spinDuration = props.spinDuration || 1000;

  return (
    <div className={styles.container}>
      {props.options.map((option, i) => (
        <Option
          key={i}
          value={option}
          spinDuration={spinDuration}
          initialDelay={(i * spinDuration) / 2}
          iterationDelay={spinDuration * (props.options.length / 2 - 1)}
        />
      ))}
    </div>
  );
};

export default SpinningSelector;
