### webpack4
1. 官方号称 零配置
### 升级到 webpack4 遇到的问题
1. webpack4 把核心代码和cli分离了，所以首先要安装 webpack-cli
2. modules.loaders 替换为 modules.rules
3. 单独打包css 的插件 `extract-text-webpack-plugin` 替换为 `mini-css-extract-plugin`
4. 新增 mode 选项 `development` `production`
5. `commonChunkPlugin` 移除改为 `optimization.splitChunks` 进行模块划分


### 小问题
1. `import()`  与 `require.ensure`
```
  import(/* webpackChunkName: "testimport" */ './src/comps/a').then(module => {
    console.log(module)
  })

  require.ensure([], require => {
    var result = require('./src/comps/b')
    console.log(result)
  }, 'testrequire')

```
2. `export default 与 modules.export`