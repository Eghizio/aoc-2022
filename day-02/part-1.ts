import { loadInput, sum } from "../utils";

type Move = "A" | "B" | "C" | "X" | "Y" | "Z";
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

const getResult = (a: Move, b: Move) => {
  const [A, B] = [mapMove(a), mapMove(b)];

  if (A === B) return RESULT.DRAW + getMoveScore(B);

  if (A === Shape.ROCK) {
    if (B === Shape.PAPER) return RESULT.WIN + getMoveScore(B);
    return RESULT.LOOSE + getMoveScore(B);
  }

  if (A === Shape.PAPER) {
    if (B === Shape.ROCK) return RESULT.LOOSE + getMoveScore(B);
    return RESULT.WIN + getMoveScore(B);
  }

  if (A === Shape.SCISSORS) {
    if (B === Shape.PAPER) return RESULT.LOOSE + getMoveScore(B);
    return RESULT.WIN + getMoveScore(B);
  }

  return 0;
};

const input = loadInput("input");
const rows = input.split("\n");

const duels = rows.map(row => row.split(" ") as [Move, Move]);
const results = duels.map(([a, b]) => getResult(a, b));

console.log(sum(results));
