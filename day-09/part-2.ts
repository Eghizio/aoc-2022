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

// const input = loadInput("input");
const input = test_input;

const rows = input.split("\n");
const moves = rows.map(parseMove);
console.log(moves);


type Pos = { x: number, y: number };
type Rope = Pos[];
const start: Rope = Array.from({ length: 10 }, () => ({ x: 0, y: 0 }))


const hashPos = ({ x, y }: Pos) => `${x}_${y}`;

const FIELDS = new Set<string>([hashPos(start[start.length - 1])]);



const isSameLine = ([head, tail]: Rope) => head.x === tail.x || head.y === tail.y;
const isFar = ([head, tail]: Rope) => Math.abs(head.x - tail.x) > 1 || Math.abs(head.y - tail.y) > 1

const move = (d: Direction) => ({
  R: ({ x, y }: Pos) => ({ x: ++x, y }),
  L: ({ x, y }: Pos) => ({ x: --x, y }),
  U: ({ x, y }: Pos) => ({ x, y: ++y }),
  D: ({ x, y }: Pos) => ({ x, y: --y }),
})[d];

const runMove = (d: Direction, [head, tail]: [Pos, Pos]): [Pos, Pos] => {
  // if same col/row, h++, t++
  // if diff col/row h++ (t++ t++)

  const sameLine = isSameLine([head, tail]);

  if (sameLine) {
    head = move(d)(head);

    const far = isFar([head, tail]);
    if (far) {
      tail = move(d)(tail);
    }

    console.log({ sameLine, far });
  } else {
    const prevHead = { ...head };
    head = move(d)(head);

    const far = isFar([head, tail]);

    console.log({ head, tail })
    if (far) {
      tail = prevHead;
    }

    console.log({ sameLine, far })
  }

  // FIELDS.add(hashPos(tail));
  return [head, tail];
};

const runKnots = (d: Direction, rope: Rope) => {
  const len = rope.length;
  for (let i = 0; i < len - 1; i++) {
    const [head, tail] = runMove(d, [rope[i], rope[i + 1]])
    rope[i] = head;
    rope[i + 1] = tail;
  }

  FIELDS.add(hashPos(rope[rope.length - 1]));
  return rope;
};

const executeMoves = ([d, steps]: Move, rope: Rope) => {
  console.log("Moves", [d, steps])
  for (let i = 0; i < steps; i++) {
    // for each [a..z] pair
    // rope = runMove(d, rope);
    rope = runKnots(d, rope);
  }
  return rope;
};

const mvs = moves.slice(0);
const end = mvs.reduce((rope, mvs) => executeMoves(mvs, rope), start);
console.log("END:", end);
console.log(FIELDS, FIELDS.size);

