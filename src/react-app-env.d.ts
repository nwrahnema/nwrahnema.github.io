/// <reference types="react-scripts" />

import * as CSS from "csstype";

declare module "csstype" {
  interface Properties {
    "--num-options"?: number;
    "--option-index"?: number;
  }
}
