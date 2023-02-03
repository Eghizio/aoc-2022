import { loadInput } from "../utils";


const parseRow = (row: string): number[] => {
  const [op, val] = row.split(" ");
  if (op === "noop") return [0];
  if (op === "addx") return [0, parseInt(val, 10)];
  throw new Error(`Unsupported operation ${op}`);
};

const test_input = `noop
addx 3
addx -5`;

const test_input_two = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

const input = loadInput("input");
// const input = test_input;
// const input = test_input_two;

const rows = input.split("\n");

const ops = rows.flatMap(parseRow);
console.log(ops, ops.length);

type CPU = { x: number, cycle: number, sprite: number };
// let yuck
let cpu: CPU = { x: 1, cycle: 0, sprite: 0 };
let CRT = "";

// console.log(ops[20 - 1])

const isMasked = (i: number, { sprite }: CPU) => i >= sprite && i <= sprite + 2;
const moveSprite = ({ sprite, ...cpu }: CPU): CPU => ({ ...cpu, sprite: cpu.x - 1 });
// no need for sprite? SPRITE = X always?


for (let i = 0; i < ops.length; i++) {
  const val = ops[i];
  cpu.cycle += 1;

  CRT += isMasked(i % 40, cpu) ? "#" : ".";

  cpu.x += val;

  cpu = moveSprite(cpu);

  console.log(`CYCLE ${cpu.cycle}`, cpu);
}


const isLit = (lit: boolean) => lit ? "#" : ".";
const printCRT = (crt: string) => {
  let toPrint = "";
  for (let i = 0; i < crt.length; i++) {
    if (i % 40 === 0) toPrint += "\n";
    toPrint += crt[i];
  }
  console.log(toPrint);
};

console.log("END:", cpu);
// console.log(CRT)
printCRT(CRT);