# 第六章 HTTP首部
- HTTP协议的请求和响应报文中必定包含HTTP首部，只是我们平时在使用web的过程中感受不到它。

### 6.1 HTTP报文首部
- HTTP协议的请求和响应报文中必定包含HTTP首部。首部内容为客户端和服务器分别处理请求和响应提供所需要的信息。

#### HTTP请求报文
- 在请求中，HTTP报文由方法、URI、HTTP版本、HTTP首部字段等部分构成。
- 报文首部：请求行（方法、URI、HTTP版本），请求首部字段、通用首部字段、实体首部字段，其他

#### HTTP响应报文
- 在响应中，HTTP报文由HTTP版本、状态码（数字和原因短语）、HTTP首部字段3部分构成
- 报文首部：状态行（HTTP版本、状态码），响应首部字段，通用首部字段，实体首部字段
- 在报文众多的字段当中，HTTP首部字段包含的信息最为丰富。首部字段同时存在于请求和响应报文内，并涵盖HTTP报文相关的内容信息。

#### 6.2.2 HTTP首部字段结构
- HTTP首部字段是由首部字段名和字段值构成的，中间用冒号“ : ” 分隔。
- 首部字段名：字段值

- 例如,在HTTP首部中以Content-Type这个字段来表示报文主体的对象类型。
- Content-Type: text/html
- 另外，字段值对应单个HTTP首部字段可以有多个值，如下所示

#### 6.2.3 4种HTTP首部字段类型
- 通用首部字段（General Header Fields）：请求报文和响应报文两方都会使用的首部
- 请求首部字段（Request Header Fields）：从客户端向服务器端发送请求报文时使用的首部。补充了请求的附加内容、客户端信息、相应内容相关优先等级信息。
- 响应首部字段（Response Header Fields）：从服务端向客户端返回响应报文时使用的首部。补充了响应的附加内容，也会要求客户端附加额外的内容信息。
- 实体首部字段（Entity Header Fields）：针对请求报文和响应报文的试题部分使用的首部。补充了资源内容更新时间等与实体有关的信息。

#### 6.2.4 HTTP/1.1 首部字段一览
- HTTP/1.1 规范了如下47种首部字段。

### 6.3 HTTP/1.1 通用首部字段
- 通用首部字段，请求报文和响应报文双方都会使用的首部

#### 6.3.1 Cache-Control
- 通过指定首部字段 Cache-Control的指令，就能操作缓存的工作机制。
- 首部字段Cache-Control 能够控制缓存的行为
- 指令参数是可选的，多个指令之间通过 “，”分隔。首部字段Cache-Control的指令可用于请求及响应时

- Cache-Control：no-cache：使用no-cache指令的目的是为了防止从缓存中返回过期的资源
- 客户端发送的请求中如果包含 no-cache 指令，则表示客户端将不会接收缓存过得响应。于是，“中间”的缓存服务器必须把客户端请求转发给源服务器。
- 如果服务器返回的响应中包含 no-cache 指令，那么缓存服务器不能对资源进行缓存。源服务器以后也将不再对缓存服务器请求中提出的资源有效性进行确认，且禁止其对相应资源进行缓存操作。
- no-cache 不是不缓存而是不缓存过期的资源，no-store 才是真正的不进行缓存

### 指定缓存期限和认证的指令
- s-maxage 指令 `Cache-Control: s-maxage=604800`
- s-maxage 指令的功能和max-age指令相同，它们的不同点是s-maxage 指令只适用于供多位用户使用的公共缓存服务器（一般指 `代理服务器`）。也就是说，对于向同一用户重复返回响应的服务器来说，这个指令没有任何作用。
- 当使用 `s-maxage` 指令后，则直接忽略对 `Expires` 首部字段及 `max-age`指令的处理。

- `Cache-Control: max-age=604800`
- 当客户端发送的请求包含 `max-age` 指令时，如果判定缓存资源的缓存时间数值比指定时间的数值更小，那么客户端就接收缓存的资源。另外当指定的 `max-age` 值为0，那么缓存服务器通常需要将请求转发给源服务器。
- 当服务器返回的响应中包含max-age指令时，缓存服务器将不对资源的有效性再做确认，而max-age数值代表资源保存为缓存的最长时间。

- `min-fresh`
- `max-stale`
- `only-if-cached`
- `must-revalidate指令`
- `proxy-revalidate指令`
- `no-transform 指令`

