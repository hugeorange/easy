# Koa 开始
> Koa 应用程序是一个包含一组中间件函数的对象，它是按照类似堆栈的方式组织和执行的。Koa类似于你可能遇到过的许多其他中间件系统，例如：Ruby的Rack，Connect等，然而，一个关键的设计点是在其低级中间层中提供高级“语法糖”。这提高了互操作性，稳健性，并使书写中间件更加愉快。这包括诸如内容协商、缓存清理、代理支持和重定向等常见任务的方法。尽管提供了相当多的有用的方法Koa仍然保持了一个很小的体积，因为没有捆绑中间件

### 级联
> Koa 中间件以更传统的方式级联，您可能使用类似的工具-之前难以让用户友好地使用 node 的回调。然而，使用 async 功能，我们可以实现“真实“的中间件。对比 Connect 的实现，通过一些列功能传递控制，直到一个返回，Koa调用”下游“，然后控制流回”上游“

> 此外，如果一个middleware没有调用await next()，会怎么办？答案是后续的middleware将不再执行了。这种情况也很常见，例如，一个检测用户权限的middleware可以决定是否继续处理请求，还是直接返回403错误：
```
app.use(async (ctx, next) => {
    if (await checkUserPermission(ctx)) {
        await next();
    } else {
        ctx.response.status = 403;
    }
});
```


### 异步中间件 （异步读取文件内容） index2.js
- `fs` api 默认返回的不是  `promise` 对象，要想让其利用 `await` ，需姜 `fs` 包装成 `promise` 对象
- 利用 node `util.promisify` 将 `fs` api 包装成 `promise` 对象
```
app.use(async function (ctx, next) {
    ctx.response.type = 'html';
    ctx.response.body = await util.promisify(fs.readFile)('./README.md', 'utf8');
});

// util.promisify ，，，promise 写法，异步读取文件
util.promisify(fs.readFile)('./README.md', 'utf8')
.then(res => console.log(res))
.catch(err => console.log(err));
``` 
或者
```
// 必须要 return
return new Promise((resolve, reject) => {
    fs.readFile('./README.md', 'utf8', (err, res) => {
        if (err) {
            reject(err);
            ctx.response.body = err;
            // 可以在此处做错误处理。。。
            console.log("=============xxxxxxxxxxxxxx===========");
        }
        if (res) {
            resolve(res);
            ctx.response.body = res;
        }
    });
})

// 用回调函数的形式写： ctx.response.body = res; 不可以

// 下面这种写法不可以
fs.readFile('./README.md', 'utf8', (err, res) => {
    if (err) {
        console.log("err", err);
        ctx.response.body = err;
    }
    if (res) {
        console.log("res", res);
        ctx.response.body = res;
    }
});
```

### 多个中间件合成一个 koa-compose 模块

### 疑问
1. 为什么 index.js 里面的 console 都会打印两遍  
    - localhost:3002 请求一遍，favicon 又请求一遍

2. `await` 后面必须要跟一个 `promise` 对象吗，`await` 如何进行读取文件的错误处理？
    - 可以跟任何数据类型
    - fs 异步 api， 默认返回的是 undefined, 同步 api 返回的即是 文件内容
    -  

3. 回调函数里面为什么不能设置 `ctx.response.body = 'xxxxx'`, 封装成 `promise` 写上 `resolve(res)` ,然后就可以使用 `ctx.response.body = 'xxx'` 了？
```
相当于 这个中间件已经执行完毕了，该响应的已经响应完了，然后回调函数才开始执行，
要解释在回调函数里 ctx.response.body = err; 不行的原因，要看 koa2 的源码如何处理 对浏览器的响应的

```

4. await 如何处理错误
- 用 `try catch` 捕获错误
```
try {
    ctx.response.body = await util.promisify(fs.readFile)('./README3.md', 'utf8');
} catch(err) {
    console.log('1111xxx222211111', err);
}

或者这样也行

ctx.response.body = await util.promisify(fs.readFile)('./README3.md', 'utf8')
                            .catch(e => console.log('xxxxxxx-', e));;

```


### Koa 错误捕获 index3.js
1. `try ... catch ... ` 直接在当前中间件里捕获
```
try {
    ctx.response.body = await util.promisify(fs.readFile)('./README3.md', 'utf8');
} catch(err) {
    ctx.response.body = err;
}
```

