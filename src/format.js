exports.format = (node) => {
  return `${node.name}\n${formatEach(node.children, "")}`;
};
