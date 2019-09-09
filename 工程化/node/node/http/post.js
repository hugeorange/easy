
var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req,res){
    var post = "";
    req.on('data',function(chunk){   // 监听 data 事件，获取请求体内的内容
        post += chunk;
    });
    req.on('end',function(){
        post = querystring.parse(post);  // 将 post 解析为真正的 post 请求格式，然后向客户端返回
        res.end(util.inspect(post));
    });
}).listen(3000);

// 不要在生产环境用这种方法获取 post 方法，因为他有严重的效率问题和安全问题，这只是一个帮助你理解的示例。

