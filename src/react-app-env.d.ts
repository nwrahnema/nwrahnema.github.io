/// <reference types="react-scripts" />

import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    // Add a CSS Custom Property
    '--spin-index'?: number;
    '--spin-speed'?: number;
    '--num-options'?: number;
  }
}