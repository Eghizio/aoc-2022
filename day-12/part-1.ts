import { loadInput } from "../utils";

type Grid = string[][];
type Point = { x: number; y: number; };

const hashPoint = ({ x, y }: Point) => `${x}_${y}`;

const findStart = (grid: Grid): Point => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "S") return { x, y };
    }
  }
  throw new Error("No S point");
};

const test_input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

// const input = loadInput("input");
const input = test_input;


const grid = input.split("\n").map(row => row.split(""));
const start = findStart(grid);
console.table(grid);
console.log("Start", start);

const getHeight = ({ x, y }: Point, grid: Grid) => grid[y]?.[x];

const getMoveElevation = (a: Point, b: Point, grid: Grid) => {
  const from = getHeight(a, grid);
  const to = getHeight(b, grid);

  const valFrom = (from === "S" ? "a" : from).charCodeAt(0);
  const valTo = (from === "E" ? "z" : to).charCodeAt(0);

  return valTo - valFrom;
};

const canMoveOn = (a: Point, b: Point, grid: Grid) => getMoveElevation(a, b, grid) <= 1;

const can = canMoveOn(start, { x: 0, y: 2 }, grid);
console.log(can)

// look around, see highest elevation, go there, and mark as visited prev and current (prev should be already marked?)
const Visited = new Set(hashPoint(start));

const getAroundPoints = ({ x, y }: Point) => ({
  up: { x, y: y - 1 },
  down: { x, y: y + 1 },
  left: { x: x - 1, y },
  right: { x: x + 1, y },
});
type Around = ReturnType<typeof getAroundPoints>;

const mapHeights = ({ up, down, left, right }: Around, grid: Grid) => ({
  up: { ...up, height: getHeight(up, grid) },
  down: { ...down, height: getHeight(down, grid) },
  left: { ...left, height: getHeight(left, grid) },
  right: { ...right, height: getHeight(right, grid) },
});

const lookAround = (currentPos: Point, grid: Grid) => {
  const around = getAroundPoints(currentPos);
  const heightsAround = mapHeights(around, grid);
  console.log(heightsAround)
  // filter under height's
  const possibleMoves = Object.values(heightsAround).filter(({ x, y, height }) => height && canMoveOn(currentPos, { x, y }, grid));
  console.log(possibleMoves);
  const elevated = possibleMoves.map((move) => ({ ...move, elevation: getMoveElevation(currentPos, { x: move.x, y: move.y }, grid) }));
  console.log(elevated)
};

lookAround(start, grid);
// lookAround({ x: 1, y: 1 }, grid);