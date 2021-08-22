import useWebAnimations from "@wellyshen/use-web-animations";
import { RefObject, useCallback, useRef } from "react";
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
        const startRotation = 0;
        const endRotation = -360;

        animate({
          id: SPIN_ID,
          keyframes: {
            transform: [`rotateX(${startRotation}deg)`, `rotateX(${endRotation}deg)`],
          },
          animationOptions: {
            duration: getDuration(startRotation, endRotation),
            iterations: Infinity,
          },
        });
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
      const endRotation = -360;
      animate({
        id: START_SPIN_ID,
        keyframes: {
          transform: [`rotateX(${curRotation}deg)`, `rotateX(${endRotation}deg)`],
        },
        animationOptions: {
          duration: getDuration(curRotation, endRotation),
          easing: "cubic-bezier(.47,0,.74,.71)", // ease-in animation following a sine wave
          iterations: 1,
        },
      });

      stoppingAt.current = null;
    }
  }, [animate, getAnimation, getDuration, ref]);

  const stopRotate = useCallback(
    (endRotation: number) => {
      const curRotation = getXRotation(ref);
      if (curRotation === null) {
        return;
      }

      if (endRotation !== curRotation && endRotation !== stoppingAt.current) {
        animate({
          id: STOP_SPIN_ID,
          keyframes: {
            transform: [`rotateX(${curRotation}deg)`, `rotateX(${endRotation}deg)`],
          },
          animationOptions: {
            duration: getDuration(curRotation, endRotation),
            easing: "cubic-bezier(.39,.58,.57,1)", // ease-out animation following a sine wave
            fill: "forwards",
            iterations: 1,
          },
        });

        stoppingAt.current = endRotation;
      }
    },
    [animate, getDuration, ref]
  );

  return { ref, rotate, stopRotate };
}

export default useXRotationAnimation;
