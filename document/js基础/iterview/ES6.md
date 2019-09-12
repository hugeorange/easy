# ES6
### 箭头函数需要注意的地方？
  - 在使用 => 定义函数的时候 this的指向是定义时所在的对象，而不是使用时所在的对象（因为箭头函数内部没有this）
  - 不能够用作构造函数，也就是说不能使用 new 命令，否则会抛出一个错误
  - 不能使用 arguments 对象 （严格模式禁用）
  - 不能使用 yield 命令

### let 、 const
1. let更完美的var，不是全局变量，具有块级函数作用域，不会变量提升。不能够重复声明同一个变量
2. const 定义常量值，不能够重新赋值，如果值是一个对象，可以改变对象里面的属性值。

- let：let声明的变量具有块级作用域，let声明的变量不能通过window.变量名进行访问，形如for(let x ...)的循环是每次迭代都为x创建新的绑定

### Set数据结构、Map
- es6方法，Set本身是一个构造函数，它类似于数组，但是成员值都是唯一的
```
const set = new Set([1,2,3,4,5]);
[...set] // [1,2,3,4]
Array.from(new Set()); // 将set进行去重
```
- Set 是ES6新增的有序列表集合，他不包含重复项，之前我们使用对象 Object，数组 Array来实现没有重复项的集合。但对象会对key进行 toString() 操作，这会导致某些key会意外覆盖之前的数据，如果key本身是一个对象，toString() 也得不到想要的结果

- Map结构提供了值-值得对应，是一种更完善的Hash结构实现，如果你需要键值对的数据结构，Map比Object更合适。它类似于对象，也是键值对的集合，但是键的范围不限于字符串，各种类型的值（包括对象都可以当做键）

### Class的讲解
- class语法相对原型、构造函数、继承更接近传统语法，它的写法能够让对象原型的写法更加清晰、面向对象编程的语法更加通俗易懂，这是 class 的具体用法
```
class Animal {
    constructor () {
        this.type = "animal";
    }
    says(say) {
        console.log(this.type + "says" + say);
    }
}
let animal = new Animal();
animal.says('hello');

class Cat extends Animal {
    constructor() {
        super();
        this.type = "cat";
    }
}
let cat = new Cat();
car.says('hello'); // cat says hello  可以继承父类的方法
```
- 可以看出在使用 extends的时候结构输出是 cat says hello 而不是 animal says hello。说明constructor内部定义的方法和属性是实例对象自己的，不能通过 extends 进行输出。
- 在ES6，子类的构造函数必须含有 `super` 函数，super 表示的是调用父类的构造函数，虽然是父类的构造函数，但是 this 指向的却是 子类的实例 cat 

### Object
1. 对象属性的声明
```
let obj = {foo, bar}
<==>
let obj = {
    foo: "foo",
    bar: "bar"
}
```
2. 对象结构
```
let obj = {x: "foo", y: "bar"};
let {x, y} = obj;
console.log(x, y); // foo, bar
```
3. 使用变量名作为属性名
```
let prop = 'key';
let obj = {
    [prop]: 'hello'
}
// 使用表达式,作为 key
let = {
    ['a' + 'b']: 'hello'
}
```
4. Object 新方法

