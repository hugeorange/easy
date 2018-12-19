
// 异步中间件
const util = require('util');
const fs = require('fs');
const Koa = require('koa');
const app = new Koa();

app.use(async function (ctx, next) {
    ctx.response.type = 'html';
    // ctx.response.body = await util.promisify(fs.readFile)('./README3.md', 'utf8')

    // try {
    //     ctx.response.body = await util.promisify(fs.readFile)('./README3.md', 'utf8');
    // } catch(err) {
    //     ctx.response.body = err;
    // }

/*

    // 还是不太理解下面这种回调函数式为什么不行？
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
    /**
     * 相当于 这个中间件已经执行完毕了，该响应的已经响应完了，然后回调函数才开始执行，
     * 要解释在回调函数里 ctx.response.body = err; 不行的原因，要看 koa2 的源码如何处理 对浏览器的响应的
     */
})



app.listen(3002);
