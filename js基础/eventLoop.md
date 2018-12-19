
# js 执行机制 eventLoop
> JavaScript在主线程运行的时候，会有一个堆，一个执行栈，一个事件循环，一个或多个任务队列
1. 堆：相关的对象会被分配在堆中。
2. 栈：在JavaScript运行时，程序中的代码会依次进入执行栈中，然后执行，
3. 当遇到需要执行时间较长的任务（或者说需要异步执行的任务，使浏览器不至于假死，如：setTimeout，ajax，DOM api）JavaScript就会把这些任务交给浏览器的其他模块处理，使其不至于阻塞主线程，等浏览器的模块处理玩这些任务后，会把相应的回调压入任务队列中，等执行栈中的任务执行完成，后主线程通过事件循环去任务队列中读取相应的回调，并把毁掉加入执行栈。等执行栈的任务执行完毕后，再去任务队列读取相应回调，如此循环往复。

```
heap  stack        webApis

                   DOM事件
event loop         ajax
                   setTimeout
callback queue     promise
```

- webApis， eventLoop的顺序，  promise > DOM事件 > ajax > setTimeout 

