> node 常用自带模块的一些方法介绍
-  `http`，`fs` ，`util` ,`url` , `querystring`, `bodyParser` 模块

# 1.  `path` 模块

1. `normalize` :用于将非标准的路径字符串转换为标准的路径字符串。
2. `join` 将多个参数值字符串结合成一个路径字符串
  ```
  //使用方法
  path.join([path1],[path2],[...]);
  返回这些这些字符串值参数结合而成的路径
  let joinPath = path.join(__dirname,'views');
  console.log(joinPath);   // /Users/orange/code/easy/node/node/express/microblog/views
  __dirname 代表程序运行的根目录

  ```
3. `resolve` 方法：以应用程序所在目录为起点，根据所有参数值字符串解析出一个绝对路径
  ```
  使用方法如下：
    path.resolve([path1],[path2],[...])
    在 resolve 方法中，可以指定一个或多个参数，每个参数值均为字符串。
    let resolve = path.resolve('a','b','c');
    console.log(resolve);  //  /Users/orange/code/easy/node/node/express/microblog/a/b/c

    与 join 方法的区别，自动帮你找到 __dirname，然后进行拼接。
  ```

4. `relative` 该方法用于获得两个路径之间的相对关系

5. `dirname` 方法，该方法用于获取一个路径中的目录名

6. `basename` 该方法用于获取一个路径中的文件名

7. `extname` 用于获取一个路径中的扩展名

8. `path.sep` 属性值，为操作系统指定的文件分隔符


# 2. favicon 制作 图标中间件
- 使用方法：
- `var favicon = require('serve-favicon');   // 引入中间件`
- `app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  // 使用中间件`
- 将制作好的 favicon 图标放入指定目录即可

# 3. morgan 中间件记录日志
- 使用方法
- `var logger = require('morgan'); // 引入中间件`
- `var accessLog = fs.createWriteStream('./access.log', {flags : 'a'});  // 创建要存储打印内容的文件`
- `app.use(logger('combined', {stream : accessLog}));      //打印到log日志 ` 
- `app.use(logger('dev')); //打印日志到控制台`

# 4. cookie-parser 解析 cookie 中间件
- 使用方法
- `var cookieParser = require('cookie-parser');  // 安装 cookie-parser 中间件`
- `app.use(cookieParser());  // 使用中间件`
- 接下来在路由请求中就可以通过 `req.cookies` 获取请求域的 cookie 值了（对象形似）

# 5. body-parser 用于解析 post 请求的body中的参数
- 使用方法
- `var bodyParser = require('body-parser');`
- `app.use(bodyParser.json());`
- `app.use(bodyParser.urlencoded({ extended: false }));`

