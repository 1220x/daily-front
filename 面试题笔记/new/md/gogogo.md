# GoGoGo

# [最全的Vue面试题+详解答案](https://juejin.cn/post/6961222829979697165)

# [最全的手写JS面试题](https://juejin.cn/post/6968713283884974088)

# [2020最新：100道有答案的前端面试题（上）](https://juejin.cn/post/6847902225423925255)

# [前端万字面经-基础篇](https://juejin.cn/post/6992767550543265829)

# [前端万字面经-进阶篇](https://juejin.cn/post/6993141036600000548)

## 从输入一个URL地址到浏览器完成渲染的整个过程
- [史上最详细的经典面试题-从输入URL到看到页面发生了什么？](https://juejin.cn/post/6844903832435032072)

- 网络、浏览器原理、前端性能优化

### 简洁版本
- 浏览器输入地址并回车
- 浏览器查找当前URL是否存在缓存，比较缓存是否过期
- DNS解析URL对应的IP
- 根据IP建立TCP连接（三次握手）
- 发送http请求
- 服务器处理请求，浏览器接受HTTP响应
- 浏览器解析并渲染页面
- 关闭TCP连接（四次握手）

### 详细版本
- DNS解析
- 发起TCP连接
- 发起HTTP请求
- 服务器处理请求并返回HTTP报文
- 浏览器解析渲染页面
- 连接结束

#### DNS解析
- 是什么？ 网址 和 IP地址 的转换。实际上是一个递归的过程
- 本机域名服务器 -> 根域名服务器 -> COM顶级域名服务器 -> google.com域名服务器
- `.` -> `.com` -> `google.com.` -> `www.google.com`
- 默认情况下，所有的网址的最后一位都是`.`，因为是默认情况，为了方便用户，通常会省略，浏览器在请求DNS的时候会自动加上
- 在有很多服务器来支撑访问的情况下，DNS会返回一个合适的机器的IP给用户，例如可以根据每台机器的负载量，机器距离用户的地理位置等，这就是DNS负载均衡
- DNS缓存：浏览器缓存、系统缓存、路由器缓存、IPS服务器缓存、根域名服务器缓存、顶级域名服务器缓存、主域名服务器缓存

#### TCP连接
- 面向连接的、可靠的字节流服务
- TCP报文中的源端口号和目的端口号同IP报文中的源IP与目的IP唯一确定一条TCP连接
- 序号确保了TCP传输的有序性，确保可靠传输的关键部分。序号是该报文段发送的数据组的第一个字节的序号。
- 确认号Ack，指明下一个希望收到的字节序号，表明该序号之前所有的数据，已经准确无误的收到，确认号只有当ACK标志位1的时候才会有效。TCP规定，在建立连接后的所有报文的传输都必须把ACK置1
- 当SYN=1，ACK=0，表明是连接请求报文，若同意连接，则响应报文中应该使SYN=1，ACK=1（SYN是用来同步序号的）
- FIN-释放连接，FIN为1，表示此报文的发送方已经发送完毕
- 确认序号Ack = Req + 1；控制位中的确认号ACK

#### 发送HTTP请求
- 发送HTTP请求的过程，就是构建HTTP请求报文，并通过TCP协议发送到服务器指定端口的过程
- 请求报文包括：请求行 + 请求报头 + 请求正文
- GET和POST的区别：
    - GET会产生一个TCP数据包，POST会产生两个TCP数据包
        - GET请求，浏览器会把header和data一起 发送出去
        - POST请求，浏览器会先发送header，服务器响应100 continue，浏览器再发送data
        - 并不是所有浏览器的post请求都会发送两个数据包，Firefox就发送一次
- Connection：keep-alive，用于告诉客户端，本次HTTP请求 结束之后并不需要关闭TCP连接，这样可以使下次HTTP请求使用相同的TCP通道，节省TCP连接建立的时间
- HTTP属于客户端缓存，常认为浏览器有一个缓存数据库，用来保存一些静态文件。
- 缓存分为：强缓存和协商缓存。强缓存的优先级高于协商缓存。若两种缓存都存在，且强缓存命中，则协商缓存不会再验证标识。
    - 强缓存：缓存数据库中有数据，且没有过期，直接从缓存数据库中取数据，不请求服务器。有数据但是缓存失效，请求服务器，服务器返回数据和缓存规则，将数据和缓存规则存入缓存数据库中
    - 协商缓存：从缓存数据库中获取缓存数据标识，请服务器验证标识是否失效，没有失效则返回304，直接冲缓存中取数据。失效则返回新的数据和缓存规则，将数据和缓存规则存入数据库。
- 缓存的响应头：
    - 强缓存：响应头中的Expires和Cache-Control
        - Expires：服务器返回的数据到期时间。http1.0的。时间的对比可能会有误差，现在更多使用cache-control
        - Cache-Control：
            - Private：客户端可以缓存
            - public：客户端和代理服务器都可以缓存
            - max-age=t：缓存内容将在t秒后失效
            - no-cache：需要使用协商缓存来验证缓存数据
            - no-store：所有内容都不会缓存
    - 协商缓存：
        - Last-Modified：服务器返回的，说明资源的最后修改时间。客户端在请求时会带上`if-Modified-Since`，值为资源的最后修改时间，服务器收到后对比时间，判断资源有没有过期
        - Etag：服务器响应头中，告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）。客户端再次请求时会带上`if-None-Match`，服务器匹配这个唯一 标识，不同则说明该资源被改动过
- 不同的刷新页面的方式
    - 浏览器地址栏中写入URL，回车：发现有缓存，就不继续请求了，直接从缓存中取
    - F5，取服务器看看资源是否 过期，请求会带上if-modified-since
    - Ctrl+F5：吧缓存的文件删了，从服务器请求完整的资源

#### 浏览器渲染页面
- 回流：
    - 一些常用且会导致回流的属性和方法
        - clientWidth、clientHeight、clientTop、clientLeft。。。

## webpack的loader和plugin
- loader - 用于处理模块源码的转换，描述了webpack如何处理非JavaScript模块。从不同的语言转换为JavaScript语言（css-loader、style-loader）
- plugin - 用于解决loader无法实现的其他事，直接作用于webpack，扩大webpack的功能。

- [前端进阶高薪必看-webpack篇](https://juejin.cn/post/6844904150988226574)

## JS的事件流
### 冒泡阶段
从确定的目标到不确定的目标
### 目标阶段
触发事件的真正元素
### 捕获阶段
从不确定的目标到确定的目标
### addEventListener
- addEventListener('', callback, false);
- 第三个参数：默认值为false，表示此时是冒泡阶段；为true则为捕获阶段
- target --- 触发事件的元素
- currentTarget --- 事件绑定的元素

### 事件委托
- 不给每个子节点设置事件监听器，而是在父节点上设置，然后利用事件冒泡原理设置每个子节点
- 优点：
    - 动态绑定事件：因为事件绑定在父元素上面，新添加的元素也可以触发事件
    - 减少内存消耗和dom操作。
        - 每个事件处理函数都是一个对象，多一个事件处理函数，内存中就被多用了一部分空间。
        - 添加到页面上的事件处理程序数量直接关系到页面的整体运行性能，因为需要不断的操作dom，那么引起回流和重绘的可能也就越多，页面交互的时间也会变得越长。

## 渲染层合成
在DOM树中的每一个节点都会对应一个渲染对象，当他们的渲染对象处于同一个坐标空间（Z轴空间）时。就会形成一个渲染层。渲染层将保证页面元素以正确的的顺序进行堆叠，这时候就会出现层合成，从而正确的处理透明元素和重叠元素的显示。

浏览器创建新的渲染层：
- 根元素
- 有明确的定位元素（relative、fixed、sticky、absolute）
- CSS filter属性
- CSS mask属性
- CSS transform不为none
- overflow不为visible


## call apply bind
### 共同点
- 改变this的指向
- 三者的第一个参数，都是this要指向的对象，没有这个参数则设置为undefined或者null，则默认指向全局window
- 
### 不同点
- call：出第一个参数外，后续的参数是一个数组。是一次性传入参数
- apply：除第一个参数外，后续的参数是参数列表，一个接一个的参数。是一次性传入参数。
- bind：出第一个参数外，后续的参数是参数列表，一个接一个的参数，参数可以分多次传入。

- call、apply函数时立即执行的；bind函数不是立即执行，会返回一个新的函数。如果这个返回的函数作为构造函数创建一个新的对象，那么此时this不会指向传给bind的 第一个参数，而是指向用new创建的实例
    ```
// let没有变量提升，用let声明的变量，不会默认成为window的属性
        let name = '我是全局的name';

        window.name = '我是window的name';  
        
        let age = 120;

        // var 声明变量有变量提升，默认会成为window的属性。
        var number = 20;

        let originObj = {
            name: '改变后的的对象name'
        }

        function testFunc() {
            // 
            console.log('我输出啦。。。。', this.name, ...arguments);
            console.log(this)

            // 这个局部 var声明的变量不会成为window的属性
            var testVar = 33333;
        }

        testFunc(1);

        // 改变this的指向
        testFunc.call(originObj, 2, 3);

        testFunc.apply(originObj, [4, 5]);

        testFunc.bind(originObj, 6, 7)();

        let latestObj = new testFunc(originObj, 8, 9);
    ```
- tips：this的指向
    - ES5中：this永远指向调用它的那个对象。var声明的变量默认自动成为window的属性。let声明的变量则不会。
    - ES5中，前面没有调用的对象，那么就是全局对象window。严格模式下全局对象window为undefined


## 闭包的运用 - 栗子

**闭包的定义：当一个函数被创建并传递或者从另一个函数返回时，它会携带一个背包，背包中是函数声明时作用域内的所有变量**

- 防抖：持续触发事件处理函数，只有当一段时间没有触发时，没回执行事件处理函数
- 节流：一定时间内只会执行一次事件处理函数
- 使用闭包模拟块级作用域
    ```
    function outputNumbers(count) {
        (function() {
            for (var i = 0; i < count; i++) {
                alert(i);
            }
        })();
        alert(i) // 会报错
    ```
- 闭包可以用于在对象中创建私有变量。


## CSS优先级
- ！important 优先级最高
- 内联样式 style
- ID选择器
- 类、伪类、属性选择器: .foo    :first-child   div[class="foo"]
- 标签、伪元素选择器：div    ::first-line
- 通配符、子类选择器、兄弟选择器： *   >    +
- 继承的样式没有权重

## 事件循环
JS有同步任务和异步任务的概念，同步任务在主线程执行，会形成一个执行栈。事件触发线程管理着一个任务队列，当异步任务有了执行，就会在任务队列中放入一个事件回调。一旦执行栈中的任务执行完，就会读取任务队列，将可执行的异步任务添加到执行栈中
，开始执行。

执行栈 -- 任务队列 -- 执行栈  循环往复 ----> 事件循环

JS还有宏任务和微任务之分。

常见的宏任务：
- script代码块
- setTimeout
- setInterval
- setImmidiate

常见的微任务
- primise.then
- catch
- finally
- process.nextTick


## http状态码
### 1xx 继续请求

post 请求。会发送两个数据包，header和data是分开发送的，header先发送，状态码为100，继续请求，data发送完，状态码才是200
### 2XX 请求成功
- 204 无内容，服务器成功处理了请求，但是没有内容返回
### 3XX 重定向
- 301 请求的网页已移动到新的位置，服务器会自动将请求转到新的位置 --- 永久移动
- 302 服务器从不同的位置的网页响应请求，但是请求者应该还是使用原来的位置请求 ---- 临时移动
- 304 未修改，不会返回内容，客户端直接从缓存中取
### 4XX 客户端发生错误
- 400 错误请求，服务器不理解请求的语法，一般为参数错误
- 401 未授权，需要验证身份
- 403 禁止访问
- 404 服务器找不到请求的网页
### 5XX服务端发生错误

## http2.0做了哪些改进？3.0呢？

http是应用层协议，建立在传输层上面，传输层协议有tcp、udp，2.0和1.0都是基于TCP的，因此都会有TCP带来的硬伤以及局限性。3.0是建立在UDP的基础上的，所以3.0和2.0有着本质的不同。

[Http2.0的一些思考以及Http3.0的优势](https://blog.csdn.net/m0_60360320/article/details/119812431)

### 2.0的特性
- 二进制分帧传输
- 多路复用
- 头部压缩
- 服务器推送

### 3.0的特性
- 连接迁移
- 无对头阻塞
- 自定义的拥塞控制
- 前向安全和前向纠错


## 作用域
执行一段JavaScript代码必不可少的：JS引擎 + 编译器。

### 编译
- 词法分析
- 语法分析

## Promise的实现
根据Promise/A+规范来实现。

### 基础功能的实现
- 三种状态
- 一个构造函数
- 一个then方法

### then方法的实现
- resovled状态时的实现
- rejected状态时的实现
- pending状态时的实现

### 支持异步的实现
- 各需一个数组来存放成功的回调和失败的回调
- then方法中，当状态为pending时，放入各自的回调数组中
- 在resolve方法和rejected方法中，去调用各个回调函数实现异步的处理

### 链式调用的实现

#### then的需求
- then方法要返回一个**Promise对象**
- 如果then返回的是一个普通值（如Number、String），就用此值包装成一个新的Promise对象返回
- 如果then方法中，没有return语句，就返回一个用undefined包装的Promise对象
- 如果then方法中出现异常，则调用失败状态下的方法跳转到下一个then的onRjected
- 如果then没有传入任何回调，则继续向下传递（值穿透）
- 如果then中返回了一个Promise对象，那就以这个对象为准，返回它的结果

#### then的实现
- then方法没有传入回调的时候，则继续向下执行。但是每个then都要返回一个新的Promise对象
```
Promise.prototype.then = function (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value

    onRejected = typeof onRejected === 'function' ? onRejected : (err) => err

    // 每个then都返回一个Promise对象
    let promise2 = new Promise((resolve, reject) => {
        if (this.state === 'pending') {
            // 直接将回调push
            // this.onResolvedCallbacks.push(onFulfilled)
            // this.onRejectedCallbacks.push(onRejected)

            // 回调外面再套一个回调
            this.onResolvedCallbacks.push(() => {
                try {
                    let x = onFulfilled(this.value);
                    resolve(x);
                } catch (err) {
                    reject(err);
                }
            })

            this.onRejectCallbacks.push(() => {
                try {
                    let x = onRejected(this.reason);
                    resolve(x);
                } catch (err) {
                    reject(err);
                }
            })
        }

        if (this.state === 'resolved') {
            try {
                // 拿到返回值resolve出去
                let x = onFulfilled(this.value);
                resolve(x);
            } catch (err) {
                // catch 捕获异常rejecte抛出
                reject(err);
            }
        }

        if (this.state === 'rejected') {
            try {
                let x = onRejected(this.reason);
                resolve(x);
            } catch (err) {
                reject(err);
            }
        }
    })

    return promise2;
}
```

```
    // 测试 then 方法没有传入回调的场景
    let p1 = new Promise((resolve, reject) => {
        // 状态该为rejected
        reject('p1 --- 1000')
    }).then((data) => {
        // 这个then里面，没有rejected状态的回调，then方法里面会生成这个回调，再返回一个新的promise对象，可以一直链式调用下去
        console.log(data);
    }).then((data) => {
        console.log(data);
    })
```

- then 根据上一个then方法的返回值来生成新的Promise对象 --- 逻辑复杂
    ```
        /**
         * 解析then返回值与新的promise对象
         * @param {Object} 新的Promise对象，就是我们创建的promise2实例
         * @param {*} 上一个then的返回值
         * @param {Function} resolve promise2处理器函数的resolve
         * @param {Function} reject promise2处理器函数的reject
         * **/
        function resolvePromise(promise2, x, resolve, reject) {
            // 1、为避免循环引用，当then的返回值与新生成的Promise对象为同一个（引用地址相同），则抛出TypeError错误。否则程序会死掉
            if (promise2 === x) {
                reject(new TypeError('请避免Promise循环引用'));
            }

            // 2、判断x的类型，分情况处理
            
        }
    ```
    - 为避免循环引用，当then的返回值与新生成的Promise对象为同一个（即引用地址相同），则抛出TypeError的错误。如果返回了自己的 Promise对象，状态永远为等待态，再也无法成为 resolved或是rejected，程序就死掉了。
    ```
        let promise2 = new Promise((resolve, reject) => {
            return promise2;
        })
    ```
    - 判断x的类型，分情况处理
        - 当x为一个Promise对象时，执行这个对象，成功即成功，失败即失败
        - 若x是一个对象或者函数，再进一步处理它
        - 否则就是一个普通值

        - 考虑：当promise对象转为成功态或者失败的时候，传入的还是一个promise对象，此时应该继续执行，知道最后的promise执行完。采用递归的方式解决：递归resolvePromise方法，知道将promise解析为一个普通值。
            ```
                // 传入的还是promise对象的栗子
                Promise.resolve(1).then((resolve) => {
                    return new Promise((resolve, reject) => {
                        resolve(
                            // 这个resolve传入的还是一个promise对象，此时应当继续执行这个传入的promise，知道解析为一个普通值。
                            new Promise((resolve, reject) => {
                                reslove(2)
                            })
                        )
                    })
                })

                resolvePromise(promise2, y, resolve, reject);
            ```
        - promise/A+规范定义：如果resolvePromise和rejectPromise都被 调用，或者多次调用同一个参数，第一个调用优先，任何进一步的调用都将被忽略，设定一个called来防止多次调用
    - Promise 中处理器函数时同步执行的，then方法时异步的还是一个微任务。我们用`queueMicrotask`来实现一个微任务。
        ```
        queueMicrotask(() => {
            try {
                let x = onFulfiiled(calue);
                resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
                reject(e);
            }
        })
        ```



#### catch的实现
直接执行then方法，onFulfilled为none，传入onRejected

```
Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
}
```

#### resolve的实现
直接抛出一个成功状态的promise。

```
Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val);
    })
}
```

#### reject的实现
直接抛出一个拒绝状态的promise。

```
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val);
    })
}
```

#### race方法的实现
```
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        // 遍历执行promises
        for (let i = 0; i < promises.length; i++) {
            // then 只要接收到状态改变，就直接抛出
            promises[i].then(resolve, reject)
        }
    })
}
```

#### all方法的实现

获取到所有的promise，都执行then，把结果放到数组，一起返回

```
Promise.all = function (arr) {
    let aResult = [];
    return new Promise(function(resolve, reject) {
        let i = 0;
        // 开始逐次执行数组中的函数（重要）
        next();

        function next() {
            arr[i].then(function(res) {
                // 存储每次得到的结果
                aResult.push(res);

                i++;

                if (i >= arr.length) {
                    // 如果函数数组中的函数都执行完，变resolve
                    resolve(aResult);
                } else {
                    next();
                }
            })
        }
    })
}
```

#### 总结
- then方法返回的是一个全新的promise对象
- then方法是一个微任务这种说法是不准确的，应该说then方法的回调函数，会被作为微任务执行。
- then方法并不是在上一个Promise对象resolve之后才执行的，它在一开始就执行并返回了一个新的promise对象，在返回的新的promise对象中会根据上一个promise的状态来做出判断。
    - 上一个promise状态在成功态的时候，会直接then方法回调作为微任务入队列
    - 上一个promise状态在失败态的时候，会直接then方法回调作为微任务入队列
    - 上一个promise状态在等待态的时候，它的内部会把then方法的回调使用微任务方法包裹缓存到新的 promise实例数组中，并没有直接入队。当上一个promise从等待态变为成功态的时候，会调用其自身返回的的新的promise的resolve方法，从而调用新的promise的实例数组中的方法，这时微任务方法包裹的回调函数就会执行，即入栈。
- 上一个promise中return一个Promise和直接return一个值或者不写值的处理方式是不一样的。
    - 上一个promise中什么都不return，即回调的返回值为 undefined，和直接return一个值一样，都会在promise状态为成功态时调用其返回时内部 创建的新的Promise的resolve方法并将值传出
    - 上一个promise对象中return一个promise对象的话，会会上一个promise对象状态为成功态时，调用其then方法执行，拿到值resolve或reject出去。（由于return promise时会在内部执行一个 then方法，所以这里多执行了一个微任务，但是这个微任务其实什么都没有做，只是为了取我们自己return的Promise的值）
    - 实际：现在浏览器中的执行结果是 --- then方法中，如果返回的是一个promise对象，内部会产生两个微任务，两个无输出的微任务

## position的值有哪些
- static
- absolute：给元素设置绝对的定位。
    - 如果存在有祖先元素设置了relative定位或absolute，那么此时元素的定位对象为这个有定位的元素
    - 如果没有祖先元素设置了relative或者absolute定位，那么元素会相对于body进行定位
- relative：给元素设置相对于原本位置的定位，元素不脱离文档流，因此元素原位置还是会被保留，其他元素的位置不会收到影响。
- sticky：在屏幕范围内（viewport）时，该元素的位置并不收到定位影响（设置的top、left是无效的），当该元素的 位置将要移除偏移范围时，定位又会变成fixed，根据设置的left、top等属性成固定位置的效果
- fixed：总是相对于body进行定位

## 垂直水平 居中的 实现方式 

### 定宽高

#### 绝对定位 + margin负值
```
position: absolute;
top: 50%;
left: 50%;
margin-left: 自身宽度的一半;
margin-top: 自身高度的一半;
```

#### 绝对定位 + transform
```
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

#### 绝对定位 + left/right/top/bottom + margin
```
position: absolute;
display: inline;
top: 0;
right: 0;
bottom: 0;
left: 0;
margin: auto;
```

#### flex布局

#### grid
```
// parent
display: grid;

// children
margin: auto;
```

#### table
```
// parent
display: table-cell;
text-align: center;
vertical-align: middle;

// children
display: inline-block
或者
margin: auto;
```

### 不定高宽

#### 绝对定位 + transform
```
position: absolute;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
```

#### tabel-cell
```
// parent
display: table-cell;
text-align: center;
verticle-align: middle;

// children
display: inline-block;
```

#### flex布局

#### flex变异布局
```
// parent
display: flex;

// children
margin: auto;
```

#### grid + flex
```
// parent
display: grid;

// children
align-self: center;
justify-self: center;
```

#### grid + margin

#### writing-mode
writing-mode属性定义了文本在水平或者垂直方向上如何排布。

## vue组件通信的方法
- props和$emit父组件向子组件传递数据是通过props进行的，子组件传递数据给父组件是通过$emit触发事件进行的
- $parent $children获取当前组件的父组件和子组件
- $attrs  $listeners
- 父组件中通过provide来提供变量，然后在子组件中通过inject来注入变量（写组件库时很常用）
- $ref 获取组件实例
- eventBus 兄弟组件数据传递 ，这种情况下可以使用事件总线的方式
- vuex状态管理

## vue的响应式原理

**数据劫持 + 观察者模式**

对象内部通过defineReactive方法，使用Object.defineProperty方法将属性劫持（只会劫持已经存在的属性），数组则是通过重写数组的方法来实现。

当页面使用对应属性的时候，每个属性都用有自己的dep属性，存放他所依赖的watcher（依赖收集），当属性变化后会通知自己对应的watcher去更新（派发更新）。

[vue响应式原理详解](https://juejin.cn/post/6935344605424517128)

```
        class Observe {
            constructor(value) {
                this.walk(value);
            }

            walk(data) {
                // 对象上的所有属性依次进行观测
                let keys = Object.keys(data);

                for (let i = 0; i < keys.length; i++) {
                    let key = keys[i];
                    let value = data[key];
                    defineReactive(data, key, value);
                }
            }
        }

        // Object.defineProperty数据劫持核心，兼容性在IE9以上
        function defineReactive(data, key, value) {
            // 递归的关键
            observe(value);

            // 如果value还是一个对象，会继续走一遍defineReactive，层层遍历一直到value不是对象才停

            Object.defineProperty(data, key, {
                get() {
                    console.log('获取值。。。');

                    // 这里有处理依赖收集的过程。。。。。省略了。。。

                    return value;
                },

                set(newValue) {
                    if (newValue === value) return;
                    console.log('设置值');

                    // 需要做派发更新过程。。。。。省略了。。。

                    value = newValue;
                }
            })
        }

        export function observe(value) {
            // 如果传过来的是对象或者数组 进行属性劫持
            if (Object.prototype.toString.call(value) === '[object object]' || Array.isArray(value)) {
                return new Observe(value);
            }
        }
```

## Vue nextTick的原理
nextTick中的回调是在下次DOM更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新之后的DOM。主要思路就是采用微任务优先的方式调用异步方法去执行去执行nextTick包装的方法。

[nextTick原理详解](https://juejin.cn/post/6939704519668432910#heading-4)

先将回调存到一个数组中

定义异步方法（考虑兼容性的问题，做判断，一层层的降级：promise -> MutationObserver -> setImmediate() -> setTimerout()）

```
let callbacks = [];
let pending = false;
function flushCallbacks() {
    // 把标志还原为false;
    pending = false;

    // 依次执行回调
    for (let i = 0 ; i < callbacks.length; i++) {
        callbacks[i]();
    }
}

// 定义异步方法，采用优雅降级
let timerFunc;

if (typeof Promise !== 'undefined') {
    // 如果支持Promise
    const p = Promise.resolve();

    timerFunc= () => {
        // promise 放入微任务异步队列
        p.then(flushCallbacks);
    }
} else if (typeof MutationObserver !== 'undefined') {
    // MutationObserver 主要是 监听dom变化，也是一个异步方法。

    // 在不支持promise的情况下

    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));

    observer.observe(textNode, {
        characterData: true
    })

    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    }
} else if (typeof setImmediate !== 'undefined') {
    // 如果前面都不支持，判断setImmediate
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
} else {
    // 最后降级采用setTimeout
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    }
}

