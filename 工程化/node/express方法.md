> express 内置方法
# 利用 Express 托管静态文件
- 通过 Express 内置的 `express.static` 方法，可以方便的托管静态文件，例如图片、css、js文件等
- 将静态资源文件所在目录作为参数传递给 express.static 中间件，就可以提供静态资源访问了
- `app.use(express.static(path.join(__dirname, 'public')));`

# express 路由
- `var index = require('./routes/index');` 引入路由文件即 控制器 （controller）
- `app.use('/user', users);`            引入路由控制器
- controller 文件
```
    // user.js 该控制器已经引入并使用
    var express = require('express');
    var router = express.router();  

    // 默认路由
    router.get('/', function(req, res){
        res.send('response with a resource');
    });

    // 动态路由  --  路由规则会被自动编译为正则表达式
    router.get('/:username', function(req,res){
        res.send('username:' + req.params.username)
    });
    module.eports = router
```

1. REST（表征状态转移-- 是一种基于http的网络应用的接口风格，充分利用 http 的方法实现统一风格的接口服务） 风格的路由规则
 - http 定义了以下八种标准方法
  1. GET    获取   安全    幂等
  2. HEAD
  3. POST   新增   不安全  不幂等
  4. PUT    更新   不安全  幂等
  5. DELETE 删除   不安全  幂等
  6. TRACE
  7. CONNECT
  8. OPTIONS
 - 安全：即没有副作用，即请求不会对资源产生变动连续访问多次获得的结果，不受访问者影响
 - 幂等：重复请求多次和请求一次的效果是相同的
 - express 路由支持所有 http 请求方式，  `router.all()` 支持将所有请求方式绑定到一个函数上，一个非常灵活的函数

2. 控制权转移
 - express 支持同一路径绑定多个路由响应函数
 ```
    app.all('/:username', function(req, res){
        console.log('all method 捕获');
    });

    app.get('/:username', function(req, res){
        res.send('user:' + req.params.username);
    });

    // 当你访问符合这个路由规则的函数时，会发现总是前一条被捕获，后一条被忽略，原因是 express 在匹配路由规则时，会优先匹配先定义的路由规则，因此后面相同的规则会被屏蔽
 ```
 - express 提供了路由控制权转移的方法，即回调函数的第三个参数 `next` ，通过调用  `next()` 会将路由控制权转移给后面的规则。
 ```
    app.all('/:username', function(req, res){
        console.log('all method 捕获');
        next();
    });

    app.get('/:username', function(req, res){
        res.send('user:' + req.params.username);
    });

    // 当访问http://localhost:3000/user/carbo： 先打印 all method 捕获 ，浏览器会显示 user: carbo
    通过 next()  转移控制权

 ```
- next() 是一个非常有用的工具，可以让我们轻易的实现中间件，而且还能提高代码的复用程度
 ``` 
    // 比如我们实现用户查询信息和修改信息的操作：都会进行检测该用户是否存在，因此可以使用 next() 实现

    var users = { 'byvoid': {
        name: 'Carbo',
        website: 'http://www.byvoid.com'
      }
    };
    app.all('/user/:username', function(req,res){
        // 检查用户名是否存在
        if(users[req.params.username]){
            next();
        }else{
            // 给 next 传递参数，进行错误检查，还不理解
            next(new Error(req.params.username + ' does not exist.'));
        }
    });

    app.get('/user/:username',function(req,res){
        // 展示查询到的用户信息
    });

    app.put('/user/:username', function(req,res){
        // 执行修改用户信息操作
    })
 ```
 - 上面例子中，app.all 定义的这个路由规则实际上起到了中间件的作用，把相似请求的相同部分提取出来，有利于代码维护，其他next方法如果接受了参数即代表发生错误。（此句话不太理解），使用这种方法可以把错误检查分段化，降低代码耦合度、

 # 模板引擎
 1. 什么是模板引擎？
   - 模板引擎（template engine）是一个从页面模板根据一定规则生成HTML的工具。
   - 模板引擎的功能是将页面模板和要显示的数据结合起来生成 HTML 页面。
   - 即可以运行在服务端也可以运行在客户端，大多数时候他都在服务端直接被解析为 HTML，解析完成后在传给客户端，因此在客户端无法判定页面是否由模板引擎生成
   - 在 MVC 架构中，模板引擎包含在服务端。控制器得到用户请求后，从模型获取数据，调用模板引擎。模板引擎以数据和页面模板为输入，生成HTML 页面，然后返回给控制器，由控制器交回给客户端

2. 使用模板引擎
  - `app.set('views', __dirname + '/views');`
  - `app.set('view engine', 'ejs');`
  - 表明使用的模板是 ejs ，页面模板在 views 子目录下。
  - 在 `router/index.js` 的 export.index 函数中通过如下语句调用模板引擎： `res.render('index', {title: 'Express'});`
  - res.render 的功能是调用模板引擎，并将其产生的页面直接返回给客户端。他接受两个参数，第一个是模板的名称，即 views 目录下的模板文件名，不包含文件的扩展名；第二个参数时传递给模板的数据，用于模板翻译。
    ```
        // index.ejs 文件如下
        <h1><%= title %></h1>
        <p>welcome to <%= title %></p>
        上面代码中的两处 <%=  %> 用于模板变量显示，他们在模板翻译时会被替换成 express ，
        因为 res.render 传递了 { title: 'Express' }
    ```
 - ejs 的标签系统非常简单，只有以下三种形式
    ```
        <% code %>   // javascript 代码
        <%= code %>  // 显示替换过HTML特殊字符的内容
        <%- code %>  // 显示原始的 HTML的内容

    ```
3. 页面布局
 - 公用的 layout.ejs 
 ```
    将需要公用的模板文件，比如 页面初始化文件，header， footer， nav，可以抽离出来组成写成单独的 .ejs 文件
    然后在需要的地方利用 include 将其引进进来
    <% incluede 模板文件名%>
    文件名可以写成 相对路径名
 ```

4. 片断视图

5. 视图助手

