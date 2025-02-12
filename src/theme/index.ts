import { DefaultTheme } from "styled-components";
import base from "./base";
import { Breakpoints, MediaQueries, ZIndices } from "./types";
import { vars } from "./css/vars.css";

export interface AppTheme {
  siteWidth: number;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  spacing: typeof vars.space;
  shadows: typeof vars.shadows;
  radii: typeof vars.radii;
  zIndices: ZIndices;
}

const theme: DefaultTheme = {
  ...base,
};

export default theme;
