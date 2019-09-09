const jwt = require('jsonwebtoken');
const config = require('../config/config');

const checkToken = async (ctx, next) => {
    const token = ctx.cookies.get('Token-Auth') || "";
    console.log('=========', ctx.header['x-token']);
    let info;
    try {
        info = jwt.verify(token, config.auth.admin_secret);
        ctx.jwtinfo = info;
        await next();
    } catch (err) {
        ctx.body = {
            errNo: 10,
            data: err
        }
    }
}

module.exports = {
    checkToken
}

// https://segmentfault.com/a/1190000009494020