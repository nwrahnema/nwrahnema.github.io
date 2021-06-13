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
  
  // rotation matrix - https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotateX()
  
  const values = tr.split('(')[1].split(')')[0].split(',');
  const cosx = parseFloat(values[5]);
  const sinx = parseFloat(values[9]);
  
  return Math.round(Math.atan2(sinx, cosx) * (-180/Math.PI));
}