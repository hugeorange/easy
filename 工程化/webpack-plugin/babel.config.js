const presets = [
  [
    "@babel/preset-env", 
    {
      useBuiltIns: 'entry',
      "targets": "> 0.25%, not dead",
      modules: false
    }
  ],
  ["@babel/preset-react"]
];

// 相对路径形式引入自己的 babel 插件
const plugins = [
  ["./src/babel-plugin-extract/index.js", { "library": "lodash" }],
]

module.exports = { presets, plugins };
