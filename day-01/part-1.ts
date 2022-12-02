import { loadInput } from "../utils";


const sum = (arr: number[]) => arr.reduce((acc, el) => acc + el, 0);

const input = loadInput("input");
const elfs = input.split("\n\n");

const cals = elfs.map(cals => cals.split("\n").map(cal => parseInt(cal, 10)));
const calsPerElf = cals.map(sum);

console.log(Math.max(...calsPerElf));