#### 6.3.2 Connection
- Connection 首部字段具备如下两个作用
    1. 控制不再转发给代理的首部字段
    2. 管理持久连接

- 控制不再转发给代理的首部字段 `Connection: Upgrade`
- 管理持久连接：`keep-alive: close` 客户端会在持久连接上连续发送请求。当服务器想明确断开连接时，则指定Connection首部字段为Close
- HTTP/1.1 版本的默认连接是持久连接即 `Connection: keep-alive`

#### 6.3.3 Date
- 首部字段Date表明创建HTTP报文的日期和时间

#### 6.3.4 Pragma -- 历史遗留字段仅作为与 HTTP/1.0 的向后兼容而定义

#### 6.3.5 Trailer
- 首部字段`Trailer`会事先说明在报文主体后记录了哪些首部字段。该首部字段可以用在 HTTP/1.1 版本的分块传输编码时

#### 6.3.6 Transfer-Encoding
- 首部字段 `Transfer-Encoding: chunked` 规定了传输报文主体时采用的编码方式

#### 6.3.7 Upgrade
- 首部字段Upgrade用于检测 HTTP协议及其他协议是否可用更高的版本进行通信，其参数值可以用来指定一个完全不同的通信协议

#### 6.3.8 Via
- 使用首部字段 Via 是为了追踪客户端与服务器之间的请求和响应报文的传输路径
- 首部字段不仅用于追踪报文的转发，还可避免请求回环的发生。所以必须在经过代理时附加该首部字段内容

#### Warning
- HTTP/1.1 的warning首部是从HTTP/1.0的响应首部（Retry-After）演变过来的。该首部通常会告知用户一些缓存相关的问题的警告
- Warning 首部的格式如下。
- `Warning: [警告码][警告主机:端口号]"[警告内容]"([日期时间])`

### 6.4 请求首部字段
- 请求首部字段是从客户端往服务器端发送请求报文中所使用的的字段，用于补充请求的附加信息、客户端信息、对响应内容相关优先级等内容。

- `Accept: text/html,application/xhtml+xml,application/xml;q=0`
- Accept 首部字段可通知服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。可使用type/subtype这种形式，一次指定多种媒体类型。
    * 文本文件 `text/html, text/plain, text/css, application/xhtml+xml, application/xml ...`
    * 图片文件 `image/jpeg, image/gif, image/png ...`
    * 视频文件 `video/mpeg, video/quicktime`
    * 应用程序使用的二进制文件 `application/oct-stream,application/zip`

#### 6.4.2 Accept-Charset
- `Accept-Charset` 首部字段可用来通知服务器用户代理支持的字符集及字符集的相对优先顺序。另外，可一次性指定多种字符集。与首部字段 Accept 相同的是可用权重 q 值来表示相对优先级
- `Accept-Encoding`
- `Accept-Encoding: gzip, deflate`
- Accept-Encoding 首部字段用来告知服务器用户代理支持的内容编码及内容编码的优先级顺序。可一次性指定多种内容编码。
    * `gizp` 由文件压缩程序 gzip（GNU zip）生成的编码格式
    * `compress` 由UNIX文件压缩程序compress生成的编码格式，采用Lempel-Ziv-Welch算法
    * `deflate` 组合使用zlib格式及由deflate压缩算法生成的编码格式
    * `identity` 不执行压缩或不会变化的默认编码格式
#### 6.4.4 Accept-Language
- `Accept-Language: zh-cn,zh;1=0.7,en-us;q=0.3`
- 首部字段Accept-Language用来告知服务器用户代理能够处理的自然语言集（指中文或英文等），以及自然语言集的相对优先级。可一次指定多种自然语言集。
- 和Accept首部字段一样，按权重q来表示相对优先级。

#### 6.4.5 Authorization
- `Authorization: Basic dWVub3NlbjpwYXNzd29yZA==`
- 首部字段`Authorization`是用来告知服务器，用户代理的认证信息（证书值）。通常，想要通过服务器认证的用户代理会在接收到返回的401状态码响应后，把首部字段`Authorization`加入请求中。共用缓存在接收到含有`Authorization`首部字段的请求时的操作处理会略有差异。

#### 6.4.6 Expect
- `Expect: 100-continue`

#### 6.4.7 From
- 首部字段From用来告知服务器使用用户代理的用户的电子邮件地址

