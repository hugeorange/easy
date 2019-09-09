const Router = require('koa-router');
const router = new Router();
const api = require('../controllers/api');
const user = require('../controllers/user');

const checkToken = require('../middlewares/checkToken');


router.get('/test', api.testGet);
router.post('/test', api.testPost);

router.post('/login', user.login);

// router.post('/getInfo', checkToken, user.getInfo);
router.post('/getInfo', checkToken.checkToken, user.getInfo);


module.exports = router;


