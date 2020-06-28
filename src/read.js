const fs = require("fs");

exports.read = (dir) => {
  let stat;

  try {
    stat = fs.statSync(dir);
  } catch (e) {
    throw new Error(`"${dir}" はないよ`);
  }

  if (!stat.isDirectory()) {
    throw new Error(`"${dir}" はディレクトリじゃないよ`);
  }

  const root = {
    type: "directory",
    name: dir,
    children: readDirectory(dir),
  };

  return root;
};
