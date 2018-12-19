var express = require("express");
var utility = require("utility");
var app = express();    //建立express实例


/* 将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了。
 * 例如，假设在 public 目录放置了图片、CSS 和 JavaScript 文件，你就可以：
 * 直接访问 public 目录下的文件了
 * 
 * 如果你希望 所有通过 express.static 访问的文件都存在一个虚拟的目录（即目录根本不存在）下面，
 * 可以指定静态资源目录指定一个挂在路径的方式实现 如下所示：
 * app.use('/static',('public'))
*/
app.use(express.static('public'));


var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('我是终端输入的信息', host, port);    
});


/**
 * 路由是指如何定义应用的端点（uris）以及如何响应客户端的请求
 * 路由是由一个 URis 、HTTP 请求（GET,POST）和若干句柄组成，它的结构如下：
 * app.METHOD(path,[callback...],callback)
 * app 是 express 的一个实例，METHOD 是一个 HTTP 请求方法，PATH 是服务器上的路径，callback 是路由匹配时要执行的回调函数
 */

// GET method route
app.get('/', function (req, res) {
    console.log(req.query);
    var q = req.query.q || '';
    var md5Value = utility.md5(q);
    
    res.send(md5Value);
});
  
/*
// 匹配 /about 路径的请求
app.get('/about', function (req, res) {
    res.send('about');
});
  
  // 匹配 /random.text 路径的请求
app.get('/random', function (req, res) {
    res.send('random.text');
});

/**
 * 路由句柄：
 * 可以为请求处理提供多个回调函数，其行为类似中间件。
 * 唯一的区别这些回调函数，有可能调用的 next （‘route’） 忽略其他路由回调函数。
 * 可以利用该机制为路由定义前提条件，如果在该路径上执行没有意义，则可将控制权交给剩下的路径
 * 路由句柄有多种形式可以，可以是一个函数，一个函数数组，或者是两者混合
 * 使用一个回调函数处理路由
 * app.get('/example/a',function(){
 *      res.send("hello world");
 * })
 * 
 * 使用多个回调函数处理路由
 * 使用回调函数数组处理路由
 * 混合使用函数和函数数组处理路由
 * 
 * 响应方法
 * res.download()  提供文件下载
 * res.render()    渲染视图模板
 * res.send()      发送各种类型的响应
 * 
 */


var a = {
    '0':
     { type: 'tag',
       name: 'img',
       namespace: 'http://www.w3.org/1999/xhtml',
       attribs:
        { width: '112',
          src: 'https://img3.doubanio.com/view/photo/m/public/p2467921136.jpg' },
       'x-attribsNamespace': { width: undefined, src: undefined },
       'x-attribsPrefix': { width: undefined, src: undefined },
       children: [],
       parent:
        { type: 'tag',
          name: 'a',
          namespace: 'http://www.w3.org/1999/xhtml',
          attribs: [Object],
          'x-attribsNamespace': [Object],
          'x-attribsPrefix': [Object],
          children: [Object],
          parent: [Object],
          prev: [Object],
          next: [Object] },
       prev:
        { type: 'text',
          data: '\n                    \n                    ',
          parent: [Object],
          prev: null,
          next: [Circular] },
       next:
        { type: 'text',
          data: '\n                ',
          parent: [Object],
          prev: [Circular],
          next: null } },
    options:
     { withDomLvl1: true,
       normalizeWhitespace: false,
       xml: false,
       decodeEntities: true },
    length: 1,
    _root: [Circular] 
}