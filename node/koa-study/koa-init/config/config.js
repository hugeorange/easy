const config = {
    port: 3003,
    auth: {
        admin_secret: 'admin-token'  //撒盐：token加密的时候混淆
        // https://www.jianshu.com/p/a7882080c541
    }
};


module.exports = config;
