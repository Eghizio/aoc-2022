import { loadInput } from "../utils";



type Mismatch = number | number[];
type Left = Mismatch[];
type Right = Mismatch[];
type Pair = [Left, Right];

const parsePairs = (pairRows: string): Pair => {
  const [left, right] = pairRows.split("\n");
  return [eval(left), eval(right)];
};
// can we just put them in an array and do linear scan later? - nah, idk

const test_input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

// const input = loadInput("input");
const input = test_input;

const twoRows = input.split("\n\n");
const pairs = twoRows.map(parsePairs);






const comparePair = ([left, right]: Pair) => {
  const len = Math.max(left.length, right.length);

  for (let i = 0; i < len; i++) {
    const [a, b] = convertMismatch(left[i], right[i]);
    console.log(a, ` vs `, b);
    const isOk = compareLists(a, b);
    if (!isOk) return false


    // if (a > b) return false;
  }

  console.log("\n")
  return true;
};

const zip = (xs: any[], ys: any[]) => xs.map((x, i) => [x, ys[i]]);

const toArrayIfNot = (val: number | number[]) => Array.isArray(val) ? val : [val];
// [q,w] vs [x, y]
/*
If both values are integers, the lower integer should come first.
If the left integer is lower than the right integer, the inputs are in the right order.
If the left integer is higher than the right integer, the inputs are not in the right order.
Otherwise, the inputs are the same integer; continue checking the next part of the input.

Q and X are integers
  Q <= X -> CONTINUE
  Q > X -> FALSE
  _ -> TRUE

*/
const compareInts = (a: number, b: number) => !(a > b);
/*
If exactly one value is an integer,
convert the integer to a list which contains that integer as its only value, then retry the comparison.
For example, if comparing [0,0,0] and 2,
convert the right value to [2] (a list containing 2);
the result is then found by instead comparing [0,0,0] and [2].

Q and X are list and integer
  Convert integer one -> [integer]
  _ -> CONTINUE comparing as case-1

*/
const convertMismatch = (a: Mismatch, b: Mismatch): [number[], number[]] => [toArrayIfNot(a), toArrayIfNot(b)];
/*
If both values are lists, compare the first value of each list, then the second value, and so on.
If the left list runs out of items first, the inputs are in the right order.
If the right list runs out of items first, the inputs are not in the right order.
If the lists are the same length and no comparison makes a decision about the order,
continue checking the next part of the input.

Q and X are lists
  Q runs out of items first -> TRUE
  X runs out of items first -> FALSE
  _ => CONTINUE comparing as case-1

*/
const compareLists = (a: number[], b: number[]) => a.every((x, i) => {
  const y = b[i];
  if (y === undefined) return false;
  if (x === undefined) return true;
  return compareInts(x, y);
});






/* Tests */
const results = pairs.slice(0).map(comparePair);

const testCases = zip(
  results,
  [true, true, false, true, false, true, false, false]
);
const TestsArePassing = testCases.every(([result, expected]) => result === expected)
console.log({ TestsArePassing }, testCases);

const total = results.reduce((acc, isOk, i) => acc + (isOk ? i + 1 : 0), 0);
console.log({ total });