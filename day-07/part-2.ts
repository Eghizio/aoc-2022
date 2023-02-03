import { loadInput, sum } from "../utils";


const TEST_INPUT = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

type Command = ["ls"] | ["cd", string];
type Line = {
  command: Command;
  output: string[];
};

const parseCommand = (com: string): Command => {
  const [action, arg] = com.split(" ");
  if (action === "ls") return [action];
  if (action === "cd") return [action, arg];
  throw new Error(`Unsupported action ${action}`);
}


const input = loadInput("input");
// const input = TEST_INPUT;


const commands = input.split("$ ").filter(Boolean);
// console.log(commands);

const moves = commands.map(row => row.split("\n").filter(Boolean));
// console.log(moves)

const coms = moves.map(x => {
  const [com, ...output] = x;
  return { command: parseCommand(com), output };
});

// console.log(coms)

// type Contents = (Dir | string)[];
type Contents = string[];
type Dir = Map<string, Contents>;


const changeDir = (dir: string) => { };

const runCommands = (coms: Line[]) => {
  const ROOT = "root";
  const history: string[] = [];
  let pwd = ROOT;
  const fs: Dir = new Map();
  fs.set(ROOT, []);

  for (const { command, output } of coms) {
    const [com, arg] = command;

    if (com === "cd") {
      if (arg === "..") {
        pwd = history.pop() || ROOT;
      } else {
        fs.set(arg, []);
        pwd = arg;
      }
    }
    if (com === "ls") {
      // console.log(output)
      fs.set(pwd, output);
    }
  }

  fs.delete(ROOT);
  return fs;
};

const parseContents = (contents: Contents, fs: Dir) => {
  const fileSizes = contents.map(f => {
    const [dirOrSize, name] = f.split(" ");
    if (dirOrSize !== "dir") return parseInt(dirOrSize, 10);
    return name;
  });

  // return sum(fileSizes);
  return fileSizes;
};

type PartialContent = string | number;
type PartialyParsedDir = Map<string, PartialContent[]>
const parseFs = (fs: Dir): PartialyParsedDir => {
  const dirContents = [...fs.entries()];

  const parsedFs = dirContents.map(([dir, contents]) => [dir, parseContents(contents, fs)]);

  // @ts-ignore
  return new Map(parsedFs);
};

const isNumber = (x: unknown): x is number => typeof x === "number";
const isFullyParsed = (arr: any[]): arr is number[] => arr.every(isNumber);

const fs = runCommands(coms);
const partialyParsedFs = parseFs(fs);
// console.log(partialyParsedFs);


const getDirName = (str: string) => str.split(" ")[1];

type PartialySummedDir = Map<string, PartialContent[] | number>;
const sumPartials = (fs: PartialyParsedDir): PartialySummedDir => {
  const entries = [...fs.entries()].map(([dir, strOrNum]) => {
    return isFullyParsed(strOrNum)
      ? [dir, sum(strOrNum)]
      : [dir, strOrNum.map(xy => isNumber(xy) ? xy : getDirName(xy))];
  });

  // @ts-ignore
  return new Map(entries);
};

// const partialySummed = sumPartials(partialyParsedFs);
// console.log("sum:", partialySummed);



// console.log(partialyParsedFs)
const replaceWithSizes = (fs: PartialySummedDir) => {
  const sizes = [...fs.entries()].map(([dir, xy]) => isNumber(xy) ? [dir, xy] : null).filter(Boolean);
  const sizeMap = new Map(sizes as [string, number][]);
  [...sizeMap.keys()].forEach(key => {
    fs.delete(key);
  })

  return [fs, sizeMap] as const;
};

// const runReplacements = () => {
//   const [fs, sizeMap] = replaceWithSizes(partialySummed);
//   console.log(sizeMap);
//   console.log(fs);
// };
// runReplacements();




const walkDownTree = (fs: PartialyParsedDir, node: string) => {
  const getContent = (n: string) => fs.get(n) || [];

  const flattenContent = (content: PartialContent[]) => {
    // while not fullyParsed -> flatten
    while (!isFullyParsed(content)) {
      content = content.map(c => isNumber(c) ? c : sum(flattenContent(getContent(c))));
    }
    return content;
  };

  const contents = getContent(node);

  const x = contents.map(x => {
    if (isNumber(x)) return x;

    const content = getContent(x);

    const z = flattenContent(content);
    console.log("Flat: ", z);

    return z;
  });

  // console.log(fs, "\n");
  console.log(`\n\nGetting sum of [${node}]:`, contents);
  console.log(x)

  const y = x.map(x => isNumber(x) ? [x] : x)
    .map(xs => isFullyParsed(xs) ? sum(xs) : xs);

  // console.log("YYY", y)
  // find arrays -> find string -> walkDownTree

  // const q = y.filter(y => y <= 100_000);
  // return q;
  return sum(y);
};

// walkDownTree(partialyParsedFs, "/");
// walkDownTree(partialyParsedFs, "/");

console.log(partialyParsedFs, "\n");

const x = [...partialyParsedFs.keys()].map(k => [k, walkDownTree(partialyParsedFs, k)])
console.log("\n\n\n", x)
const total = sum(
  x.map(x => x[1] as number)
    .filter(x => x <= 100_000)
);
console.log(total);

/*
cd x      - push x
ls -> o   - push o to x

*/

const LOOKUP_MAP = () => {
  console.log("\n\nRESULT:",
    [...partialyParsedFs.entries()]
      .map(([dir, files]: any[]) => [
        dir,
        sum(files.map((x: string | number) => typeof x !== "number" ? 0 : x))
      ])
  );
};
// LOOKUP_MAP();

// 980487 // too low