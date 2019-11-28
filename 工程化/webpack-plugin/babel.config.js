const presets = [
  [
    "@babel/preset-env", 
    {
      modules: false
    }
  ],
  ["@babel/preset-react"]
];

const plugins = [
  ["extract", { "library": "lodash" }],
]

module.exports = { presets, plugins };
