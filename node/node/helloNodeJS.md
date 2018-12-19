### node 初始化运行

 * `node + 文件名`  运行 node 程序
 * `node -e "console.log('Hello World');" `  直接在命令行执行 node 程序
 * 
 * 使用 node 的 REPL 模 
 * 直接在 shell 终端 输入 node 命令，即进入 node shell 模式，可直接运行 node 程序

# anywhere 插件快速启动一个node服务环境
- `npm install anywhere -g`
- `anywhere` 即可将任意目录作为node 服务环境
# 1. node 创建一个 http 服务器
- app.js 文件
### supervisor 插件
- 只要修改了代码，node 就必须 先 `ctrl + c `先退出，再重新启动，有了这个插件就会自动帮你重启 node
- `npm install -g supervisor`
- `supervisor app.js`  启动 node 程序

# 2. 异步的 I/O 与事件编程

#### 阻塞(异步的I/O)与线程
- 多线程带来的好处仅仅是在多核 CPU 的情况下利用更多的核，而Node.js的单线程也能带来同样的好处。这就是为什么 Node.js 使用了单线程、非阻塞的事件编程模式。
- 读取文件模块  `var fs = require('fs'); ` 
- 异步读取 api  `fs.readFile('file.txt','utf-8',function(err,data){});`
- 同步读取 api  `fs.readFileSync       var data = fs.readFileSync('file.txt', 'utf-8');`

##### 事件  nodejs 所有的 I/O操作，都会发送一个事件到事件队列。事件由 EventEmitter 对象提供

##### nodejs 的事件循环机制
- nodejs 什么时候会进入事件循环呢？ 答案是 nodejs 由事件循环开始到时间循环结束，所有的逻辑都是事件的回调函数，所以nodejs始终在事件循环中，程序的主入口就是事件循环的第一个回调函数。
- 事件的回调函数在执行过程中，可能会发出 I/O 请求或直接发射事件(emit),执行完毕后再返回事件循环，事件循环会检查事件中有没有未处理的事件，直到程序结束
- nodejs 中没有显式的事件循环，所有的事件循环对开发者都是不可见的

# 3. 模块和包
- 模块（`module`）和包（`package`）是Nodejs的重要支柱
- nodejs的模块和包机制的实现参照了 commonjs 的标准，但未完全遵循
- 问题：
1. 什么是模块？
2. 如何创建并加载模块？
3. 如何创建一个包？
4. 如何使用包管理器？

* 模块是 NodeJS 应用程序的基本组成部分，文件和模块是一一对应的！换言之一个NodeJS文件就是一个模块。

* 创建模块
  1. NodeJS提供了 exports 和 require 两个对象，其中 exports 是模块的公开接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。
  2. 覆盖 exports   `module.exports = hello;`   `var hello = require('./hello')`

* 创建包
  1. 包是在模块基础上更深一层的抽象，NodeJS的包类似于C/C++的函数库JAVA/.NET的类库。他将某个独立的功能封装起来，用于发布、更新、依赖管理和版本控制。NodeJS 根据 commonJS规范实现了包机制，开发了 npm 来解决包的发布和获取需求。
  2. NodeJS的包是一个目录，其中包含一个JSON格式的包说明文件 `package.json`
    * 严格符合 commonJS 规范的包应该具备以下特征。
    * package.json 文件应该在包的顶层目录下
    * 二进制文件应该在 .bin 目录下
    * JavaScript代码应该在 lib 目录下
    * 文档应该在 doc 目录下
    * 单元测试应该在 test 目录下

  3. 包通常是一些模块的集合，在模块的基础上提供了更高层的抽象，相当于提供了一些固定接口的函数库，通过定制 package.json ,我们可以创建更复杂、更完善、更符合规范的包用于发布。

  4. package.json 
    - NodeJS 在调用某个包时，会首先检查 package.json 中的 main 字段，将其作为包的接口模块
    - 如果包的 main 字段不存在，会尝试寻找 index.js 或 index.node 作为包的接口
    - package.json 应该包括以下字段  ......

#### NodeJS 包管理器
  1. NodeJS 包管理器，即 npm 是 NodeJS 官方提供的包管理工具，他已经成为 NodeJS 包的标准发布平台，用于 NodeJS包的发布、传播、依赖控制。 npm 提供了命令行工具。
  2. npm 安装包的两种模式  `本地模式` `全局模式`
  3. 使用全局安装模式，多半是为了修改注册 path 环境变量，方便在命令行里直接使用其命令
  4. 使用全局模式安装的包，不能再文件中 直接 require 获得，因为require 只会搜索本地目录内的 node_module
  5. 总而言之：当我们要把某个包作为工程运行的一部分时，通过本地模式获取，如果要在命令行下使用，则使用全局安装。
  6. npm init 初始化 package.json

