import { loadInput, sum } from "../utils";


// const transpose = (matrix: number[][]) => matrix[0].map((_, col) => matrix.map(row => row[col]));

const test_input = `30373
25512
65332
33549
35390`;


const input = loadInput("input");
// const input = test_input;



const grid = input.split("\n").map(row => row.split("").map(Number))
// .slice(0, 2)
console.log(grid);


const tallerThan = (h: number) => (a: number) => a >= h;

const viewingDistance = (h: number, side: number[]): number => {
  if (side.length === 0) return 0;

  let score = 0;
  for (const tree of side) {
    score++;
    if (tallerThan(h)(tree)) return score;
  }


  return score;
};

const calcScoreInLine = (pos: number, line: number[]): number => {
  const height = line[pos];
  const [left, right] = [line.slice(0, pos), line.slice(pos + 1, line.length)];
  // const visible = !left.every(tallerThan(height)) || !right.every(tallerThan(height));
  // const visible = !left.some(tallerThan(height)) || !right.some(tallerThan(height));
  // console.log(left, height, right, visible);
  // const isEdge = pos === 0 || pos === line.length - 1;

  const a = viewingDistance(height, left.reverse());
  const b = viewingDistance(height, right);
  console.log(line, height, [a, b]);

  return a * b;
};



const checkTreeDistances = (x: number, y: number, grid: number[][]) => {
  const row = grid[y];
  const col = grid.map(row => row[x]);

  return calcScoreInLine(x, row) * calcScoreInLine(y, col);
};


const printMatrix = (arr: number[][]) => {
  console.log(arr.map(row => row.map(x => x.toString().padStart(2, " ")).join("").trim()).join("\n") + "\n")
};

const visMatrix = grid.map((row, y) => row.map((h, x) => checkTreeDistances(x, y, grid)))
const topScore = Math.max(...visMatrix.flat());
// console.log("\n\n\n", grid, visMatrix, Math.max(...visMatrix.flat()))

console.log("\n\n\n",)
printMatrix(grid);
printMatrix(visMatrix);
console.log(visMatrix)
console.log(topScore)

console.log()
