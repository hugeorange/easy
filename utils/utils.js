/**
 *  该方法为 Date 对象新增了一个 format 方法，传入一个时间格式
 *   new Date()  对象
 *   format 格式： 'yyyy-MM-dd hh:mm:ss' 字符串
 *
 *   使用示例：
 *   var time = new Date();
 *   time.format('yyyy-MM-dd hh:mm:ss');
 *   返回数据："2017-07-19 16:03:17"
 *   time.format('yyyy qq');  2017 03   2017年第三季度
 * */

Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1,                             //month
        "d+" : this.getDate(),                                //day
        "h+" : this.getHours(),                               //hour
        "m+" : this.getMinutes(),                             //minute
        "s+" : this.getSeconds(),                             //second
        "q+" : Math.floor((this.getMonth()+3)/3),             //quarter   季度
        "S" : this.getMilliseconds()                         //millisecond  毫秒
    };

    if(/(y+)/.test(format)) {                                //年
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {                                        //其他参数
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
};


// =====================================================================


var utils = {

    /**
     * 获取 浏览器 url 参数
     * 使用方法：
     *  var　value = getUrlParam('参数名')
     * **/
    getUrlParam:function (c) {
        var b = window.location.href;
        var d = new RegExp("[?&]" + c + "=([^&]+)", "g");
        var g = d.exec(b);
        var a = null;
        if (null != g) {
            try {
                a = decodeURIComponent(decodeURIComponent(g[1]))
            } catch (f) {
                try {
                    a = decodeURIComponent(g[1])
                } catch (f) {
                    a = g[1]
                }
            }
        }
        return a
    },

    /**
     * math.floor() 向下舍入
     * math.ceil() 向上舍入
     * math.round() 四舍五入
     * math.random() 生成一个 0~1 之间的随机数
     *
     * random1 生成一个 min <= a < max
     * random2 生成一个 min < a <= max
     * */
    random1:function(min,max){
        return Math.floor( min + Math.random()*( max - min ));
    },

    random2:function (min,max) {
        return Math.ceil( min + Math.random()*(max - min ) );
    },


    /***
     *  将毫秒数转换为 x天x时x分x秒x毫秒
     * */
    timeFormat:function(ms){
        var ss = 1000;
        var mi = ss * 60;
        var hh = mi * 60;
        var dd = hh * 24;
        var day = parseInt(ms / dd);
        var hour = parseInt((ms - day * dd) / hh);
        var minute = parseInt((ms - day * dd - hour * hh) / mi);
        var second = parseInt((ms - day * dd - hour * hh - minute * mi) / ss);
        var milliSecond = parseInt(ms - day * dd - hour * hh - minute * mi - second * ss);  //毫秒
       
        var tstring = "";
        
        if(day>0){
            tstring+=day+'天';
        }
        if(hour>0){
            tstring+=hour+'小时';
        }
        if(minute>0){
            tstring+=minute+'分钟';
        }
        if(second>0){
            tstring+=second+'秒';
        }
        return tstring;
    },
    
    /**
     * 预加载单张图片
     * */
    //图片加载时的默认图片
    loadimg:function(url,cb){
        var img = new Image();
        img.src = url;
        if(img.width){
            cb && cb(img);
        }else{
            img.onload = function(){
                cb && cb(img);
            }
        }
        img.onerror = function () {
            cb && cb(false);
        }
    },

    /**
     *     预加载多张图片
     *     c ==> 待加载的图片数组
     *     h ==> 成功的回调函数
     *     h(f,b)  成功后的回调函数  f: 加载完成的图片数组
     *     当 c.length == f.length       即预加载完成
     * */
    loadimgs:function(c, h) {     // c ：待加载图片数组 ， h：回调函数
        var a = 0;
        var f = [];                            // f:已加载图片，b：始终为空数组？？？意义何在
        var b = [];
        if (!c || 0 == c.length) {
            h(f, b)
        } else {
            for (var d = 0; d < c.length; d++) {
                a++;
                var g = c[d];
                (function (i) {
                    setTimeout(function () {
                        utils.loadimg(i, function (j) {   // j形参 ，代表已加载的那张图片
                            e(i, j)
                        })
                    }, d * 10)
                })(g)
            }
        }
        function e(j, i) {
            if (i) {
                f.push({src: j, img: i})
            } else {
                b.push({src: j, img: i})
            }
            h(f, b)
        }
    },
    
    /**
     * 操作  cookie
     * 存储  setItem                  utils.cache.setItem(key,value)
     * 移除  removeItem               utils.cache.removeItem(key)
     * 读取  getItem                  utils.cache.getItem(key)
     * */

    cache:(function(){
        //获得coolie 的值
        function addCookie(objName,objValue,objHours){      //添加cookie
            var str = objName + "=" + decodeURIComponent(objValue);
            if(objHours > 0){                               //为时不设定过期时间，浏览器关闭时cookie自动消失
                var date = new Date();
                var ms = objHours*3600*1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
            }
            document.cookie = str;
        }

        //两个参数，一个是cookie的名子，一个是值
        function SetCookie(name,value) {
            var Days = 30; //此 cookie 将被保存 30 天
            var exp = new Date();    //new Date("December 31, 9998");
            exp.setTime(exp.getTime() + Days*24*60*60*1000);
            //如果在同一域名不同目录下，共享 cookie 必须要加上 path 属性
            document.cookie = name + "="+ decodeURIComponent(value) + ";expires=" + exp.toGMTString() + ";path=/";
        }

        //取cookies函数
        function getCookie(name) {
            var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
            if(arr != null) return decodeURIComponent(arr[2]); return null;
        }

        //删除cookie
        function delCookie(name) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=getCookie(name);
            if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }

        var obj =  {
            setItem:function(key, val){
                console.log('setItem', key, val);
                SetCookie(key, val);
            }
            ,removeItem:function(key){
                console.log('removeItem', key);
                delCookie(key);
            }
            ,getItem:function(key){
                console.log('getItem', key);
                return getCookie(key);
            }
        };
        return obj;
    })()

};


