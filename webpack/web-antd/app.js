const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const app = express()

// app.use(favicon(path.join(__dirname, '/react/dist/', 'favicon.ico')));
// 好像不起作用，是因为没用 ejs 模板的原因吗

// 通常用于加载静态资源
app.use(express.static(__dirname + '/react/dist'));

// 在你应用 JavaScript 文件中包含了一个 script 标签
// 的 index.html 中处理任何一个 route
app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'react/dist', 'index.html'))
})

app.listen(3009);
console.log("server started on port " + port)