2. 利用一个错误中间件统一处理
```
// 统一错误处理中间件
app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        }
        ctx.app.emit('error', err, ctx);
    }
})

app.use(async function (ctx, next) {
    ctx.throw(404);
})

错误处理中间会捕获到 ctx.throw 抛出的错误
```
3. `error` 事件的监听
```
app.use(async function (ctx, next) {
    ctx.throw(500);
})

app.on('error', (err, ctx) => {
    console.error('server error页面错误=======', err.message);
    ctx.response.body = err.message; // 可以向页面输出内容
})
```
4. 当统一错误处理中间件和error 监听都出现的时候，error无法被监听到，需要错误处理中间件释放错误`ctx.app.emit('error', err, ctx);`
```
app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.response.status = err.statusCode || err.status || 500;
        ctx.response.body = {
            message: err.message
        }
        ctx.app.emit('error', err, ctx); // 加了这一句，错误才能在 error 监听器里面监听得到
    }
})

app.use(async function (ctx, next) {
    ctx.throw(500);
})

app.on('error', (err, ctx) => {
    console.error('server error页面错误=======', err.message);
    ctx.response.body = err.message;
})
```

### WebApp 的功能
- cookies  `ctx.cookies用来读写 Cookie`
```
const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';
}

```
#### koa获取表单信息
1. get  请求： ctx.query （url 访问这样获得参数）
2. ajax 式get 请求要 `ctx.request.query`
3. post 请求： 需先加载 `koa-body` 模块 ，并使用 `app.use(koaBody())`，在所有中间件之前使用 ，需在 `ctx.request.body` 才能取得到 `post` 请求的参数
4. `curl -X POST --data "name=Jack" 127.0.0.1:3000` 模拟发送`post`请求

#### 文件上传
- index4.js
- `fs.createReadStream`，`fs.createWriteStream`，`reader.pipe(writer)`，`filePaths.push(filePath)`
- 文件上传可以试试`koa-multer`


### koa-router
- index5.js
> 我们处理http请求一律返回相同的HTML，这样虽然非常简单，但是用浏览器一测，随便输入任何URL都会返回相同的网页。
- 为了处理URL，我们需要引入koa-router这个middleware，让它负责处理URL映射。

- 由于middleware的顺序很重要，`app.use(bodyParser());` 这个koa-bodyparser必须在router之前被注册到app对象上。

#### koa-router 基础
```
const Koa = require('koa');
const Router = require('koa-bodyparser');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

router.get('/user/:id', (ctx, next) => {
    console.log(ctx.params);
    ctx.response.body = "xxxx";
});
 
app
    .use(bodyParser());
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3003);
```
#### HTTP 动词方法
> Koa-router实例提供一系列动词方法，即一种HTTP动词对应一种方法。
```
router
  .get('/', async (ctx, next) => {
    ctx.body = 'Hello World!';
  })
  .post('/users', async (ctx, next) => {...})
  .put('/users/:id', async (ctx, next) => {...})
  .del('/users/:id', async (ctx, next) => {...})
  .all('/users/:id', async (ctx, next) => {...})
```
router.all()用于表示上述所有的动词方法
```
router.get('/', async (ctx,next) => {
  ctx.body = 'Hello World!';
});
```

#### 路由参数
- get 请求  `ctx.params` 得到URL参数
- post 请求 `ctx.response.body` 得到请求参数

#### 支持多个中间件
```
router.get(
  '/users/:id',
  function (ctx, next) {
    return User.findOne(ctx.params.id).then(function(user) {
      ctx.user = user;
      return next();
    });
  },
  function (ctx) {
    console.log(ctx.user);
    // => { id: 17, name: "Alex" }
  }
);
```
#### 路由前缀
```
var router = new Router({prefix: '/users'});

router.get('/', ...); // responds to "/users"
router.get('/:id', ...); // responds to "/users/:id"
```
#### 重定向
- `router.redirect('/login', 'sign-in');`
或者
```
router.all('/login', async () {
  this.redirect('/sign-in');
  this.status = 301;
});
```

### 代码重构
> 所有的URL处理函数都放到app.js里显得很乱，而且，每加一个URL，就需要修改app.js。随着URL越来越多，app.js就会越来越长。
如果能把URL处理函数集中到某个js文件，或者某几个js文件中就好了，然后让app.js自动导入所有处理URL的函数。这样，代码一分离，逻辑就显得清楚了。最好是这样：
```
koa/
|
+- controllers/
|  |
|  +- login.js <-- 处理login相关URL
|  |
|  +- users.js <-- 处理用户管理相关URL
+- router
|  |
|  +- index.js <-- 
|  |
|  +- api.js <-- 
+- app.js <-- 使用koa的js
|
+- package.json <-- 项目描述文件
```

### 如何 以 development 和 production 启动项目
- 可设置 `NODE_ENV=development node app.js（临时处理）` ，可在代码里设置针对 dev 和 product 做不同的处理
- 如果要永久修改需改变系统环境变量

### 如何在 package.json 的 script 里面设置 node参数
```
  "scripts": {
    "start": "nodemon app.js dev xxx 222",
    "go": "node app.js --env devlopment",
    "test": "echo \"Error: no test specified\" && exit 1"
  }

  在代码里这样获得后面的参数  console.log(process.argv.splice(2));

```
### nodemon 代替 pm2 进行本地进程管理，可实时更新