const testGet = async (ctx) => {
    const params = ctx.request.query;
    // console.log(params.id.aaa); // 错误实例演示
    ctx.body = {
        errNo: 0,
        data: params
    };
};


const testPost = async (ctx) => {
    const params = ctx.request.body;
    ctx.body = {
        errNo: 0,
        data: params,
    };
};


module.exports = {
    testGet,
    testPost,
};