# 4. node 调试（好像没什么卵用）
> 命令行调试 NodeJS 的调试功能由 V8引擎提供

1. node 命令行内置的 debug 工具
  - 执行命令    `node debug debug1.js`  即可进入单步调试，具体步骤命令，请参考 。。。

2. 远程调试  v8的提供的调试功能是基于TCP协议的，因此nodejs可以轻松的实现远程调试。在命令行执行以下之一即可打开调试服务器   `node --debug[=port] script.js` `node --debug-brk[=port] script.js`

3. Eclipse 调试 nodejs 

4. 使用 node-inspector（检查员） 调试  Node.js
    - 调试步骤：
    - 安装 node-inspector   `npm install -g node-inspector `  
    - `node --debug-brk=5858 debug.js`  连接你的脚本除错服务器
    - 启动    `node-inspector`

====================================================================================================
 # 5. NodeJS 核心模块

 > 核心模块是 NodeJS 的心脏，它由一些精简而高效的库组成，为 NodeJS 提供了基本的 api

 - 主要内容：
 1. 全局对象
 2. 常用工具
 3. 事件机制
 4. 文件系统访问
 5. HTTP 服务器与客户端

 ### 全局对象 
1. NodeJS 的全局对象是 `global` ，所有全局变量都是 `global` 对象的属性
2. 在 NodeJS 中，不可能在最外层定义变量，因为用户所有代码都是属于当前模块的，而模块本身不是最上层上下文
3. 永远使用 var 定义变量以避免引入全局变量（引起耦合）

##### process对象
1. process 是一个全局变量，即global的属性，它用于描述当前 NodeJS 进程状态的对象，提供了一个与操作系统的简单接口
2. process.argv 
3. process.stdout
4. process.stdin
5. process.nextTick(callback)

##### console 对象  同浏览器端行为一致 

 ### 常用工具 util
 1. util.inherit(constructor,superConstructor) 是一个实现对象间原型继承的函数
    - 只可以继承 原型对象中的属性和方法，不可以继承构造函数内的属性和方法

 2. utils.inspect 
    -  utils.inspect(object,[showHidden],[depth],[color]) 是将任意一个对象转换为字符串的方法，常用与调试和错误输出
    - object 必须，要输出的对象，showHidden:true （布尔值）输出更多隐藏信息，depath 表示最大递归层数（数值，null:完整遍历对象，color:true 用于输出更漂亮的界面）

  3. util.isArray() 、 util.isRegExp() 、 util.isDate() 、 util.isError() 四个测试类型工具
  4. util.format()、 util.debug()  等工具   

 ### 事件驱动 events
  1. 事件发射器： events 只提供了一个对象： events.EventEmitter 。 EventEmitter 的核心就是事件的发射与事件监听器的封装

  2. EventEmitter 对象的常用 api
  - EventEmitter.on(event,listener) 为指定事件注册一个监听器，接受一个一个字符串 event 和 一个回调函数 listener
  - EventEmitter.emit(event,[arg1],[arg2],[...]) 发射 event 事件，传递若干参数到事件监听器的参数表
  - EventEmitter.once(event,listener) 为指定事件注册一个单次监听器，即监听器只会触发一次，触发后立刻解除该监听器
  - EventEmitter.removeListenenr(event,listener) 移除指定事件的某个监听器，listner 必须是该事件已经注册过的监听器
  - EventEmitter.removeAllListeners([event]) 移除所有事件的事件监听器，如果指定 event，则移除指定事件的所有监听器
  - error 事件
    
