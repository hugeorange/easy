### gulp 使用流程
[参考资料](http://www.sheyilin.com/)
###### 用途
1. 编译sass文件
2. 合并优化压缩css
3. 校验压缩js
4. 优化图片
5. 添加文件指纹 
6. 组件化头部底部
7. 实时自动刷新

######  安装
1. `npm install gulp -g`  全局安装 gulp  mac 环境要 sudo
2. `npm init`             初始化 npm 目录
3. `npm install gulp --save-dev`   给项目目录安装gulp
4. 各项目目录安装所需要的gulp插件 
    `npm install gulp del gulp-cached gulp-uglify gulp-rename gulp-concat gulp-notify gulp-filter gulp-jshint gulp-ruby-sass gulp-rev-append gulp-cssnano gulp-replace gulp-imagemin browser-sync gulp-font-spider gulp-file-include gulp-autoprefixer --save-dev`

###### 使用
- 建立 `gulpfile.js` 文件，在里面引入依赖，创建任务
-
###### 安装

1. gulp是应该 watch 文件源目录还是 build 之后 dist 目录？
2. 自动 build 有没有需要？如果项目过大，自动 build 时间会不会很长？
3. ***

