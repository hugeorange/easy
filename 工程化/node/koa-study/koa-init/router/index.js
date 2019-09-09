const Router = require('koa-router');
const router = new Router();

const api = require('./api');

// 具体路由只能用 all 或http方法
router.all('/', async (ctx) => {
    await ctx.render('index', { title: "Home Page" });
});

router.use('/api/v1', api.routes());

module.exports = router;
