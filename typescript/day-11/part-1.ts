import { loadInput } from "../utils";


const test_input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

type Monkey = {
  id: number;
  items: number[];
  operation: (val: number) => number;
  test: (val: number) => number;
  inspections: number;
};
type MonkeyFamily = Map<number, Monkey>;

const Parser = {
  Id: (line: string) => Number(line.replace(":", "").replace("Monkey ", "").trim()),
  Items: (line: string) => line.replace("Starting items: ", "").split(", ").map(s => s.trim()).map(Number),
  Operation: (line: string) => line.replace("Operation: new = ", "").trim(),
  Test: (line: string) => Number(line.replace("Test: divisible by ", "").trim()),
  IfTrue: (line: string) => Number(line.replace("If true: throw to monkey ", "").trim()),
  IfFalse: (line: string) => Number(line.replace("If false: throw to monkey ", "").trim()),
};

// welp, it is what it is
const runOperation = (op: string, val: number): number => eval(op.replaceAll("old", val.toString()))

const parseMonkey = (monkey: string): Monkey => {
  const rows = monkey.split("\n");

  const id = Parser.Id(rows[0]);
  const items = Parser.Items(rows[1]);
  const op = Parser.Operation(rows[2]);
  const testValue = Parser.Test(rows[3]);
  const ifTrue = Parser.IfTrue(rows[4]);
  const ifFalse = Parser.IfFalse(rows[5]);

  const operation = (val: number) => runOperation(op, val);
  const test = (val: number) => val % testValue === 0 ? ifTrue : ifFalse;

  const inspections = 0;

  return { id, items, operation, test, inspections };
};

const createMonkeysFamily = (monkes: Monkey[]): MonkeyFamily => {
  return new Map(monkes.map(monke => [monke.id, monke]));
};

const transferWorryToMonkey = (worry: number, id: number, family: MonkeyFamily): MonkeyFamily => {
  const targetMonke = family.get(id);
  if (targetMonke === undefined) throw new Error("Where banana?");

  family.set(id, { ...targetMonke, items: [...targetMonke.items, worry] });

  return family;
};

const getsBored = (val: number) => Math.floor(val / 3);

const runMonkeyTurn = (id: number, family: MonkeyFamily): MonkeyFamily => {
  const monke = family.get(id);
  if (monke === undefined) throw new Error("No monke");

  if (monke.items.length === 0) return family;
  monke.inspections += monke.items.length;

  while (monke.items.length) {
    const item = monke.items.shift();
    if (item === undefined) throw new Error("Uuuu a aa");

    const worry = getsBored(monke.operation(item));
    const targetMonke = monke.test(worry);

    family = transferWorryToMonkey(worry, targetMonke, family);
  }

  family.set(id, monke);

  return family;
};

const runRound = (family: MonkeyFamily) => {
  return [...family.keys()].reduce((acc, id) => runMonkeyTurn(id, acc), family);
};

const runRounds = (family: MonkeyFamily, rounds = 20) => {
  for (let i = 0; i < rounds; i++) {
    family = runRound(family);
  }
  return family;
};

const calculateMonkeyBusiness = (family: MonkeyFamily): number => {
  const inspections = [...family.values()].map(({ inspections }) => inspections);
  const sortedInspections = inspections.sort((a, b) => b - a);
  const [a, b] = sortedInspections;

  return a * b;
};

const input = loadInput("input");
// const input = test_input;

const rows = input.split("\n\n");
const monkeys = rows.map(parseMonkey);
const family = createMonkeysFamily(monkeys);

const finalFamily = runRounds(family, 20);
console.log(finalFamily);

const monkeyBusiness = calculateMonkeyBusiness(finalFamily);
console.log(monkeyBusiness); // 57348
// test 10605
