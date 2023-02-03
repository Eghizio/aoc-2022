import { loadInput } from "../utils";


const test_input = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`;

const input = loadInput("input");
// const input = test_input;

type Monkey = string | number;
type MonkeyFamily = Map<string, Monkey>;

const parseRow = (row: string): [string, Monkey] => {
  const [name, op] = row.split(": ");
  const isOperation = ["+", "-", "*", "/"].some(sign => op.includes(sign));
  return isOperation ? [name, op] : [name, Number(op)];
};

const isNumber = (x: string | number): x is number => typeof x === "number";

const evalMonkeys = (monkey: Monkey, monkeys: MonkeyFamily): number => {
  if (isNumber(monkey)) return monkey;
  const [x, sign, y] = monkey.split(" ");
  const a = monkeys.get(x) ?? 0;
  const b = monkeys.get(y) ?? 0;

  if (isNumber(a) && isNumber(b)) return Number(eval(`${a} ${sign} ${b}`));
  return eval(`${evalMonkeys(a, monkeys)} ${sign} ${evalMonkeys(b, monkeys)}`);
};

const rows = input.split("\n");
// console.log(rows);

const monkeys = new Map(rows.map(parseRow));
console.log(monkeys);

const root = monkeys.get("root") ?? 0;
// console.log(root);

const x = evalMonkeys(root, monkeys);
console.log(x);
