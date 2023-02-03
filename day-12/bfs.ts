import { loadInput } from "../utils";

type Grid = string[][];
type Point = { x: number; y: number; };
type HeightPoint = Point & { height: number; };

const hashPoint = ({ x, y }: Point) => `${x}_${y}`;

const findNode = (grid: Grid, node: "S" | "E"): Point => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === node) return { x, y };
    }
  }
  throw new Error(`No ${node} point found`);
};


const printVisitedGrid = (visited: Set<string>, grid: Grid) => {
  // const printVisitedGrid = (visited: Map<string, HeightPoint>, grid: Grid) => {
  let str = "";
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      str += visited.has(hashPoint({ x, y })) ? "🔴" : "⚪️";
    }
    str += "\n";
  }
  console.log(str);
};


const mapCharToHeight = (char: string): number => char.replace("S", "a").replace("E", "z").charCodeAt(0);
// const mapCharToHeight = (char: string): number => char.replace("S", "`").replace("E", "{").charCodeAt(0);

// const calculateDistance = (a: Point, b: Point) => Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
// Manhattan distance
const calculateDistance = (a: Point, b: Point) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);


const test_input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

// const input = loadInput("input");
const input = test_input;


const grid = input.split("\n").map(row => row.split(""));
const start = { ...findNode(grid, "S"), height: mapCharToHeight("S") };
const end = { ...findNode(grid, "E"), height: mapCharToHeight("E") };
const Visited = new Set(hashPoint(start));

console.table(grid);
console.log("Start:", start, "End:", end);
// console.log("S->E Distance:", calculateDistance(start, end));



const getHeight = ({ x, y }: Point, grid: Grid): number => {
  const char = grid[y]?.[x];
  return (char === undefined) ? 0 : mapCharToHeight(char);
};

const getAdjacent = ({ x, y }: Point, grid: Grid): HeightPoint[] => {

  const up = { x, y: y - 1 };
  const down = { x, y: y + 1 };
  const left = { x: x - 1, y };
  const right = { x: x + 1, y };

  return [
    { ...up, height: getHeight(up, grid) },
    { ...down, height: getHeight(down, grid) },
    { ...left, height: getHeight(left, grid) },
    { ...right, height: getHeight(right, grid) },
  ].filter(({ height }) => height !== 0);
};

// const adjacents = getAdjacent(start, grid);
// console.log(adjacents);

const BFS = (root: HeightPoint, grid: Grid) => {
  const visited = new Set<string>();
  const queue = [root];

  while (queue.length) {
    printVisitedGrid(visited, grid);

    const node = queue.shift();
    if (node === undefined) break;

    const hashed = hashPoint(node);
    if (visited.has(hashed)) continue;

    visited.add(hashed);

    const adjacents = getAdjacent(node, grid).filter(({ height }) => (height - node.height) <= 1);

    // const sorted = adjacents.sort((a, b) => b.height - a.height);
    // const topHeight = sorted[0].height;
    // const tops = adjacents.filter(p => p.height === topHeight);
    // queue.push(...tops);

    // console.log("\n\n", node, adjacents);
    queue.push(...adjacents);
  }

  return visited;
};

// const BFS = (root: HeightPoint, grid: Grid) => {
//   // map, then traverse backwards
//   const visited = new Map<string, HeightPoint>();
//   const queue = [root];

//   while (queue.length) {

//     // printVisitedGrid(visited, grid);
//     const node = queue.shift();
//     if (node === undefined) break;

//     const hashed = hashPoint(node);
//     if (visited.has(hashed)) continue;

//     visited.set(hashed, node);

//     const adjacents = getAdjacent(node, grid).filter(({ height }) => (height - node.height) <= 1);

//     // const sorted = adjacents.sort((a, b) => b.height - a.height);
//     // const topHeight = sorted[0].height;
//     // const tops = adjacents.filter(p => p.height === topHeight);
//     // queue.push(...tops);

//     // console.log("\n\n", node, adjacents);
//     queue.push(...adjacents);
//   }

// return visited;
// };


const visited = BFS(start, grid);
console.log(visited)
console.log("Path length:", visited.size)



printVisitedGrid(visited, grid);

const walkDown = (visited: Map<string, HeightPoint>) => {
  // const adjacents = getAdjacent(node, grid).filter(({ height }) => (height - node.height) <= 1);
};