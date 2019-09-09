const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();


router.get('/user/:id', async (ctx, next) => {
  const user = ctx.params.id;
  ctx.response.body = `<h1>Index</h1>
        <h2>${user} - 用户</h2>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`;
});

router.post('/signin', async (ctx, next) => {
  const name = ctx.request.body.name || '';
  const password = ctx.request.body.password || '';

  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  } else {
    ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
  }
});


app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3004);

