# promise
0. Promise的三种状态 `pending` `fulfilled` `rejected`

1. Promise 实例方法 `then` `catch`
  - 
  ```
    var p1 = new Promise((resolve, reject) => {
        resolve(5);
    });

    // 如果下面then的两个参数其一为 undefined ，则相应处理情况（成功或失败）会往下一个then传递交由
    其处理
    var p2 = p1.then((res) => {
        console.log(res); // res: 5
    }, (err) => {
        console.log(err);
    }).then((res) => {  
        console.log(res); // undefined
    }, (err) => {
        console.log(err);
    })

    // 参数不为函数时会把值和状态传递下去。所以我们可以在多个then之后添加一个catch方法，这样前面只要reject或抛出异常，都会被最后的catch方法处理。
    // 这样每一个 then 的第二个函数参数（失败情况）就不用写了，直接在最后 catch ，就能捕获到流程上发生的错误
  ```

  2. Promise 静态方法
    - Promsie 的四个静态方法 `Promsie.resolve` `Promsie.reject` `Promsie.all` `Promsie.race`
    - 除了 `new Promise()` 的方式创建 promise 实例，还有两种方法：

```
// 作用相同 reject 也相同
Promise.resolve(5)

new Promise(function(resolve){
    resolve(5)
})

Promsie.resolve(5).then((res) => {}, (err) => {});
```

- `Promise.all()` 它接收一个promise对象组成的数组作为参数，并返回一个新的promise对象。

```
    当数组中所有的对象都resolve时，新对象状态变为fulfilled，所有对象的resolve的value依次添加组成一个新的数组，并以新的数组作为新对象resolve的value，例：
    当数组中有一个对象reject时，新对象状态变为rejected，并以当前对象reject的reason作为新对象reject的reason。
    我们发现，当传入的值为数字、boolean、字符串、undefined、null、{a:1}、function(){}等非promise对象时，会依次把它们添加到新对象resolve时传递的数组中
    由此我们可以看出，传入的多个对象几乎是同时执行的，因为总的时间略大于用时最长的一个对象resolve的时间。
    Promsie.all() 内部是 `同时调用` ，但返回的数组是按`传进去的顺序返回`的
```

- `Promise.race()` 它同样接收一个promise对象组成的数组作为参数，并返回一个新的promise对象。

```
    与Promise.all()不同，它是在数组中有一个对象（最早改变状态）resolve或reject时，就改变自身的状态，并执行响应的回调。
    .then((res) => {}, (err) => {}) // 会将第一个结束的promise返回值打印出来，但所有的 promise 都会执行
```

- 说明即使新对象的状态改变，数组中后面的promise对象还会执行完毕，其实Promise.all()中即使前面reject了，所有的对象也都会执行完毕。规范中，promise对象执行是不可以中断的。

 3. Promise 即使是立即执行的，他也是异步的

 ```
    new Promise((resolve, reject) => {
        console.log(1); // 立即执行
        resolve();
    }).then((res) => {
        console.log(2); // 异步执行
    })
    console.log(3);

    打印顺序：1，3，2
 ```

 4. `Deferred` 我们知道promise对象内部的状态，本身是在创建对象时传入的函数内控制，外部是访问不到的，Deferred对象在它的基础上包装了一层，并提供了两个在外部改变它状态的方法。

 ```
 class Deferred{
    constructor(){
        let defer = {};
        defer.promise = new Promise((resolve, reject)=>{
            defer.resolve = resolve;
            defer.reject = reject;
        })
        return defer;
    }
}
 ```

# jq $.Deferred() 

1. 使用方法
```
    var dtd = $.Deferred();    // 新建一个Deferred对象
    var wait = function(dtd){
        var tasks = function(){
            console.log("wait函数执行完毕！");
            dtd.resolve(); // 改变Deferred对象的执行状态
        };
        setTimeout(tasks, 5000);
        return dtd; // 返回deferred对象
    };
    wait(dtd).done(success); // 直接done调用
    wait(dtd).then(success, fail); // then调用
```
  
  - 弊端：有一个全局的 `dtd` 变量，容易在外面直接调用 `dtd.resolve()` 影响操作结果

2. `deferred.promise()`

3. `$.when()` `相当于 Promise.all()`

4. `deferred.always()` 无论成功或失败总是执行