> 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承他。 包括 fs，net，http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

    为什么要这么做啊？ 原因有二：
    1. 具有某个实体功能的实现符合语义，事件监听和发射应该是一个对象的方法
    2. js对象机制是基于原型的，支持部分多重继承，继承 EventEmitter 不会打乱原有的继承关系。


 ### 文件系统 fs
  > fs 模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等 posix 文件系统操作。 fs 模块的操作都提供了异步和同步的两个版本。
    
  ####  文件操作
  1. fs.readFile('filename.txt','utf-8',function(err,data){})   文件名称-编码格式-回调函数， 如果不指定编码格式，data 将会是一个 Buffer 对象 
  2. fs.readFileSync(filename,[encording]),读取到的内容会议返回值的形式输出，如果有错误，请使用 try catch
    - 与同步 I/O 函数不同，NodeJs中的异步函数大多数没有返回值。

  3. fs.open(path,flags,[mode],[callback(err,fd)]) 是 POSIX read 函数的封装.
    - flag 是文件的打开方式（默认属性） mode 文件的权限
  
  4. fs.read(fd,buffer,offset,length,position,[callback(err,bytesRead,buffer)]) 是 POSIX read 函数的封装.相比 fs.readFile 提供了更底层的接口。
    - 一般来说，除非必要，否则不要使用这种方式读取文件，因为他要求你手动管理缓冲区和文件指针，尤其在你不知道文件大小的时候，这将会是一件很麻烦的事情

  5. fs 模块函数表 ......

 ### HTTP服务器与客户端
   > Node.js 标准库提供了 http 模块，其中封装了一个高效的http模块，和一个简易的http客户端。 
     http.Server 是一个基于事件的 HTTP 服务器，它的核心是由 Node.js 下层的 C++ 部分实现，而接口由 JavaScript 封装，兼具高性能和简易性。 http.request 则是一个 http 客户端工具，用于向 http 服务器发起请求。

  #### HTTP 服务器
  1. http.Server 的事件
     - http.Server 是一个基于事件的HTTP服务器，所有的请求都被封装为独立的事件，开发者只需要对他的事件编写响应函数即可实现http服务器的所有功能。他继承了EventEmitter ，提供了以下几个事件。
     1. request：当客户端请求来到时，该事件被触发，提供两个参数 req 和 res 分别是 http.ServerRequest 和 http.ServerResponse 的实例，表示请求和响应信息。
     2. connection 当 TCP 请求链接建立时，该事件被触发......
     3. close 当服务器断开连接时，该事件被触发，注意不是用户手动断开连接
     4. checkContinue，upgrade，clientError  ...... 通常时间不用关心，只有在实现复杂http服务时才会用到......

     + http 模块为 request 事件提供了一个捷径： ` http.createServer([requestListener]) `, 功能是是创建一个 http 服务器，并将 requestListener 作为 request 事件的监听函数

  2. http.ServerRequest 
     - http.ServerRequest 是 http 请求的信息，是后端开发者最关注的内容。
     - 它一般由 http 的 request 事件发送，作为第一个参数传递，通常简称 request 或 req
     - Server.request 提供了一些属性 ... complete , httpVersion  ,  method,  url,  headers,  trailers,  connection,  socket,  client

     - http 请求一般分为两部分请求头（Request Header） 和请求体 （Request Body）
     - 请求体相对较长，需要一定时间传输，因此 http.ServerRequest 提供了三个事件用于控制请求体传输。
       1. `data` 当请求体数据来到时，该事件被触发。该事件提供了一个参数 chunk ，表示接收到的数据。如果该事件没有被监听，那么请求体将会被抛弃。该事件可能会调用多次。
       2. `end ` 当请求体数据完成传输，该事件会被触发，此后将不会再有数据到来，
       3. `close` 当用户请求结束时，该事件将会被触发，不同于 `end ` 如果用户手动终止了传输也还是调用 `close`

  
  3. 获取 `get` 请求内容
     - get 方式请求的内容是嵌在 url 里的， node 的 url 模块中的 parse 函数可以解析 url 请求的参数
```
var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(util.inspect(url.parse(req.url,true)));  // res.end 参数必须是字符串
}).listen(3000);

//页面打印内容 ：
Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '?name=byvoid&email=byvoid@byvoid.com',
  query: { name: 'byvoid', email: 'byvoid@byvoid.com' },
  pathname: '/user',
  path: '/user?name=byvoid&email=byvoid@byvoid.com',
  href: '/user?name=byvoid&email=byvoid@byvoid.com' }

```

  - 通过 `url.parse(req.url,true)` 原始的 `path` 被解析为一个对象，其中 `query` 就是我们请求的内容，`pathname` 是请求的路径

  4. 获取 post 中的请求内容
  - HTTP协议1.1版本，提供了八种标准的请求的方法，其中最常见的就是 get 、post 。相比 get 请求把所有的内容编码到访问路径中，POST 请求的请求内容全部都在请求体中。
  - http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件很耗时的工作，譬如上传文件。而很多时候，我们可能不需要处理请求体里的内容，恶意的 post 请求可能会大大消耗服务器的资源。所以nodejs默认不会解析请求体的，当你需要的时候，需要手动来做。 代码如下：

  ```
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
  ```

  5. http.ServerResponse 
  - http.ServerResponse 是返回给客户端的信息，决定了用户最后能看到的结果。它也是由 http的request事件发送的，第二个参数，一般简称为 response 或 res。

  - http.ServerResponse 有三个重要的成员函数，用于返回响应头，响应内容，以及结束请求
    1. `response.writeHead(statusCode,[headers]) `：向请求的客户端发送响应头。statusCode是 http 状态码：200（请求成功）404（未找到请求内容）  `headers` 是一个类似关联数组的对象，表示响应头的每个属性。该函数在一个请求内容内只能调用一次，如果不调用则会自动生成一个响应头。

    2. `response.write(data,[encording])` ： 想请求的客户端发送内容，data 是一个 buffer 或字符串，表示要发送的内容，如果`data`是字符串,需要指定 encording 来说明他的编码方式，默认是 utf-8。在 response.end 之前，response.write 可以被多次调用。

    3. `response.end([data],[encording])` ： 结束响应，告诉客户端所有发送已经完成。当所有要发送的内容发送完毕的时候，该函数必须要被调用一次。它接收两个可选参数，意义和 response.write 相同，如果不调用该函数，客户端将永远处于等待状态。