#### 6.4.8 Host
- `Host: www.hackr.jp`
- 首部字段Host会告知服务器，请求的资源所处的互联网主机名和端口号。Host首部字段在HTTP/1.1规范内是唯一一个必须包含在请求内的首部字段。
- 首部字段Host和以单台服务器分配多个域名的虚拟主机的工作机制有很密切的关联，这是首部字段Host必须存在的意义

#### 6.4.9 If-Match

#### If-Modified-Since

#### 6.4.11 If-None-Match

#### 6.4.12 If-Range

#### 6.4.13 Referer
- `Referer: http://www.hackr.jp/index.html`
- 首部字段Referer会告知服务器请求的原始资源的URI

#### 6.4.18 TE
- `TE: gizp, deflate;q=0.5`
- 首部字段TE会告知服务器客户端能够处理响应的传输编码方式及相对优先级。他和首部字段Accept-Encoding的功能很相像，但是用于传输编码

#### 6.4.19 User-Agent
- `User-Agent: Mozilla/5.0 (window NT 6.1; WOW64; rv:13.0)`

### 6.5 响应首部字段
- 响应首部字段是由服务器端向客户端返回响应报文中所使用的字段，用于补充响应的附加信息、服务器信息，以及对客户端的附加要求等信息
- `Accept-Ranges: bytes`
- 首部字段Accept-Ranges是用来告知客户端服务器是否能处理范围请求，以指定获取服务器端某个部分的资源，可指定的字段值有两种，可处理范围请求时指定其为 bytes，反之则指定其为 none
#### 6.5.2  Age
- 首部字段Age能告知客户端，源服务器在多久前创建了响应。字段值的单位为秒。若创建该响应的服务器是缓存服务器，Age值是指缓存后的响应再次发起认证到认证完成的时间值。代理创建响应时必须加上首部字段Age
#### 6.5.3 ETag
- 首部字段ETag能告知客户端实体标识。它是一种可将资源以字符串形式做唯一性标识的方式。服务器会为每份资源分配对应的ETag值。
- 另外，当资源更新时，ETag值也需要更新。生成ETag值时，并没有统一的算法规则，而仅仅是由服务器分配。
- 当资源被缓存时，就会被分配唯一性标识。
- 强ETag值和弱ETag值； 强ETag值，不论实体资源发生多么细微的变化都会改变其值；弱ETag值只用于提示资源是否相同。只有资源发生了根本改变，产生差异时才会改变ETag值。这时，会在字段值最开始处附加W/ `ETag: W/"usagi-1234"`
#### 6.5.4 Location
- `Location: http://www.usagidesign.jp/sample.html`
- 使用首部字段Location可以将响应接收方引导至某个请求URI位置不同的资源。 基本上，该字段会配合3xx：Redirection的响应，提供重定向的URI.
- 几乎所有的浏览器在接收到包含首部字段Location的响应后，都会强制性地尝试对已提示的重定向资源的访问。

#### 6.5.5 Proxy-Authenticate
- `Proxy-Authenticate: Basic realm="Usagidesign Auth"`
- 首部字段Proxy-Authenticate会把代理服务器所要求的认证信息发送给客户端。
- 它与客户端和服务器之间的HTTP访问认证的行为相似，不同之处自傲与其认证行为是客户端与代理之间进行的。而客户端与服务器之间进行认证时，首部字段 www-Authorization有着相同的作用.

#### 6.5.6 Retry-After
- `Retry-After: 120`
- 首部字段`Retry-After`告知客户端应该在多久之后再次发送请求。主要配合状态码`503Servicr Unavailable`响应，或`3XX Redirect` 响应一起使用。
#### 6.5.7 Server
- `Server: Apache/2.2.17(Unix)`
- 首部字段Server告知客户端当前服务器上安装的HTTP服务器应用程序的信息。不单单会标出服务器上的软件应用名称，还有可能包括版本号和安装时启用的可选项。
- `Server: Apache/2.2.6 (Unix) PHP/5.2.5`

#### 6.5.8 Vary
- `Vary: Accept-Language`
- 首部字段Vary 可对缓存进行控制。源服务器会向代理服务器传达关于本地缓存使用方法的命令。
- 从代理服务器接收到源服务器返回包含 Vary 指定的响应之后，若再要进行缓存，仅对请求中含有相同Vary指定首部字段的请求返回缓存。即使对相同资源发起请求，但由于 Vary 指定的首部字段不相同，因此必须要从源服务器重新获取资源

