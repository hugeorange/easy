const babel = require('@babel/core')
// 我们的babel插件
let MyVisitor = function({ types: t }) {
  return {
    visitor: {
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