# 用法
1. koa-bodyparser 
- 解析 post 请求，从 `ctx.request.body` 里面读取 post 传递的参数
2. koa-logger - log4.js 日志存储
3. koa-cors - 解决开发环境跨域
4. koa-viewkoa-static 直接 localhost:3003/index.txt ,public 下的文件

## 用户认证机制 jsonWebToken 
- [jwt原理](https://www.jianshu.com/p/576dbf44b2ae)
- [koa-jwt](https://www.jianshu.com/p/176198fbdb35)

## 简述
- json web token 简称JWT，是基于JSON的一种开放标准。服务器和客户端可以通过JWT来建立一座通信的桥梁。
- JWT主要分为三部分。header(头部)，payload(载体)， signature(签名)。
    * header: 头部 声明加密方式和声明类型
    * payload: 载体 存放JWT定义的一些声明（例如：过期时间，签发者等等），我们将用户的一些信息存放在这里（例如：用户名，用户ID等，千万不要存在用户密码等敏感信息）
    * signature: 签名 `  signature = [header(加密方式)](base64编码(header) + '.' + base64编码(payload), [服务器的私钥])`
    * 最后将上面三个组成部分用'.'连接起来就构成了JWT：
    * `  JWT = base64编码(header) + '.' + base64编码(payload) + '.' + signature`

### koa 实现jwt认证
- 安装 `npm i jsonwebtoken  // 一个实现jwt的包`






### jwt 长什么样
- JWT是由三段信息构成的，将这三段信息文本用.链接一起就构成了Jwt字符串。
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
### jwt 的构成
- 第一部分我们称它为头部（header)
- 第二部分我们称其为载荷（payload, 类似于飞机上承载的物品)
- 第三部分是签证（signature).
#### header
- jwt的头部承载两部分信息
    1. 声明类型： jwt
    2. 声明加密算法：HMAC SHA256
- 完整的头部就像是这样的 json
```
{
  'typ': 'JWT',
  'alg': 'HS256'
}
```
- 然后将头部进行base64加密（该加密是可以对称解密的),构成了第一部分.
- `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9`
#### playload
- 载荷就是存放有效信息的地方。这个名字像是特指飞机上承载的货品，这些有效信息包含三个部分
    * 标准中注册的声明
    * 公共的声明
    * 私有的声明
- 标准中注册的声明 (建议但不强制使用) ：
    * iss: jwt签发者
    * sub: jwt所面向的用户
    * aud: 接收jwt的一方
    * exp: jwt的过期时间，这个过期时间必须要大于签发时间
    * nbf: 定义在什么时间之前，该jwt都是不可用的.
    * iat: jwt的签发时间
    * jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
- 公共的声明 ：
    * 公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密.
- 私有的声明 ：
    * 私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。
- 定义一个payload:
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
#### signature
- jwt的第三部分是一个签证信息，这个签证信息由三部分组成：
    * header (base64后的)
    * payload (base64后的)
    * secret
- 这个部分需要base64加密后的header和base64加密后的payload使用.连接组成的字符串，然后通过header中声明的加密方式进行加盐secret组合加密，然后就构成了jwt的第三部分。
```
// javascript
var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);

var signature = HMACSHA256(encodedString, 'secret'); // TJ
```
- 将这三部分用.连接成一个完整的字符串,构成了最终的jwt:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
- 注意：secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret就是用来进行jwt的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了。

### 如何应用
- 一般是在请求头里加入Authorization，并加上Bearer标注：
```
fetch('api/user/1', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```
- 服务端会验证token，如果验证通过就会返回相应的资源。




## 问题：
1. cookie 的写入和读取
2. 后端对 http 响应码的处理，是不是统一都返回的 200，只是根据业务划分为 业务错误，
3. 后端返回的 internetError时 是不是就是代码写错了

### 参考资源
-https://github.com/yxl720/vue-koa2-token/blob/4b0416a8bb5e204cd79afe4663d89abf4719de5f/koa-example/token/checkToken.js