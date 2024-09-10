module.exports = function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        if (source === "antd" || source === "@ant-design/icons") {
          const specifiers = path.node.specifiers.map((specifier) =>
            t.objectProperty(
              t.identifier(specifier.local.name),
              t.identifier(specifier.local.name),
              false,
              true
            )
          );

          const variableDeclaration = t.variableDeclaration("const", [
            t.variableDeclarator(
              t.objectPattern(specifiers),
              t.identifier(source === "antd" ? "antd" : "icons")
            ),
          ]);

          path.replaceWith(variableDeclaration);
        }
      },
    },
  };
};
