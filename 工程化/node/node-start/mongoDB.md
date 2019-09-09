# mongoDB 下载，安装，连接
1. 菜鸟教程下载地址：`http://www.runoob.com/mongodb/mongodb-osx-install.html`
2. 不管使用 `curl` 或者 `homebrew` 下载，如果不翻墙的话，速度会很让人捉急。

# 运行 MongoDB
1. 首先我们在本地根目录创建一个数据库存储目录 `data/db`
2. 进入 mongoDB 安装目录 `cd /usr/local/mongodb/bin` 
    （网上人都说是在这个目录下，我的却偏偏是在这个目录下 `cd /usr/local/var/mongodb/bin`）
3. `sudo ./mongod`  ( mongod 是用来连接到mongodb数据库服务器的，即服务器端 )
4. 然后再打开一个终端，进入相同目录
    执行 `./mongo` ( mongo 是用来启动MongoDB shell的，是mongodb的命令行客户端 )

# 注意点
1.  mongodb 数据默认存在/data/db下，所以需要创建这个文件夹，以及设置权限
    `sudo mkdir -p /data/db`
2. 把 MongoDB 的二进制命令文件目录（安装目录/bin）添加到 PATH 路径中：(这样以后就可以在任意目录下启动 MongoDB)
    - `open ~/.bash_profile` (如果不存在则自己创建一个 `touch .base_profile`)
    - `export PATH=/usr/local/mongodb/bin:$PATH`  （放进该文件）
    - `source ~/.bash_profile` (重启该文件)
3. 配置完之后，就可以在任意目录下，启动 mongoDB 了
    - `sudo mongod (忘记为什么要需要管理员权限了、、、)`
    - `mongo`
4. Node.js 连接 mongoDB 
   http://www.runoob.com/nodejs/nodejs-mongodb.html
- 参考文章
  * http://blog.csdn.net/shubinniu/article/details/52815604
  * http://www.jianshu.com/p/2d0a1ecd0c82
  * http://www.runoob.com/mongodb/mongodb-osx-install.html