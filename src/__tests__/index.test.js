import { main } from "../";

describe("toy-tree", () => {
  let stdout;
  let stderr;
  const exec = (argv) => main(argv, stdout, stderr);

  beforeEach(() => {
    stdout = jest.fn();
    stderr = jest.fn();
  });

  test("fixtures", () => {
    const code = exec(["fixtures"]);

    expect(stdout.mock.calls[0][0]).toMatchSnapshot();
    expect(code).toBe(0);
  });

  // TODO: 本題ではないので余裕がればでOK
  // - -Lオプションを指定した場合
  // - ディレクトリ未指定時
  // - 不正なディレクトリを指定した時
  // - 不正な-Lオプションを指定した時
});
