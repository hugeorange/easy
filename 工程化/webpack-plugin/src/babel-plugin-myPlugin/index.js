const babel = require('@babel/core')
// types 从传入的 babel 中取出 types 即 @babel/types
let MyVisitor = function({ types: t }) {
  return {
    // 访问者模式，遍历访问每个特定类型的AST节点
    visitor: {
      // 二元操作符
      BinaryExpression(path) {
        if (path.node.operator !== "===") return;
        // 改变当前节点的left、right
        path.node.left = t.identifier("bar");
        path.node.right = t.identifier("foo");
      }
    }
  };
}
const code = `foo === bar;`;
let demo = babel.transform(code, {
  plugins: [MyVisitor]
})
console.log(demo); // bar === foo