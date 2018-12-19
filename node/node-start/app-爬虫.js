var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();
app.get('/', function (req, res, next) {
    // 用 superagent 去抓取 https://cnodejs.org/ 的内容
    superagent.get('https://www.douban.com/photos/album/152829108/')
      .end(function (err, sres) {
        // 常规的错误处理
        if (err) {
          return next(err);
        }
        // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
        // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
        // 剩下就都是 jquery 的内容了
        // console.log(sres.text);
        // res.send(sres.text);
        
        var $ = cheerio.load(sres.text);
        var items = [];
        $('#wrapper #content .photolst .photo_wrap img').each(function (idx, element) {
          var $element = $(element);
          console.log($element[
            '0'].attribs.src);
          items.push( "<img src=" + $element['0'].attribs.src + ">" );
        });
        
        var imgs = items.join('<hr/>');

        console.log(imgs);
        var body = `<!DOCTYPE html>
        
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Title</title>
        </head>
        <body>
          <div>${imgs}</div>
        </body>        
        </html>`
        res.send(body);
        
      });
  });

  var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('我是终端输入的信息', host, port);    
});