import { loadInput, sum } from "../utils";


// const transpose = (matrix: number[][]) => matrix[0].map((_, col) => matrix.map(row => row[col]));

const test_input = `30373
25512
65332
33549
35390`;


const input = loadInput("input");
// const input = test_input;



const grid = input.split("\n").map(row => row.split("").map(Number));
console.log(grid);


const tallerThan = (h: number) => (a: number) => a >= h;

const isVisibleInLine = (pos: number, line: number[]) => {
  const height = line[pos];

  const [left, right] = [line.slice(0, pos), line.slice(pos + 1, line.length)];


  // const visible = !left.every(tallerThan(height)) || !right.every(tallerThan(height));
  const visible = !left.some(tallerThan(height)) || !right.some(tallerThan(height));
  console.log(left, height, right, visible);

  const isEdge = pos === 0 || pos === line.length - 1;

  return visible || isEdge;
};


const checkTreeVisibility = (x: number, y: number, grid: number[][]) => {
  const row = grid[y];
  const col = grid.map(row => row[x]);

  return isVisibleInLine(x, row) || isVisibleInLine(y, col);
};


const visMatrix = grid.map((row, y) => row.map((h, x) => checkTreeVisibility(x, y, grid)))
console.log(grid, visMatrix, sum(visMatrix.flat().map(x => x ? 1 : 0)))
