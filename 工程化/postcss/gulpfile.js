var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
/**
 * precss 强大的预处理器模块 和 sass 语法类似
 * 支持定义变量($bianliang: bianliangzhi;)
 * 不支持定义别名 
 * 支持 @if{}@else{}  逻辑判断
 * 支持 @for $i from 1 to 3 {} 循环语句
 * 支持 @each 循环语句 和 @for 不同的是不能循环数字，需要循环定义的项目列表
 * $list: lista, listb, listc
 * @each $item in ($list) {
 *  $item-$(list): { 具体样式 }
 * $(list) 为变量形式
 * } 
 */ 
var postcss = require('gulp-postcss'); 
var sass = require('gulp-sass');

var autoprefixer = require('autoprefixer'); // 使用浏览器前缀插件
var cssnext = require('cssnext'); // 使用css未来的语法
var precss = require('precss'); // 像sass的函数
var cssnano = require('cssnano'); // css压缩模块
// var mixins = require('postcss-mixins');  因语法和 precss 的语法不一致，所以二者不能混用
var alias = require('postcss-alias'); 


//添加 css 任务事件
gulp.task('css', function () {
    var processors = [
        cssnext,
        autoprefixer,
        precss,
        alias,
        // mixins,
    ];

    /*
    return gulp.src('./src/*.scss') 
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dest'));

    */

    //加载 css 文件
    return gulp.src('./src/*.css')
        .pipe(postcss(processors))     	//执行 postcss
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps/'))
        .pipe(gulp.dest('./dest'));   //文件输出
});


var watcher = gulp.watch('src/*.css', ['css']); 
watcher.on('change', function(event) { 
	console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); 
});