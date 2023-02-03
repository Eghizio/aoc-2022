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

type CPU = { x: number, cycle: number, power: number };
const cpu: CPU = { x: 1, cycle: 0, power: 0 };

const POWER_CYCLES = [20, 60, 100, 140, 180, 220];
// console.log(ops[20 - 1])

for (let i = 0; i < ops.length; i++) {
  const val = ops[i];
  cpu.cycle += 1;

  const power = POWER_CYCLES.find(p => p === cpu.cycle) // || 0;
  if (power) {
    const signalStrength = cpu.x * power;
    console.log(power, signalStrength);
    cpu.power += signalStrength;
  }

  cpu.x += val;
}

console.log(cpu);