#### 6.5.9 WWW-Authenticate
- `WWW-Authenticate: Basic realm="Usagidesign Auth"`
- 首部字段 `WWW-Authenticate`用于HTTP访问认证。他会告知客户端适用于访问请求URI所指定的资源的认证方案（Basic或是Digest）和带参数提示的质询（`challenge`）。状态码`401 Unauthorized` 响应中，肯定带有首部字段 `WWW-Authenticate`

### 实体首部字段
- 实体首部字段是包含在请求报文和响应报文中的实体部分所使用的首部，用于补充内容的更新时间等与实体相关的信息。
- 在请求和响应两方的HTTP报文中都有包含与实体相关的首部字段

#### 6.6.1 Allow
- `Allow: GET, HEAD`
- 首部字段Allow用于通知客户端能够支持 `Request-URI`指定资源的所有HTTP方法。当服务器接收到不支持的HTTP方法时，会以`状态码405 Mehthod Not Allow`作为响应返回。与此同时，还会把所有能支持的HTTP方法写入首部字段`Allow` 后返回。
- `Content-Encoding: gizp`
- 首部字段`Content-Encoding`会告知客户端服务器对实体的主体部分选用的内容编码方式。内容编码是指在不丢失实体信息的前提下所进行的压缩。
- 主要有四种压缩方式 `gizp` `compress` `deflate` `identity`

#### 6.6.3 Content-Language
- `Content-Language: zh-CN`
- 首部字段Content-Language会告知客户端，实体主体使用的自然语言（指中文或英文等语言）
- `Content-Length: 15000`
- 首部字段Content-Length表明了实体主体部分的大小（单位是字节）。对实体主体进行内容编码传输时，不能再使用 `Content-Length`首部字段。

#### 6.6.5 Content-Location
- `Content-Location: http://www.hackr.jp/index.html`
- 首部字段Content-Location给出与报文主体部分相对应的URI。和首部字段Location不同，`Content-Location`表示的是报文主体返回资源对应的URI。

#### 6.6.6 Content-MD5

#### 6.6.6 Content-Range
- 针对范围请求，返回响应时使用的首部字段 `Content-Range`,能告知客户端作为相应返回实体的哪个部分符合范围请求。字段值以字节为单位，表示当前发送部分及整个实体大小

#### 6.6.8 Content-Type
- `Content-Type: text/html; charset=UTF-8`
- 首部字段 Content-type 说明了实体主体内对象的媒体类型。和首部字段 Accept 一样，字段值用 `type/subtype`形式赋值。

#### 6.6.9 Expires
- `Expires: Wed, 04 Jul 2012 08:26:05 GMT`

#### Last-Modified
- `Last-Modified: Wed, 23 May 2012 09:59:55 GMT`
- 首部字段Last-Modified 指明资源最终修改时间

### 6.7 为Cookie服务的首部字段
> Cookie 的工作机制是用户识别及状态管理。web网站为了管理用户的状态会通过web浏览器，把一些数据临时写入用户计算机内。接着当用户访问该web网站时，可通过通信方式取回之前发放的Cookie。调用Cookie时，由于可校验Cookie的有效期，以及发送方的域、路径、协议等信息，所以正规发布的Cookie内的数据不会因来自其他Web站点和攻击者的攻击而泄露。
> 1994年网景公司设计并开发了Cookie
- 为 Cookie 服务的首部字段
- `Set-Cookie` -  `开始状态管理所使用的Cookie信息` - `响应首部字段`
- `Cookie` - `服务端接收到的Cookie信息` - `请求首部字段`

#### 6.7.1 Set-Cookie
- `Set-Cookie: status=enable; expires=Tue, 05 Jul 2011 07:26:31`
- 当服务器准备开始管理客户端的状态时，会事先告知各种信息，下表：`Set-Cookie`的字段值。

| 属性        | 说明    |
| :-------    | :-----   |
| NAME=VALUE        | 赋予Cookie的名称和其值（必需项）      |
| expires=DATE        | Cookie的有效期（若不明确指定则默认为浏览器关闭前为止）      |
| path=PATH        | 将服务器上的文件目录作为Cookie的适用对象（若不指定则默认为文档所在的文件目录）      |  
| domain=域名        | 作为Cookie适用      |  对象的域名（若不指定则默认为创建Cookie的服务器域名）
| Secure        | 仅在HTTPS安全通信时才会发送Cookie      |  
| HttpOnly        | 加以限制，使Cookie不能被Javascript脚本访问      |  

