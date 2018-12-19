const path = require('path');
const Koa = require('koa');
const views = require('koa-views');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('@koa/cors');
const config = require('./config/config');
const router = require('./router');
const app = new Koa();

app.use(cors()); // 跨域设置
app.use(logger()); // 配置控制台日志中间件
app.use(bodyParser());
app.use(static(__dirname + '/public'));


app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs',
}));

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log("统一错误捕获中间件捕获到的错误---------", err);
    ctx.response.status = 200;
    // ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    }
  }
})

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port);
console.log('the server is start at port %s', config.port);