// 对外导出nextTick方法

export function nextTick(cb) {
    // 除了渲染watcher，还有用户自己手动调用的nextTick一起被收集数组中
    callbacks.push(cb);

    if (!pending) {
        // 如果多次调用nextTick，只会执行一次异步，等异步队列清空之后，再把标志变为false
        pending = true;
        timerFunc();
    }
}
```

## Vue diff原理

[diff算法讲解](https://juejin.cn/post/6953433215218483236)

同级比较

- tag标签不一致，直接新节点替换旧节点
- tag标签一致
    - 先进行属性替换
    - 对比子元素
        - 新老节点都有子元素，采取双指针方式进行比对，sameVNode判断tag和key完全相同为同一个节点，进行节点复用。
            - 头和头相等比较；尾和尾相等比较；头和尾相等互相比较
                - sameVnode的时候，传入两个新老子节点的patch(oldChild, newChild)
            - 乱序情况下，上面的都不符合：先遍历旧子节点数组形成key值映射到map对象，然后根据新子节点数组循环，按照key值和位置关系移动以及新增节点，最后删除多余的旧子节点，如果移动旧节点，同样需要patch(oldChild, newChild)
- 无tag标签，文本节点直接比较内容是否一致

## 路由原理history和hash两种路由方式的特点

### hash
- location.hash的值其实就是URL中#后面的东西，它的特点在于：hash虽然出现在URL中，但不会被包含在HTTP请求中，对后端没有影响，因此改变hash不会重新加载新页面。
- 可以为hash的改变添加监听事件。
```
window.addEventListener('hashchange', funcRef, false);
```
- 每一次改变hash（window.location.hash）都会在浏览器的访问历史中增加一个记录，根据以上特点，就可以实现前端路由“更新视图但不重新请求页面”的功能。
### history
- 利用了HTML5 History API中新增的pushState()和replaceState()方法
- 这两个方法应用于浏览器的历史记录栈。在当前已有的back、forward、go这三个方法的基础上，它们提供了对历史记录进行的功能。
    - 当调用它们修改浏览器历史记录栈之后，虽然 当前的URL改变了，但是浏览器不会刷新页面，这就为单页面应用“更新视图 但不重新请求页面”提供了基础
- 刷新页面会出现404，需要后端配合配配置，将404的页面定向到index.html

## 手写bind
见 -- 手写代码 -- 13.bind.html --> 简单版本 + 较为完善的版本

bind的实现要复杂一点，因为要考虑的情况比较多，还要涉及到参数的合并（类似函数柯里化）

- 判断调用对象是否为函数，即使我们是定义在函数的原型上的，但是可能出现使用call等方式调用的情况
- 保存当前函数的引用，获取其余擦混入参数值
- 创建一个函数返回
- 函数内部使用apply来绑定函数调用。需要判断函数作为构造函数的情况，这个时候需要传入当前的this给apply使用，其余情况都传入指定的上下文对象

## 手写实现一个寄生组合式继承

### 原型链的继承
- 原理：让子类的原型对象指向父类的实例，当子类的实例找不到对应的属性和方法时，会延续着原型对象（也就是它的父类）往上找
- 缺点：
    - 多个实例指向同一个原型，其中一个有修改，会影响到另一个
    - 没有实现super功能，对父类进行传参
```
function Parent(name) {
    this.name = name;
}

