import useWebAnimations, { AnimateOptions } from "@wellyshen/use-web-animations";
import { RefObject, useCallback, useMemo, useRef } from "react";
import { getXRotation } from "../utils";

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

function useRotationAnimation<T extends HTMLElement>(rotationLength: number): Return<T> {
  const getDuration = useCallback(
    (startRotation: number, endRotation: number) => {
      return 1000 * rotationLength * ((endRotation - startRotation) / -360);
    },
    [rotationLength]
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

  const { ref, animate, getAnimation } = useWebAnimations<T>({
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

  const rotate = useCallback(() => {
    const curRotation = getXRotation(ref);
    if (curRotation === undefined) {
      return;
    }

    const animation = getAnimation();
    if (!animation || (animation.id !== startSpin.id && animation.id !== spin.id)) {
      animate(startSpin.options(curRotation));
      stoppingAt.current = undefined;
    }
  }, [animate, getAnimation, ref, spin.id, startSpin]);

  const stopRotate = useCallback(
    (endRotation: number) => {
      const curRotation = getXRotation(ref);
      if (curRotation === undefined) {
        return;
      }

      if (endRotation !== curRotation && endRotation !== stoppingAt.current) {
        animate(stopSpin.options(curRotation, endRotation));
        stoppingAt.current = endRotation;
      }
    },
    [animate, ref, stopSpin]
  );

  return { ref, rotate, stopRotate };
}

export default useRotationAnimation;
