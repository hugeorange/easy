/**
 * 覆盖 exports
 * 有时候我们只想把一个对象封装到模块中
 */

 function Hello(){
     var name;
     this.setName = function(theName){
         name = theName;
     }
     this.sayHello = function(){
         console.log('hello' + name);
     }
 }
// 通过 module.exports 导出 hello 对象
 module.exports = new Hello();

/**
 * 事实上 exports 本身仅仅是一个普通的空对象，即 {}，他专门用来声明接口
 * 本质上是通过它为模块闭包的内部建立了一个有限的访问接口。
 * 因为他没有任何特殊的地方，所以可用其他随便什么东西来代替。
 * 
 * 不可以通过对 exports 直接赋值代替对 module.exports 赋值
 * exports 其实是和 module.exports 指向同一个对象的变量。
 * 它本身会在模块执行结束后释放，但 module 不会，因此只能通过指定 module.exports 来改变接口
 */