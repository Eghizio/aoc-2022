import { loadInput, sum } from "../utils";


const splitGroups = (rows: string[]) => {
  const groups = [];

  while (rows.length) {
    const group = rows.splice(0, 3);
    groups.push(group);
  }

  return groups;
};

const getCommons = (a: string, b: string, c: string) => {
  const ab = a.split("").filter(f => b.includes(f));
  const commons = ab.filter(f => c.includes(f));
  return commons;
};

const priority = (letter: string) => {
  const ascii = letter.charCodeAt(0);
  const isLowerCase = ascii >= 97;
  return isLowerCase ? ascii - 96 : ascii - 64 + 26;
};

const input = loadInput("input");
const rows = input.split("\n");

const groups = splitGroups(rows);
const letters = groups.flatMap(([a, b, c]) => [...new Set(getCommons(a, b, c))]);

const prios = letters.map(priority);

console.log(sum(prios));
