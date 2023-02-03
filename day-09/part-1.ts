import { loadInput } from "../utils";


type Direction = "R" | "L" | "U" | "D";
type Move = [Direction, number];


const isDirection = (d: string): d is Direction => ["R", "L", "U", "D"].includes(d);

const parseMove = (row: string): Move => {
  const [d, steps] = row.split(" ");
  if (!isDirection(d)) throw new Error("Dupa");
  return [d, parseInt(steps, 10)];
};

const test_input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const input = loadInput("input");
// const input = test_input;

const rows = input.split("\n");
const moves = rows.map(parseMove);
console.log(moves);


type Pos = { x: number, y: number };
type Rope = [head: Pos, tail: Pos];
const start: Rope = [{ x: 0, y: 0 }, { x: 0, y: 0 }];

const hashPos = ({ x, y }: Pos) => `${x}_${y}`;

const FIELDS = new Set<string>([hashPos(start[1])]);



const isSameLine = ([head, tail]: Rope) => head.x === tail.x || head.y === tail.y;
const isFar = ([head, tail]: Rope) => Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1

const move = (d: Direction) => ({
  R: ({ x, y }: Pos) => ({ x: ++x, y }),
  L: ({ x, y }: Pos) => ({ x: --x, y }),
  U: ({ x, y }: Pos) => ({ x, y: ++y }),
  D: ({ x, y }: Pos) => ({ x, y: --y }),
})[d];

const runMove = (d: Direction, [head, tail]: Rope): Rope => {
  const sameLine = isSameLine([head, tail]);

  const movedHead = move(d)(head);
  const far = isFar([movedHead, tail]);
  const movedTail = far
    ? (sameLine ? move(d)(tail) : head)
    : tail;

  FIELDS.add(hashPos(movedTail));

  return [movedHead, movedTail];
};

const executeMoves = ([d, steps]: Move, rope: Rope) => {
  for (let i = 0; i < steps; i++) {
    rope = runMove(d, rope);
  }
  return rope;
};

const mvs = moves.slice(0);
const end = mvs.reduce((rope, mvs) => executeMoves(mvs, rope), start);
// console.log("END:", end);
// console.log(FIELDS);
console.log(FIELDS.size);

