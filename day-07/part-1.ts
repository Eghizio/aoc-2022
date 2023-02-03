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

const moves = commands.map(row => row.split("\n").filter(Boolean));


const coms = moves.map(x => {
  const [com, ...output] = x;
  return { command: parseCommand(com), output };
});

console.log(coms);