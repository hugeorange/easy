const path = require('path')
module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: []
    },
    devtool: 'inline-source-map',
    mode: 'development',
    target: 'node',
    plugins: [],
}

/**
 * webpack-dev-server  会自动帮我们刷新浏览器，热替换等
 * webpack watch 模式 不会帮我们做上述处理
 */