// =====================================================================


//报错提示 用于手机端 调试
window.onerror1= function(msg,url,l){
    txt="There was an error on this page.\n\n"
    txt+="Error: " + msg + "\n"
    txt+="URL: " + url + "\n"
    txt+="Line: " + l + "\n\n"
    txt+="Click OK to continue.\n\n"
    console.log(msg,url,l);
    alert(txt)
    return true
};





// =====================================================================

/**
 * 日期：2018-01-17
 * 异步函数执行队列 - 借鉴自：https://juejin.im/post/5a06c6d051882555cb19416b?appinstall=0
 *     -----------使用说明----------
 * 1. 通过导出的类 new 一个新的对象 queue
 * 2、把所有函数【包含异步执行的函数】按照顺序依次 使用queue.push存入
 * 3、在函数参数的最后加一个 callback 参数，并在当前函数执行完成后调用callback以保证函数的顺序执行; 如: callback && callback.call(queue)
 * */

function AsyncQueue() {
    this.list = [];
}
AsyncQueue.prototype = {
    push: function(func, args) {
        var funcObj = { fn: func, args: args };
        if(Object.prototype.toString.call(func) === "[object Function]" && Object.prototype.toString.call(args) === "[object Array]") {
            this.list.push(funcObj);
        } else {
            throw new Error("push方法的参数，1：函数，2：数组");
        }

    },
    start: function() {
        if(this.list.length) {
            var funcObj = this.list.shift(); //截取第一个函数对象
            var fn = funcObj['fn'];
            var ary = funcObj['args'];
            var len = ary.length;
            if(len && ary[len-1] === 'callback') { 
                if(len === 1) { // 队列中的异步方法不存在参数
                    fn(this.start);
                } else {
                    ary.pop();              // 删除最后一个参数
                    ary.push(this.start);    // 把真实的回调函数存入数组
                    fn.apply(this, ary);    // 执行函数，把 star 方法传进去充当 callback
                }
            } else { // 队列中的方法不存在异步方法
                fn.apply(this, ary);
                this.start();
            }
        }
    }
}
export default AsyncQueue;



/**
 * 使用示例
 */

 /*
    var queue = new AsyncQueue();
    function func1 (a, callback) {
        setTimeout(() => {
            console.log('我是func1', a);
            callback && callback.call(queue);
        },3000);
    }
    function func2 (b, callback) {
        setTimeout(() => {
            console.log('我是func2', b);
            callback && callback.call(queue);
        },2000);
    }
    function func3 (c, callback) {
        setTimeout(() => {
            console.log('我是func3', c);
            callback && callback.call(queue);
        },1000);
    }
    var a = 100;
    var b = 200;
    var c = 300;
    queue.push(func1, [a, 'callback']);
    queue.push(func2, [b, 'callback']);
    queue.push(func3, [c, 'callback']);
    queue.start();

    */

