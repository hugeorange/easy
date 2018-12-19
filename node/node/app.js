/**
 * 启动一个 node  http 服务
 */

 var http = require('http');

 http.createServer(function(req,res){
     res.writeHead(200,{'Content-Type':'text/html'});
     res.write('<h1>欢迎来到 nodejs </h1>');
     res.end('<h2>hello world的点点滴滴多多多</h2>');
 }).listen(3000);


 var fs = require('fs');
 fs.readFile('hello.md','utf-8',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
 });
 


 console.log("HTTP server is listening at port 3000.");