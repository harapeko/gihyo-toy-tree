const { format } = require("../format");

describe("format", () => {
  test("only oot", () => {
    expect(
      format({
        type: "directory",
        name: "root",
        children: [],
      })
    ).toMatchSnapshot();
  });
});
