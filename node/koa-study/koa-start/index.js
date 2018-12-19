const fs = require('fs');
const Koa = require('koa');
const koaBody = require('koa-body');
const app = new Koa();

app.use(koaBody());

// x-response-time
app.use(async (ctx, next) => {
    console.log("ctx===query",ctx.query, ctx.request.body);
    const start = Date.now();
    console.log("第一次-response-start", start);
    await next();
    const ms = Date.now() - start;
    console.log("我是x中间件里面的 next后面的打印--x-response-time", `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
    const start = Date.now();
    console.log("第二次start - logger -", start);
    await next();
    const ms = Date.now() - start;
    console.log(`我是logger中间件里的next后面的打印--${ctx.method} ${ctx.url} - ${ms}ms`);
})

// response
app.use(async ctx => {
    ctx.body = 'hello world koa333';
    console.log("response里面的响应");
});
// 为什么所有的 console 都执行两遍，为什么



/**
 * next 方法是将控制权交给下一个中间件控制
 * 当所有中间件执行完毕后，再一次向上层交还控制权
 */

app.listen(3002);






// const main = async function (ctx, next) {
//     ctx.response.type = 'html';
//     ctx.response.body = await fs.readFile('./README.md', 'utf8');
// };
// app.use(main);
