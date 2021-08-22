import useWebAnimations, { AnimateOptions } from "@wellyshen/use-web-animations";
import { RefObject, useCallback, useMemo, useRef } from "react";
import { getXRotation } from "utils";

interface Rotate {
  (): void;
}

interface StopRotate {
  (endRotation: number): void;
}

interface Return<T> {
  ref: RefObject<T>;
  rotate: Rotate;
  stopRotate: StopRotate;
}

const SPIN_ID = "spin";
const START_SPIN_ID = "startSpin";
const STOP_SPIN_ID = "stopSpin";

function useXRotationAnimation<T extends HTMLElement>(rotationLength: number): Return<T> {
  const getDuration = useCallback(
    (startRotation: number, endRotation: number) => {
      return 1000 * rotationLength * ((endRotation - startRotation) / -360);
    },
    [rotationLength]
  );

  const spinOptions = useCallback((): AnimateOptions => {
    const startRotation = 0;
    const endRotation = -360;

    return {
      id: SPIN_ID,
      keyframes: {
        transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
      },
      animationOptions: {
        duration: getDuration(startRotation, endRotation),
        iterations: Infinity,
      },
    };
  }, [getDuration]);

  const startSpinOptions = useCallback(
    (startRotation: number): AnimateOptions => {
      const endRotation = -360;

      return {
        id: START_SPIN_ID,
        keyframes: {
          transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
        },
        animationOptions: {
          duration: getDuration(startRotation, endRotation),
          easing: "cubic-bezier(.47,0,.74,.71)", // ease-in animation following a sine wave
          iterations: 1,
        },
      };
    },
    [getDuration]
  );

  const stopSpinOptions = useCallback(
    (startRotation: number, endRotation: number): AnimateOptions => ({
      id: STOP_SPIN_ID,
      keyframes: {
        transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
      },
      animationOptions: {
        duration: getDuration(startRotation, endRotation),
        easing: "cubic-bezier(.39,.58,.57,1)", // ease-out animation following a sine wave
        fill: "forwards",
        iterations: 1,
      },
    }),
    [getDuration]
  );

  const { ref, animate, getAnimation } = useWebAnimations<T>({
    onFinish: ({ animate, animation }) => {
      const curAnimation = getAnimation();
      /** Chain spin animation to the end of startSpin animation only if it has not been
          overridden by another animation **/
      if (
        animation.id === START_SPIN_ID &&
        curAnimation?.id === START_SPIN_ID &&
        curAnimation?.playState === "finished"
      ) {
        animate(spinOptions());
      }
    },
  });

  const stoppingAt = useRef<number | null>(0);

  const rotate = useCallback(() => {
    const curRotation = getXRotation(ref);
    if (curRotation === null) {
      return;
    }

    const animation = getAnimation();
    if (!animation || (animation.id !== START_SPIN_ID && animation.id !== SPIN_ID)) {
      animate(startSpinOptions(curRotation));
      stoppingAt.current = null;
    }
  }, [animate, getAnimation, ref, startSpinOptions]);

  const stopRotate = useCallback(
    (endRotation: number) => {
      const curRotation = getXRotation(ref);
      if (curRotation === null) {
        return;
      }

      if (endRotation !== curRotation && endRotation !== stoppingAt.current) {
        animate(stopSpinOptions(curRotation, endRotation));
        stoppingAt.current = endRotation;
      }
    },
    [animate, ref, stopSpinOptions]
  );

  return { ref, rotate, stopRotate };
}

export default useXRotationAnimation;
