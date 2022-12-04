import { loadInput, sum } from "../utils";


const toPairAssignment = (row: string) => {
  const [a, x] = row.split(",");
  const first = a.split("-").map(Number);
  const second = x.split("-").map(Number);
  return [first, second];
};

const createSections = (a: number, b: number) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

const getOverlaping = (ass: number[][][]) => ass.map(([[a, b], [x, y]]) => {
  const first = createSections(a, b);
  const second = createSections(x, y);

  const isOverlaping = first.some(f => second.includes(f));

  return isOverlaping ? 1 : 0;
});

const input = loadInput("input");
const rows = input.split("\n");

const assignments = rows.map(toPairAssignment);
const overlaps = getOverlaping(assignments);

console.log(sum(overlaps));