> Object.assign
- `Object.assign(target, source1, source2, ...)`
- 将源对象的所有可枚举属性（source），赋值到目标对象（target）
- 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
```
// 属性拷贝
let obj = {foo: 123};
Object.assign({}, obj, {bar: 456});
```
- 注意点：Object.assign 方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值时对象，那么目标对象拷贝得到的是这个对象的引用
```
let obj1 = {
    a: {aaa: 2}
}
let obj2 = Object.assign({}, obj1);
obj2.a.aaa = 3; 
obj1.a.aaa // 3
```
- 常见用途：克隆对象，合并多个对象（注意浅拷贝）
> Object  遍历方法
```
// 遍历key
let obj = {a:1, b:2, c:3};
Object.keys(obj); // ['a', 'b', 'c']

// 遍历value
let obj = {a:1, b:2, c:3};
Object.values(obj); // ['1', '2', '3']

// 遍历键值对
var obj = {a:1, b:2, c: function a(){ console.log(111)}};
Object.entries(obj); // [(3) [["a", 1], ["b", 2],  ["c", ƒ]
```
### rest 参数和拓展运算符
- [ES6](#es6)
        - [箭头函数需要注意的地方？](#%E7%AE%AD%E5%A4%B4%E5%87%BD%E6%95%B0%E9%9C%80%E8%A6%81%E6%B3%A8%E6%84%8F%E7%9A%84%E5%9C%B0%E6%96%B9%EF%BC%9F)
        - [let 、 const](#let-%E3%80%81-const)
        - [Set数据结构、Map](#set%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E3%80%81map)
        - [Class的讲解](#class%E7%9A%84%E8%AE%B2%E8%A7%A3)
        - [Object](#object)
        - [rest 参数和拓展运算符](#rest-%E5%8F%82%E6%95%B0%E5%92%8C%E6%8B%93%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)
        - [Math 对象的拓展](#math-%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%8B%93%E5%B1%95)
        - [ES6 函数的拓展](#es6-%E5%87%BD%E6%95%B0%E7%9A%84%E6%8B%93%E5%B1%95)
        - [数组的拓展](#%E6%95%B0%E7%BB%84%E7%9A%84%E6%8B%93%E5%B1%95)
        - [对象的拓展](#%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%8B%93%E5%B1%95)
        - [Iterator 和 for...of 循环](#iterator-%E5%92%8C-forof-%E5%BE%AA%E7%8E%AF)


- ES6引入了rest参数（形式为 ...变量名 ）。其中 rest 参数搭配的变量是一个数组可以使用数组的一切操作   
```
function rest(...values) {
    let sum = 0;
    for(var of values) {
        sum += val;
    }
    return sum
}
add(1,2,3);
```
- 值得注意的是 rest 参数之后不能再有其他参数（只能是最后一个参数）否则会报错

- ES6 的拓展运算符可以看作是rest参数的逆运算。可以将数组转化为参数列表
```
console.log(1, ...[2,3,4,5]) // 1,2,3,4,5
```

- 可以替代apply方法，求数组最大值
```
Math.max.apply(null, [14, 3, 7])   // ES5
Math.max(...[14, 3, 7])            // ES6
``` 
- 将一个数组push另一个数组的尾部
```
// ES5 
var arr1 = [0,1,2]
var arr2 = [1,2,3]
Array.prototype.push.apply(arr1, arr2);

// es6
arr1.push(...arr2);  // 因为 ... 会将数组中的值展开
```


- 与解构赋值结合
```
let [first, ...rest] = [1,2,3,4,5];
first // 1
rest  // [2,3,4,5]
```

- 合并数组
```
[1,2].concat(more)  // ES5
[1,2, ...more]      // ES6
```

- 数组复制（深拷贝），rest 只能放在最后一位
```
var arr = [1, 2, 3]
// es5 
var arr1 = arr.concat();  // 也是深拷贝数组

// es6
[...arr1] = arr;
次数 arr1 是 arr 的深拷贝
```

### Math 对象的拓展
- Math.trunc() 去除一个数的小数部分
- Math.sign() 方法用来判断一个数是 正数、负数还是 0
```
返回5种值
正数： 返回 1
负数： 返回 -1
0：   返回 0
-0：  返回 -0
其他类型： NaN
```

### ES6 函数的拓展
- ES6之前，不能直接为函数参数指定默认值，只能采用变通的方法。
```
var y = y || "world"
假如 y 传的是 false，这种写法就会有问题
```

- ES6 声明函数默认值
```
function (x=1, y=2) {
    // x, y 是已经声明过得，不能再通过 let 或 const 声明
}
```


### 数组的拓展
- 拓展运算符（spread）是三个点（...）.它好比 rest 参数的逆运算，将一个数组转为用 逗号分隔的参数序列

- 实现了 Iterator 接口的对象 - 任何Iterator接口的对象，都可以用拓展运算符转为真正的数组
```
let nodeList = document.querySelector('div');
let array = [...nodeList];
这样维数组就能使用 数组方法了
```

- Array.from()  方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象
```
将下面的类数组转换为真正的数组
let arrayLike = {
    '0' : 'a',
    '1' : 'b',
    '2' : 'c',
    length: 3
}
// ES5的写法
var arr1 = [].slice.call(arrayLike);

// es6
let arr2 = Array.from(arrayLike);

实际应用中，常见的类似数组的对象时 DOM 操作返回的 NodeList集合，以及函数内部的arguments 对象。Array.from 都可以将他们转为真正的数组
```

- Array.of() 方法用于将一组值，转换维数组
- find 和 findIndex
```
find 参数为 函数
[1,2,3,4].find(n => return n > 3)
返回第一个符合条件的成员，没找到返回 undefined
findIndex 返回索引
参数为函数 ，函数参数通 forEach map等
```

- 数组实例的 includes()
```
Array.prototype.includes 方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串 includes 方法类似。
[1,2,3].includes(2)  // true
[1,2,3].includes(4)  // false
[1,2,NaN].includes(NaN) // true

第二个参数开始搜索的位置

与 indexOf 功能相同，indexOf 得有比较，无法判断 NaN
```

- 数组空位
```
ES5 对空位的处理不一致，forEach  join split

ES6 明确将空位转为 undefined
```

### 对象的拓展
- `__proto__` 属性，Object.setPrototypeOf(), Object.getPrototypeOf()
- javascript 语言的对象继承是通过原型链实现的，ES6提供了更多的原型对象的操作

- Object.create(obj, {}) 与 new Object() 的区别
```
Object.create({}) 是将对象继承到 __proto__ 属性上
new Object({})  直接放在实例上
```

- 对象的拓展与算符与数组拓展运算符不同
- 对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的、尚未被读取的属性、分配到指定的对象上面，所有的键和他们的值，都会拷贝到新对象上面
```
let {x, y, ...z} = {x:1, y:2, a:3, b:4}
x // 1
y // 2
z // {a:3, b:4}

let {...obj} = {x:1, y:2, a:3, b:4};  // 一样可以深拷贝,但是只可深拷贝一层，如果key的值是复杂数据类型就不行了
和 Object.assign() 方法一致，只可深拷贝一层
和数组拓展运算符一致
```

### Iterator 和 for...of 循环
- Array Object  Map  Set
- 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）
- Iterator的作用有三个：一是为各种书结构，提供一个统一的、简便的访问接口；二：使得数据结构的成员能够按某种次序排列；三：ES6创造了一种新的遍历命令 `for ... of` 循环，Iterator 接口主要供 `for ... of...`消费
- 原生具备 Iterator 接口的数据结构如下。
Array
Map
Set
String
TypedArray
函数的 arguments 对象
NodeList 对象



### JS数据类型 
- ES5 1.underfind 2.布尔值 3.数值型 4.字符串型 5.null 6.Object(复杂数据类型)
- ES6 多一种 Symbol 类型