#### HTTP 客户端
 > http 模块提供了两个函数向服务端发起请求，`http.request`   `http.get`

 ##### http.request(options,callback)
  -  `options`  是一个类似关联数组的对象，表示请求的参数，callback 是请求的回调函数。
  - `options` 常用参数：`host`  ` port`   ` method(默认get)`  `  path  `   `headers(关联数组对象，请求头的内容)  `

  - `callback` 传递一个参数，为 `http.ClientResponse ` 的实例。

  - `http.request` 返回一个 `http.ClientRequest ` 实例

  - 代码示例 `./http/httpRequest.js`

 ##### http.get(options,callback) 
 - 该函数是 `http.request` 简化版，只针对 get 请求，同时不需要手动调用 ` req.end(); `

 > http.ClientRequest  &&   http.ClientResponse  
 1. `http.ClientRequest` 是由 `http.request` 或 `http.get` 返回生产的对象，表示一个已经产生并且正在进行中的 http请求。他提供一个 `response` 事件，即 `http.request`  `http.get` 第二个参数指定的回调函数的绑定对象，我们也可以显式的绑定这个事件的监听函数：
 ```
 var http = require('http');
 var req = http.get({host:'www.baidu.com'});  // req 即为 http.ClientRequest 对象
 req.on('response',function(data){
   res.setEncorded('utf8');
   res.on('data',function(data){
     console.log(data);
   })
 })
 ```
 `http.ClientRequest` 有以下方法： `write` `end` `request.abort()` `request.setTimeout(timeout,[callback])`
 

 2. `http.ClientResponse (即返回参数值res)` 与 `http.ClientResponse` 一样，提供了三个事件  `data`, `end` , `close` 分别在数据达到，传输结束，和链接结束时触发，其中，data 事件传递一个参数 chrunk ，表示接受到的数据。
 - `http.ClientResponse` 还提供了一些属性，用于表示请求的结果状态  `statusCode` `httpVersion` `headers` `traliers`

 - `http.ClientResponse` 还提供了一下几个特殊的函数
 - `response.setEncoding([encoding])` 设置编码。
 - `response.pause()`:  接 数据和发 事件，方便实现下载功能。
 - `response.resume()`:从暂停状态中恢复。 


 # 6. 使用 Node 进行web开发
 -  从零开始实现一个微博系统，功能包括：路由控制，页面模板，数据库访问，用户注册，登录，用户会话等内容。
 -  关键字：Express框架，MVC设计模式，ejs模板引擎，MongoDB数据库操作

 ### Express 框架
 
 > Express 功能 （为 http 模块提供了更高层的接口）
 - 路由控制
 - 模板解析支持
 - 动态视图
 - 用户会话
 - CSRF 保护
 - 静态文件服务
 - 错误控制器
 - 访问日志
 - 缓存
 - 插件支持
 - express 只是一个轻量级的web框架，多数功能只是对http协议常用操作的封装更多的功能需要插件或整合其他模板来完成

 > 用原生 node 发起的一次post请求和用 `express` 发起的请求对比  `（./http/form/index.html）`
 - 不需要手动编写 req 事件监听器-------


 #### 搭建一个以 ejs 为模板的 express 项目（express默认模板为jade）
 - `express -e ejs dirname` // dirname 为项目目录名
 - Express4.x 项目启动命令 `npm start app.js ` (老版本为 `node app.js`) 
 - 如果有报错，找不到 `express` 那就再install一下 `npm install -g express`  `npm install -g express-generator`