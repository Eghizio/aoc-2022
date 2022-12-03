import { loadInput, sum } from "../utils";


const getCommons = (a: string, b: string) => a.split("").filter(f => b.includes(f));

const priority = (letter: string) => {
  const ascii = letter.charCodeAt(0);
  const isLowerCase = ascii >= 97;
  return isLowerCase ? ascii - 96 : ascii - 64 + 26;
};

const input = loadInput("input");
const rows = input.split("\n");

const compartments = rows.map(row => [row.slice(0, row.length / 2), row.slice(row.length / 2)]);
const commons = compartments.map(([a, b]) => getCommons(a, b));

const letters = commons.flatMap(com => [...new Set(com)]);

const prios = letters.map(priority);

console.log(sum(prios));
