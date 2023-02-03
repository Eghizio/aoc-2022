import { loadInput } from "../utils";


type Move = { amount: number, from: number, to: number };
type Stacks = Map<number, string[]>;

const parseMoves = (move: string): Move => {
  const [amount, from, to] = (move.match(/\d+/g) || []).map(Number);
  return { amount, from, to };
};

const parseRow = (row: string) => {
  const crates = [];
  const arr = row.split("");
  while (arr.length) {
    const crate = arr.splice(0, 4)[1].trim();
    crates.push(crate);
  }
  return crates;
};

const createStacks = (stackIds: string): Stacks => {
  const digits = stackIds.match(/\d+/g) || [];
  const ids = digits.map(Number).sort();
  const stacks = new Map<number, string[]>(ids.map(id => [id, []]));
  return stacks;
};

const populateStacks = (crates: string[][], stacks: Stacks) => {
  for (const row of crates) {
    for (let i = 1; i <= row.length; i++) {
      const crate = row[i - 1];
      if (crate) {
        stacks = putOnStack(i, crate, stacks);
      }
    }
  }
  return stacks;
};

const putOnStack = (id: number, crate: string, stacks: Stacks) => stacks.set(id, [...(stacks.get(id) || []), crate]);

const takeCratesFromTop = (amount: number, from: number, stacks: Stacks) => {
  const crates = [];
  for (let i = 0; i < amount; i++) {
    const crate = stacks.get(from)?.pop();
    if (crate) crates.unshift(crate);
  }
  return [crates, stacks] as const;
};

const layOnStack = (id: number, crates: string[], stacks: Stacks) => {
  const stackCrates = stacks.get(id) || [];
  stacks.set(id, [...stackCrates, ...crates]);
  return stacks;
};

const runMove = ({ amount, from, to }: Move, stacks: Stacks) => {
  const [crates, updatedStack] = takeCratesFromTop(amount, from, stacks);
  return layOnStack(to, crates, updatedStack);
};

const getTopCrates = (stacks: Stacks) => [...stacks.values()].map(stack => stack[stack.length - 1]);

const input = loadInput("input");
const [rawStacks, rawMoves] = input.split("\n\n");

const moves = rawMoves.split("\n").map(parseMoves);
const stackRows = rawStacks.split("\n");

const stacksIds = stackRows.slice(stackRows.length - 1)[0];
const stacks = createStacks(stacksIds);

const crates = stackRows.slice(0, stackRows.length - 1).map(parseRow).reverse();
const crateStacks = populateStacks(crates, stacks);

const finalStacks = moves.reduce((stacks, move) => runMove(move, stacks), crateStacks);
const message = getTopCrates(finalStacks).join("");

console.log(message);
