
/**
 * 原生 node 接收 post 请求
 */
/*
var http = require('http');
var querystring = require('querystring');
var util = require('util');

var server = http.createServer(function(req,res){
    var post = "";
    req.on('data',function(chunk){
        post += chunk;
    });

    req.on('end',function(){
        post = querystring.parse(post);
        res.write(util.inspect(post));
        res.end();
    });
}).listen(3000);
*/

/**
 * express 接收post请求
 */

 var express = require('express');
 var util = require('util');
var bodyParser = require('body-parser')
//安装 body-parser 中间件，对 post 参数进行解析，否则 req 获取不到 body 属性
 

//  var app = express.createServer();  书上过时的 创建 express 实例方式
 var app = express();     // 创建 express 实例

//  app.use(express.bodyParser());  body-parser 已于 express 分离，需要单独安装

/**
 * body-parser 中间使用方式
 * 问题解答方案：  http://blog.csdn.net/u013438638/article/details/48953143 
 * 中文文档：http://blog.csdn.net/z1233691/article/details/51526431
 * 解析学习：http://blog.csdn.net/u010977147/article/details/68483347
 */
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({ extended: false }));


 app.all('/',function(req,res){
     res.send(util.inspect(req.body));
 });

 app.listen(3000);

 
/**
 * 可以看到我们不必手动编写 req 监听器了，只需要加载
 * app.use(bodyParser.json());      
 * app.use(bodyParser.urlencoded({ extended: false }));
 * 就可以直接通过 req.body 获取数据了
 */