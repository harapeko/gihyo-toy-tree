const meow = require("meow");
const { read } = require("./read");
const { format } = require("./format");

exports.main = (argv, stdout, stderr) => {
  const cli = meow(
    `
        Usage
            $ toy-tree <directory>
            
        Options
          --level, -L ツリー表示ができる最大深さ

        Examples
          $ toy-tree
          $ toy-tree path/to/dir
    `,
    {
      flags: {
        // デフォルト：全階層を表示する
        level: {
          type: "number",
          alias: "L",
          default: Infinity,
        },
      },
      argv,
    }
  );

  const dir = cli.input[0] || ".";

  const options = {
    level: cli.flags.level,
  };

  if (options.level < 1) {
    stderr("Error: Invalid Level. 階層は0以上を指定してね");
    return 1;
  }

  let root;

  try {
    root = read(dir);
  } catch (e) {
    stderr(`Error: ${e.message}`);
    return 1;
  }

  const output = format(root);

  stdout(output);

  return 0;
};
