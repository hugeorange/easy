var myModule = require('./module.js');
myModule.setName('orange');

var myModule2 = require('./module.js');
myModule2.setName('orange2');

myModule.sayHello();

/**
 * 运行结果输出 orange2 
 * 这是因为 myModule 和 myModule2 指向的是同一个实例
 * 因此 myModule 会被 myModule2 的结果覆盖，最终结果会由 myModule2 决定
 */


 var hello = require('./hello.js');
 hello.setName('小锦锦');
 hello.sayHello();