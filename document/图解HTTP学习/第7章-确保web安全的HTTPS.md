# 第七章 确保Web安全的HTTPS
> 在 HTTP协议中有可能存在信息窃听或身份伪装等安全问题。使用 HTTPS通信机制可以有效地防止这些问题。

## 7.1 HTTP的缺点
- 通信使用明文（不加密），内容可能会被窃听
- 不验证通信方的身份，因此有可能遭遇伪装
- 无法证明报文的完整性，所以有可能已遭篡改

### 7.1.1 通信使用明文可能会被窃听
> 由于HTTP本身不具备加密的功能，所以也无法做到对通信整体（使用HTTP协议通信的请求和响应的内容）进行加密。即，HTTP报文使用明文(指未经过加密的报文)方式发送
- `TCP/IP` 是可能被窃听的网络
- 加密处理防止被窃听(https 通信通道加密)
    * 通信的加密：一种方式就是将通信加密。HTTP协议中没有加密机制，但可以通过和 SSL （Secure Socket Layer， 安全套接层）或 TLS(Transport Layer Security，安全层传输协议)的组合使用，加密HTTP的通信内容。
    * 用SSL建立安全通信线路之后，就可以在这条线路上进行 HTTP通信了。与SSL组合使用的HTTP被称为HTTPS（HTTP Secure，超文本传输安全协议）或 HTTP over SSL

- 内容加密

### 7.1.2 不验证通信方的身份就可能遭遇伪装
> HTTP协议中的请求和响应不会对通信方进行确认。也就是说存在服务器是否就是发送请求中URI真正指定的主机，返回的响应是否真的返回到实际提出请求的客户端等类似问题。
- 任何人都可发起请求，服务器都会响应，因此可存在以下隐患
    * 无法确定请求发送至目标的web服务器是否是按真实意图返回响应的那台服务器。有可能是已伪装的web服务器。
    * 无法确定相应返回到的客户端是否是按真实意图接收响应的那个客户端。有可能是已伪装的客户端。
    * 无法确定正在通信的对方是否具备访问权限。因为某些web服务器上保存着重要的信息，只想发给特定用户通信的权限。
    * 无法判断请求来自何方、出自谁手
    * 即使无意义的请求也会照单全收，无法阻止海量请求下的DoS攻击（Denial of Service，拒绝服务攻击）

- 查明对手的证书
    * 虽然使用HTTP协议无法确定通信方，但如果使用 SSL则可以。SSL不仅提供加密处理，而且还使用了一种被称为证书的手段，可用于确定方。
    * 证书由值得信任的第三方机构颁发，用以证明服务器和客户端是实际存在的。另外，伪造证书从技术角度来说异常困难的一件事。所以只要能够确认通信方（服务器或客户端）持有的证书，即可判断通信方的真实意图
    * 通过使用证书，以证明同新方就是意料中的服务器。这对使用者个人来讲，也减少了个人信息泄露的危险性。
    * 另外，客户端持有证书即可完成个人身份的确认，也可用于对web网站的认证环节

### 7.1.3 无法证明报文完整性，可能已遭篡改
- 所谓完整性是指信息的准确度。若无法证明其完整性，通常也就意味着无法判断信息是否准确。
- 接收到的内容可能有误， 在服务端和客户端通信的过程中文件可能会被拦截篡改
    * 如何防止篡改？
    * `PGP` `MD5算法`
    * `HTTPS`中的 `SSL`提供认证和加密处理及摘要功能。仅靠HTTP确保完整性是非常困难的，因此通过和其他协议组合使用来实现这个目标。

## 7.2 HTTP + 加密 + 认证 + 完整性保护 = HTTPS

### 7.2.1 http加上加密处理和认证以及完整性保护后即是 `HTTPS`
> 如果在HTTP协议中通信过程中使用未经加密的明文，比如在web页面中输入信用卡号，如果这条线路遭到窃听，那么信用卡号就暴露了。另外，对于HTTP来说，服务器也好，客户端也好，都是没有办法确认通信方的。因为很有可能并不是和原本预想的通信方在实际通信。并且还需要考虑到接收到的报文在通信途中已经遭到篡改这一可能性。
> 为了统一解决上述这些问题，需要在HTTP上再加入加密处理和认证等机制。我们把添加了加密及认证机制的HTTP称为HTTPS（HTTP Secure）

### 7.2.2 HTTPS是身披SSL外壳的HTTP
- HTTPS并非是应用层的一种新协议。只是HTTP通信接口部分用`SSL（Secure Socket Layer` 和 `TLS(Transport Layer Security)`协议代替而已。
- 通常，HTTP直接和TCP通信。当使用SSL时，则演变成先和`SSL`通信，再由`SSL` 和 `TCP`通信了。简言之，所谓 `HTTPS`,其实就是身披 `SSL`协议这层外壳的`HTTP`
- 在采用SSL后，HTTP就拥有了HTTPS的加密、证书和完整性保护性这些功能
- SSL是独立于 HTTP的协议，所以不光是 HTTP协议，其他运行在应用层的`SMTP`和`Telnet`等协议均可配合`SSL`协议使用。可以说`SSL`是当今世界上应用最为广泛的网络安全技术

### 7.2.3 相互交换秘钥的公开密钥加密技术







