import fs from "fs";
import path from "path";

const readDirectory = (dir, depth, options) => {
  if (options.level < depth) {
    return [];
  }

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
        children: readDirectory(
          path.join(dir, dirent.name),
          depth + 1,
          options
        ),
      };
    }
  });
};

export const read = (dir, options) => {
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
    children: readDirectory(dir, 1, options),
  };

  return root;
};
