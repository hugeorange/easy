const jwt = require('jsonwebtoken');
const config = require('../config/config');

/**
 * 登录 
 */
const login = async (ctx) => {
    const params = ctx.request.body;
    const payload = {
        username: params.username,
    }
    const token = jwt.sign(payload, config.auth.admin_secret, {expiresIn: '1h'});
    /**
     * 
     * token 返回数据格式，exp：token过期时间，iat：token产生时间
     {
        exp: 1533727434,
        iat: 1533641034,
        username: "koa"
     }
     */
    ctx.cookies.set('Token-Auth', token);
    ctx.body = {
        errNo: 0,
        data: token,
        msg: "登陆成功"
    };
}


/**
 * 获取用户信息
 */
const getInfo = async (ctx) => {
    let info = ctx.jwtinfo;
    ctx.body = {
        errNo: 0,
        data: info
    }
}


module.exports = {
    login,
    getInfo
}