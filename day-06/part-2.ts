import { loadInput } from "../utils";


const findPacketStart = (chars: string[], sequence: number) => {
  let i = 0;
  while (new Set(chars.slice(i, i + sequence)).size !== sequence) i++;
  return i + sequence;
};

const input = loadInput("input");
const chars = input.split("");

console.log(findPacketStart(chars, 14));
