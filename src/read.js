const fs = require("fs");
const path = require("path");

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

const readDirectory = (dir) => {
  const dirents = fs.readdirSync(dir, {
    // ディレクトリの内容を読み取るオプション
    withFileTypes: true,
  });

  return dirents.map((dirent) => {
    if (dirent.name.startsWith(".")) {
      return;
    }

    if (dirent.isFile()) {
      return {
        type: "file",
        name: dirent.name,
      };
    } else if (dirent.isDirectory()) {
      return {
        type: "directory",
        name: dirent.name,
        children: readDirectory(path.join(dir, dirent.name)),
      };
    }
  });
};
