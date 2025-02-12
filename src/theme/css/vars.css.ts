import { createGlobalThemeContract } from "@vanilla-extract/css";
import { tokens } from "../tokens";
import type { Theme } from "./types";

const getVarName = (_value: string | null, path: string[]) => path.join("-");

const baseTokens: Omit<Theme, "colors"> = tokens;
const baseVars = createGlobalThemeContract(baseTokens, getVarName);

type BaseVars = typeof baseVars;
export const vars = baseVars as BaseVars;

