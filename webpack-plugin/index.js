import aaa, {b} from './src/a'
import {bbb} from './src/b'

var btn = document.querySelector("#btn")
var p = document.querySelector("#content")

btn.innerHTML = aaa
p.innerHTML = b + '--' + bbb


btn.onclick = function() {
  import('./src/b').then(res => {
    console.log(res)
  })
}

/**
 *  // 通过增加输出信息的方式为浏览器开发者工具增强调试
     devtool: "source-map", // 为模块生成单独的source-map文件，会大幅影响编译速度
     devtool: "eval", // 不生成sourceMap, 但是命名模块，编译速度最快.
     devtool: "cheap-module-eval-source-map", // 开发环境推荐 
     devtool: "cheap-module-source-map", // 生产环境推荐 
     
     // 使用 cheap 模式可以大幅提高 souremap 生成的效率。大部分情况我们调试并不关心列信息，而且就算 sourcemap 没有列，有些浏览器引擎（例如 v8） 也会给出列信息。
     // 使用 eval 方式可大幅提高持续构建效率。官方文档提供的速度对比表格可以看到 eval 模式的编译速度很快。
     // 使用 module 可支持 babel 这种预编译工具（在 webpack 里做为 loader 使用）。
     // 使用 eval-source-map 模式可以减少网络请求。这种模式开启 DataUrl 本身包含完整 sourcemap 信息，并不需要像 sourceURL 那样，浏览器需要发送一个完整请求去获取 sourcemap 文件，这会略微提高点效率。而生产环境中则不宜用 eval，这样会让文件变得极大。
     
     // 根路径，默认值是__dirname，基于这个路径去处理配置的模块入口和加载器
     context: __dirname, // 默认值

     webpack 输出分析
     https://www.njleonzhang.com/2018/12/30/webpack-bundle-1.html
 */


console.log('环境--->', process, ENVVIROMENT)