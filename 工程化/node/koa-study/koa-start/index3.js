// 错误处理 
const Koa = require('koa');
const app = new Koa();

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
    ctx.throw(500);
})

/**
 * ctx.throw 不仅可以抛出 404 500 等错误
 * 也可以抛出 诸如 200 301 等状态码，这个也会被捕获到 try catch 里面的 catch
 * 
 * 
 * ctx.response.status = 404;
   ctx.response.body = 'Page Not Found';
   相等于
   ctx.throw(404)
 */

//  error 事件的监听处理错误
app.on('error', (err, ctx) => {
    console.error('server error页面错误=======', err.message);
    ctx.response.body = err.message;
})


app.listen(3002);