function Child() {

}

// 子类的原型对象指父类的实例
Child.prototype = new Parent();
Child.prototype.constructor = Child

```

### 构造函数继承
- 原理：在子类的构造函数中，去执行父类的构造函数，并且为其绑定子类的this
- 缺点：不能继承在父类原型上的方法和属性
```
function Parent(name) {
    this.name = name;
}

// 子类的构造函数 --- 调用父类的构造函数，并且为其绑定this
function Child(name) {
    Parent.call(this, name);
}
```

### 寄生组合式继承

#### 组合式继承
- 原理：构造函数式继承 + 原型链式继承
- 缺点：每生成一个子类的实例，就会执行一次new Parent 和 Parent.call
```
function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
}

Child.prototype = new Parent();
```

#### 寄生组合式继承
**解决了组合式继承中，构造函数可能被多次执行的问题**
```
function Parent(name) {
    this.name = name;
}

function Child(name) {
    Parent.call(this, name);
}

// 在组合式继承中，使用的new Parent，构造函数就可能被多次执行
Child.prototype = Parent.prototype;
// 浅拷贝解决   ---   子类的prototype指向了父类的prototype，子类原型的改动可能会影响到父类原型
Child.prototype = Object.assign(Parent.prototype);
```

## 手写new
- 生成一个新的对象实例
- 取到第一个参数，即构造函数
- 将新生成的实例对象的原型指向构造函数
- 改变this的指向
- 返回实例对象（若构造函数有返回值，则返回构造函数的返回值，若构造函数没有返回值，则返回新生成的实例对象）

## 手写setTimeout模拟实现setInterval