- `expires` 属性
- Cookie的expires属性指定浏览器可发送Cookie的有效期。
- 当省略expires属性时，其有效期仅限于维持浏览器回话`Session`时间段内。这通常限于浏览器应用程序被关闭之前。
- 一旦Cookie从服务器发送至客户端，服务器端就不存在可以显式删除 Cookie 的方法。但可通过覆盖已过期的Cookie，实现对客户端的实质性删除操作。
- `path` 属性
- Cookie的path属性可用于限制指定Cookie的发送范围的文件目录
- `domain`
- 通过`Cookie`的`domain`属性指定的域名可做到与结尾匹配一致。比如：当指定 `example.com后`，除 `example.com` 以外， `www.example.com` 或 `www2.example.com `等都可以发送cookie。因此，除了针对具体指定的多个域名发送 Cookie 之外，不指定 `domain`属性显得更安全。

- `secure` 属性： `Cookie`的`secure`属性用于限制web页面仅在HTTPS安全连接时，才可以发送`Cookie`。 发送 `Cookie`时，指定`secure`属性的方法如下所示。
- `Set-Cookie: name=value; secure`
- 以上例子仅挡在 `https:www.example.com/ (HTTPS)`安全连接的情况下才会进行 `Cookie`的回收。也就是说即使域名相同， `http://www.example.com/ (HTTP)`也不会发生 `Cookie`回收行为。- 当省略`secure`属性时，不论 HTTP还是 HTTPS,都会对 `Cookie` 进行回收。

- `HttpOnly`属性： Cookie的HttpOnly属性时 Cookie的扩展功能，他使Javascript脚本无法获得Cookie。其主要目的为`跨站脚本攻击（Cross-site scripting， XSS）`对Cookie的信息窃取。
- 发送指定 `HttpOnly属性的Cookie的方法如下所示：`
- `Set-Cookie: name=value; HttpOnly`
- 以上设置之后 js 就无法利用`document.cookie` 读取附加 `HttpOnly`属性后的Cookie的内容，因此，也就无法在XSS中利用 JavaScript劫持Cookie了。

#### 6.7.2 Cookie
- `Cookie: status=enable`
- 首部字段Cookie会告知服务器，当客户端想获得HTTP状态管理支持时，就会在请求中包含从服务器接收到的Cookie。接收到多个Cookie时，同样可以以多个Cookie形式发送 

#### 6.8 其他首部字段
> HTTP首部字段是可以自行拓展的。所以在web服务器和浏览器的应用上，会出现各种非标准的首部字段
 * `X-Frame-Options` `X-XSS-Protection` `DNT` `P3P`

#### 6.8.1 X-Frame-Options
- `X-Frame-Options: DENY`   首部字段 X-Frame-Options 属于HTTP响应首部，用于控制网站在其他web网站的Frame标签内的显示问题。其主要目的是为了防止点击劫持（clickjacking）攻击。
- 首部字段 `X-Frame-Options` 的值为 ： `DENY: 拒绝`， `SAMEORIGIN: 仅同源域名下的页面匹配时许可` 
- 能在所有的web服务器端预先设定好 `X-Frame-Options` 字段值是最理想的状态
```
# apache2.conf的配置实例
<IfModule mod_headers.c>
Header append X-FRAME-OPTIONS "SAMEORIGIN"
</IfModule>
```

#### 6.8.2 X-XSS-Protection
- `X-XSS-Protection: 1` 首部字段 X-XSS-Protection属于HTTP响应首部，它是针对跨站脚本攻击XSS的一种对策，用于控制浏览器XSS防护机机制的开关。
- 首部字段`X-XSS-Protection`可指定的字段值如下。
    * 将XSS过滤设置成无效状态
    * 将XSS过滤设置成有效状态
> tips: XSS(Cross-site scripting，通常简称为XSS: 跨站脚本攻击)
> CSRF:跨站请求伪造（英语：Cross-site request forgery）伪装用户发起非自愿请求(通过盗取cookie) https://segmentfault.com/a/1190000007059639

#### 6.8.3 DNT
- `DNT: 1` : 首部字段DNT属于HTTP请求首部，其中DNT是 Do Not Track 的简称，意为拒绝个人信息收集，是表示拒绝被精准光改追踪的一种方法
- 首部字段DNT可指定的字段值如下： `0： 同意被追踪` `1: 拒绝被追踪`
- 由于首部字段DNT的功能具备有效性，所以web服务器需要对DNT做对应的支持