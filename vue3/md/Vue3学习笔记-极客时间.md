# 前端框架

## MVVM框架简介
前端MVVM框架实现的目标：**数据驱动页面**。但每个MVVM框架对于数据驱动页面的实现，基本都是不一样的。 - 即数据更新之后，我们怎么通知页面进行更新。

- Angular：**脏检查** 
    - 每次用户交互时，就去检查一次数据是否变化，有变化就去更新DOM
- Vue1：**响应式** 
    - 初始化的时候，`Watcher` 监听了数据的每个属性，这样数据发生变化时，就能精确知道数据的哪个`key`改变了，去针对性的修改DOM。
        - 
- Vue2、Vue3：**响应式 + 虚拟DOM** 
    - 组件间使用响应式：组件间的变化，响应式系统来通知更新；组件内使用虚拟DOM去更新页面。
    - 引入虚拟DOM，给vue带来了跨端的能力。就是我们可以使用JSON描述vue的项目，可以基于JSON在小程序渲染、在App渲染，这是vue1没有的能力。
    - `Vue3把虚拟DOM的静态标记做到了极致，让静态的部分越过了虚拟DOM的计算，真正做到了按需更新，提高性能`。
- React：**虚拟DOM** 
    - 用一个JavaScript对象来描述整个DOM树，通过对虚拟DOM的计算，知道变化的数据，进行精确的修改。
    - 数据有变化时，生成一份新的虚拟DOM，与之前的虚拟DOM进行计算，算出需要修改的DOM，再去页面进行操作。
    - 虚拟DOM的diff逻辑，可以尽可能的减少对DOM的操作。
        - 引入了fiber架构。时间切片，来解决卡顿的问题
    ```
    // 虚拟DOM...
    {
        tag: "div",
        attrs: {
            id: "app"
        },
        children: [
            {
            tag: "p",
                attrs: { className: "item" },
                children: ["Item1"]
            },
            {
            tag: "div",
                attrs: { className: "item" },
                children: ["Item2"]
            }
        ]
    }
    ```
## Vue和React的对比：
- 通知页面更新：
    - `Vue`：当数据发生变化后：框架会主动告知哪些数据发生了变化。
    - `React`：当数据发生变化后：只能通过新老数据的计算diff来得知数据的变化。
- 性能问题：
    - `Vue`：项目大了之后，每一个数据都有一个Watcher，`Watcher`多了会严重影响性能
    - `React`：项目大了之后，虚拟DOM树过于庞大，diff计算可能会造成卡顿。
- 解决性能问题的方案：
    - `Vue`：Vue2中引入虚拟DOM来解决性能的问题。响应式数据主动推送数据变化，虚拟DOM是被动计算数据的Diff。组件级别划分两种技术。
    - `React`：引入了操作系统的时间切片概念，引入了`fiber`架构。把整个虚拟DOM微观化，变成链表，然后再利用浏览器的空闲时间计算Diff。巧妙利用空闲时间计算，解决了卡顿的问题。树形结构的Diff很难中断（属性结构的diff用的是递归，递归本身就是难以中断的），链表结构的Diff可以随时中断和继续。


## vue3需不需要react的fiber？？？
不需要。时间切片解决的问题，在vue3里面基本碰不到。
- Vue2、3的虚拟DOM控制在组件级别，只在组件内部使用虚拟DOM，组件之间使用响应式，这就让vue的虚拟DOM不会过于庞大
- Vue3虚拟DOM的静态标记和自动缓存功能 ，让静态的节点和属性可以直接绕过Diff逻辑，也就大大减少了DOM的Diff事件
- 时间切片也会带来额外的系统复杂性。

# 初探Vue3新特性

## vue2 的核心模块
- 响应式驱动
- 内置虚拟DOM
- 组件化
- 用在浏览器开发
- 运行时，把以上模块很好的管理起来

## 历史遗留问题
- Vue2使用Flow.js来做类型校验，但目前Flow.js已经停止维护
- Vue2内部运行时，是直接执行浏览器API。但这样就会在Vue2的跨端方案中带来问题
- Vue2响应式并不是真正意义上的代理，而是基于Object.defineProperty（）实现的。这个API并不是代理，而是对某个属性进行拦截，比如 删除数据 就无法监听
- Option API在代码较多时不好维护
- 生命周期
    - vue3中，只有createApp,然后立刻调用mount()才可以进入生命周期。
    - vue2中，new Vue，但是没有给el，或者没有$mount挂载组件，这是组件的beforeCreate和created依旧会执行。

## Vue3新特性
**响应式系统**、**Composition API组合语法**、**新的组件**、**Vite**、**自定义渲染器 - 开发跨端应用**、**RFC机制 - 对Vue源码做贡献**

Vue2中可以在main.js中定义一些Vue.$xxx的全局变量，然后再JS里面使用，Vue3中取消了这种写法。

### RFC机制
与代码无关，是Vue团队的工作方式。
[RFC链接戳这里！](https://github.com/vuejs/rfcs)
### 响应式系统
Vue2：Object.defineProperty() - 拦截某个属性。对于不存在的属性是没有办法进行拦截的，所以Vue2中所有数据都要在data里面声明。

Vue3：Proxy - 真正的代理。拦截的是整个obj，具体obj有什么属性，Proxy并不关心。

### 自定义渲染器
Vue2：内部所有模块都是揉在一起的

Vue3：拆包。响应式、编译、运行时全部独立了。
- Vue2的响应式只服务于Vue，Vue3的响应式就和Vue解耦了，甚至可以再react、node中使用响应式。
- 渲染逻辑的拆分：`平台无关的渲染逻辑`、`浏览器渲染的API`

### 全部模块使用TypeScript重构
类型系统，对代码进行限制，代码更健壮。

### Composition API
所有的API都是import引入的，没有用到的，打包时会被清理掉

代码复用方便，可以把一个功能的所有的methods，data都封装在一个独立函数里面

return语句，在实际项目中使用`<script setup>`特性可以清除

```
        // 按需引入 reactive computed
        const { reactive, computed } = Vue;

        const App = {
            setup() {
                const state = reactive({
                    count: 1
                })

                function add() {
                    state.count++;
                }

                const double = computed(() => state.count*2);

                return { state, add, double };
            }
        }

        Vue.createApp(App).mount('#app');
```
### 新的组件
Fragment：Vue3组件不再要求有一个唯一的根节点，清除了很多无用的占位div。

teleport：允许组件渲染在别的元素内，主要开发弹窗组件的时候特别有用。

Suspense：异步组件，更方便开发有异步请求的组件。
### 新一代工程化根据Vite


