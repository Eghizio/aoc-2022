import { loadInput, sum } from "../utils";


type Move = "A" | "B" | "C" | "X" | "Y" | "Z";
type ResultMove = Extract<Move, "X" | "Y" | "Z">;
enum Shape {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSORS = "SCISSORS",
}
enum RESULT {
  LOOSE = 0,
  DRAW = 3,
  WIN = 6,
}

const mapMove = (move: Move): Shape => {
  return {
    "A": Shape.ROCK,
    "B": Shape.PAPER,
    "C": Shape.SCISSORS,
    "X": Shape.ROCK,
    "Y": Shape.PAPER,
    "Z": Shape.SCISSORS,
  }[move];
};

const getMoveScore = (shape: Shape) => {
  return {
    "ROCK": 1,
    "PAPER": 2,
    "SCISSORS": 3,
  }[shape];
};

const mapResult = (b: "X" | "Y" | "Z") => {
  return {
    "X": RESULT.LOOSE,
    "Y": RESULT.DRAW,
    "Z": RESULT.WIN,
  }[b];
};

const getResult = (a: Move, b: ResultMove) => {
  const res = mapResult(b);
  const A = mapMove(a);

  if (res === RESULT.DRAW) return res + getMoveScore(A);

  if (res === RESULT.LOOSE) {
    if (A === Shape.ROCK) return res + getMoveScore(Shape.SCISSORS);
    if (A === Shape.PAPER) return res + getMoveScore(Shape.ROCK);
    if (A === Shape.SCISSORS) return res + getMoveScore(Shape.PAPER);
  }

  if (res === RESULT.WIN) {
    if (A === Shape.ROCK) return res + getMoveScore(Shape.PAPER);
    if (A === Shape.PAPER) return res + getMoveScore(Shape.SCISSORS);
    if (A === Shape.SCISSORS) return res + getMoveScore(Shape.ROCK);
  }

  return 0;
};

const input = loadInput("input");
const rows = input.split("\n");

const duels = rows.map(row => row.split(" ") as [Move, ResultMove]);
const results = duels.map(([a, b]) => getResult(a, b));

console.log(sum(results));
