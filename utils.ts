import { readFileSync } from "fs";

export const loadInput = (file: string = "input"): string => readFileSync(file, { encoding: "utf-8" });

export const sum = (arr: number[]) => arr.reduce((acc, el) => acc + el, 0);