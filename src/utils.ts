import { RefObject } from "react";

export function getXRotation<T extends HTMLElement>(ref: RefObject<T>): number | undefined {
  if (ref.current === null) {
    return undefined;
  }

  const st = window.getComputedStyle(ref.current, null);
  const tr = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           undefined;

  if (tr === undefined || tr === "none") {
    return 0;
  }
  
  
  const values = tr.split('(')[1].split(')')[0].split(',');
  let cosx = 0;
  let sinx = 0;
  switch (tr.split('(')[0]) {
    case "matrix":
      // 2d matrix - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix()
      cosx = parseFloat(values[3]);
      sinx = 0;
      break;
    case "matrix3d":
      // 3d rotation matrix - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX()
      cosx = parseFloat(values[5]);
      sinx = parseFloat(values[9]);
      break;
    default:
      console.error(`Transform value ${tr} was not recognized.`)
  }
  
  let radians = Math.atan2(sinx, cosx);
  if ( radians < 0 ) {
    radians += (2 * Math.PI);
  }
  return Math.round(radians * (180/Math.PI));
}