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
### 新一代工程化工具Vite
webpack：要把所有路由的依赖打包之后，才能开始调试
vite：调试环境下，不需要全部打包，根据首页依赖模块，再去按需加载。

# Vue2升级到Vue3

## 不兼容的写法
- 项目启动上的不同：
    - Vue2：new Vue()
    - Vue3：createApp()，
- Vue3移除了filter、$on、$off、$set、$delete等API
- v-model用法更改
- slot slot-scope 的更改
- directive注册指令API更改

## 自动化根据的升级
- @vue/compat
- gogocode

# Vue3工程
## 项目的搭建
- 初始化项目：npm init @vitejs/app
- 路由管理、数据管理：npm install vue-router@next   npm innstall vuex@next **该命令安装的都是4.X版本的vue-router、vuex**，使用`@next`安装的是vue3版本的
- 创建vue实例：
    ```
    import { createApp } from 'vue';
    import App from './App.vue';

    createApp(App).mount('#app');
    ```
- 创建路由实例
    - 栗子中使用的`hash`模式的路由
    - `history`模式的路由：createWebHistory()
    ```
    import {
        createRouter,
        createWebHashHistory
    } from 'vue-router';

    const routes = [
        // 配置具体的路由
    ]

    const router = createRouter({
        history: createWebHashHistroy(),
        routes
    })

    export default router;
    ```
- 引入路由
    ```
    import router from './router.js';

    createApp(App).use(router).mount('#app');
    ```

## `composition API` + `<script setup>`代码组织方式
### 响应式数据
```
<script setup>
    import { ref } from 'vue';
    let count = ref(1);

    function add() {
        count.value++
    }
</script>
```

ref函数函数返回的`count`变量就是响应式数据，针对ref返回的响应式数据，需要修改 `.value`才能生效

### 组件的注册
在当前页面中`import`引入之后，`script setup`会自动将该组件注册到当前页面，不需要我们再手动注册。

### 计算属性
在Composition API的语法中，计算属性和生命周期等功能，都可以脱离Vue的组件机制单独使用。

```
import { computed } from 'vue';

let active = computed(() => {
    // ...
})

let allDone = computed({
    get: function() {
        // ...
    },
    set: function(value) {
        // ...
    }
})
```

### compisition API 拆分代码
使用composition API的逻辑来拆分代码，把一个功能相关的数据和方法都维护在一起。把功能独立的模块，封装成一个独立的函数，真正做到按需拆分。

把清单功能的所有变量和方法，都放在函数内部定义并且返回，这样就可以放在任意的地方来维护。

```
// Todolist.vue

// 可以放在一个 .vue 文件中 ，哪一个script文件在上无所谓
<script setup>

</script>

<script>
function useTodos() {
    // ... 具体代码逻辑

    return { title, todos, addTodo, clear, active, all, allDone };
}

</script>
```
拆分功能时，ref、computed等，都是从Vue中单独引入，而不是依赖于this上下文。

```
// Todolist.js

import { ref, computed } from 'Vue';

export function useTodo() {
    // ...
}

```
```
import { useTodo } from './Todolist.js';
let { title, active, ... } = useTodo();
```

### script setup 好用的功能
`<script setup>`是为了提高使用`composition API`的效率而存在的。

- 精简代码：
    - 举个栗子：累加器（有script setup 和 无script setup）

        ```
        // 有script setup
        <script setup>
        import { ref } from 'Vue';

        let count = ref(0);

        function addCount() {
            count.value++;
        }
        </script>
        ```

        ```
        // 无script setup

        <script >
        import { ref } from "vue";
        export default {
            setup() {
                let count = ref(1)
                function add() {
                    count.value++
                }

                return {
                    count,
                    add
                }
            }
        }
        </script>
        ```
- 可以使用顶层的await去请求后端的数据等等

### style样式的特性
- `scoped`属性：定义的css属性就只会应用到当前组件的元素上，避免样式上的冲突
- `:global`：在scoped中想写全局的样式的话，使用 :global 标记
- `v-bind`：直接在CSS中使用JavaScript中的变量
    ```
    import { ref } 'Vue';
    let color = ref('red');

    <style>
    h1 {
        color: v-bind(color);
    }
    </style>
    ```

## 深入理解Vue3的响应式机制

### 什么是响应式？
变量A由变量B计算之后得到，当修改变量B，变量A的值可以实时的改变，这就是响应式的雏形。

### 响应式的原理
vue中一共有三种响应式的解决方案：`defineProperty`，`Proxy`，`value setter`

#### defineProperty
vue2中，实现响应式的原理 - defineProperty()。

[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineproperty)

- 定义：Object.defineProperty()方法会直接在一个在对象上定义一个新属性，或者修改一个新对象的现有属性，并返回此对象。

- 语法：`Object.defineProperty(obj, prop, descriptor)`
- 参数：
    - obj: 要定义属性的对象
    - prop: 要定义或修改的属性的名称或`Symbol`
    - descriptor: 要定义或修改的属性描述符，是一个对象
- 返回值：被传递给函数的对象
- 通过一般的赋值操作添加的普通属性是可枚举的、可修改的、可删除的。默认情况下，使用该API添加的属性是不可修改(`immutable`)的。
- 描述符：（参数中的第三个参数）
    - 数据描述符：具有值的属性
        - `configurablle`: `true` - 属性的描述符可以改变，属性可以从对象上删除；`false` - 默认值
        - `enumerable`: `true` - 该属性出现在对象的枚举属性中；`false` - 默认值
        - `value`: 该属性对应的值，可以是任何有效的JavaScript值
        - `writable`：`true` - 属性的value可以被赋值运算符改变；`false` - 默认值
    - 存取描述符：getter和setter描述的属性
        - `configurablle`: `true` - 属性的描述符可以改变，属性可以从对象上删除；`false` - 默认值
        - `enumerable`: `true` - 该属性出现在对象的枚举属性中；`false` - 默认值
        - `get`: 属性的getter函数，访问改函数时会调用此函数
        - `set`: 属性的setter函数，当属性的值被改变时，会调用此函数，该方法接收一个参数
    - 两种描述符只能存在一种
- **栗子**：
    ```
        // 实现响应式：Object.definProperty
        let obj = {};
        let count = 2;
        let double = getDouble(count);

        function getDouble(count) {
            return count * 2;
        }

        Object.defineProperty(obj, 'count', {
            get() {
                return count;
            },
            set(value) {
                count = value;
                double = getDouble(value);
            }
        })

        console.log(double); // 4
        obj.count = 10;
        console.log(double); // 20
    ```
- Object.defineProperty的缺点
    - 不能响应一个属性的删除，只能通过 `$delete` 来实现响应。

#### Proxy
vue3实现响应式的原理 - Proxy

- Proxy是针对对象的监听，而不是针对某一个属性的监听，所以不仅可以代理哪些定义时不存在的属性，还可以代理更丰富的数据结构，比如Map、Set。

- **栗子**：
    ```
        let obj = {};
        let count = 2;
        let double = getDouble(count);

        function getDouble(count) {
            return count * 2;
        }

        let handler = {
            get: function(target, prop) {
                return target[prop];
            },
            set: function(target, prop, value) {
                target[prop] = value;
                if (prop === 'count') {
                    double = getDouble(value);
                }
            },
            deleteProperty(target, prop) {
                delete target[prop];
                if (prop === 'count') {
                    double = NaN;
                }
            }
        }
        let proxy = new Proxy(obj, handler);

        console.log(obj.count, double); // undefined 4
        proxy.count = 2;
        console.log(obj.count, double); // 2 4
        proxy.count = 10;
        delete proxy.count;
        console.log(obj.count, double); // undefined NaN
    ```
- Vue3中`reactive`函数可以把一个对象变成响应式数据，而reactive函数就是通过Proxy实现的
    ```
    import { reactive, computed, watchEffect } from 'vue';

    let obj = reactive({
        count: 1
    })

    let double = computed(() => {
        return count * 2;
    })

    obj.count = 10;

    watchEffect(() => {
        console.log('数据被修改了', obj.count, double);
    })
    ```


#### value setter
Vue3 响应式实现的原理：利用`对象的get和set函数`来进行监听

- 这中响应式的实现方式，只能拦截某一个属性的修改，这也就是Vue3中`ref`这个API的实现。

- **栗子**：
    ```
    let getDouble = n => n * 2;
    let _value = 1;
    let double = getDouble(_value);

    let count = {
        get value() {
            return _value;
        },
        set value(val) {
            _value = val;
            double = getDouble(val);
        }
    }

    console.log(count.value, double);
    count.value = 2;
    console.log(count.value, double);
    ```

#### 响应式实现原理的总结
![总结]("./img/响应式.png")

### 定制响应式数据
任意拆分出独立的函数。把一切项目中的状态和 数据都封装成响应式的接口，屏蔽了浏览器的API，对外暴露的就是普通的数据。

- **栗子**
    ```
    // 数据实时同步到localStorage，封装成一个独立的函数 useStorage
    import { watchEffect, ref } from 'vue';

    export function useStorage(name, value = []) {
        let data = ref(JSON.parse(localStorage.getItem(name) || '[]') || value);

        watchEffect(() => {
            localStorage.setItem(name, JSON.stringify(data.value));
        })

        return data;
    }

    // 使用时
    import { useStorage } from "../utils/useStorage";

    let todos = useStorage('todos', []);
    ```

-  **栗子**
    ```
    // 在loading状态下，修改浏览器的小图标favicon
    import { ref, watch } from 'vue';
    export function useFavicon(newIcon) {
        const favicon = ref(newIcon);

        const updateIcon = (icon) => {
            document.head.querySelectorAll(`link[ref="icon"]`).forEach(el => el.href = `${icon}`);
        }

        const reset = () => favicon.value = './favicon.ico';

        watch(favicon, (i) => {
            updateIcon(i);
        })

        return { favicon, reset };
    }

    ```

### VueUse工具包
- 提供了大量的工具包，包括全屏、网络请求、动画等。
- 插件安装
    ```
    npm install @vueuse/core
    ```

## Vue的组件化机制

### 组件属性的定义
- 使用`defineProps`来规范数传递的格式，参数是一个对象，对象中就是具体的属性定义
- **栗子**
    ```
    import { defineProps, computed } from 'vue';
    let props = defineProps({
        value: Number
    })

    // 组件内部使用属性时，都是  props.  的方式
    let rate = computed(() => '★★★★★☆☆☆☆☆'.slice(5 - props.value, 10 - props.value))
    ```

### 组件事件
- 使用`defineEmits`来传递事件。
    ```
    let emits = defineEmits('update-rate');

    function onRate(num) {
        emits('update-rate', num);
    }
    ```

### 组件的v-model
- 对于自定义组件来说，v-model是两个语法：`传入属性`和`接收组件传递数据`的简写
- Vue3中默认绑定的变量名变了，从`value`变成了`modelValue`;如果要改变变量的值，要执行一个事件`this.$emit('update:modelValue', value)`
- 对于没有使用默认绑定变量modelValue变量的情况：父组件使用`v-model:xxx="prop`来传递prop，子组件使用`$emit('update:xxx', argu)`返回给父组件值。`xxx`为组件传值的属性名，`argu`为子组件返回给父组件的值。`xxx`要 一致，能够对应上。
    - 子组件：使用v-model默认绑定变量的场景
    ```
    let props = defineProps({
        // 声明了v-model默认绑定的变量 - modelValue
        modelValue: Number
    })

    // 定义事件： 'update:modelValue'
    let emits = defineEmits(['update:modelValue']);

    function onRate(num) {
        // 执行事件： 'update:modelValue'
        emits('update:modelValue',num);
    }
    ```
    - 父组件：使用v-model默认绑定变量的场景
    ```
    // 使用时，对于默认绑定的变量，可以直接使用v-model
    <Rate v-model="score">
    ```
    - 子组件：使用其他变量的场景
    ```
    let props = defineProps({
        // 声明了v-model绑定的变量 - value
        value: Number
    })

    // 定义事件： 'update:value'
    let emits = defineEmits(['update:value']);

    function onRate(num) {
        // 执行事件： 'update:value'
        emits('update:value',num);
    }
    ```
    - 父组件：使用其他变量的场景
    ```
    <Rate v-model:value="score">
    ```
- [Element3评级组件的实现](https://github.com/hug-sun/element3/blob/master/packages/element3/packages/rate/Rate.vue)

### 插槽
- slot插槽，显示组件的子元素

## Vue中的动画
- Vue3中使用内置的`transition`组件来实现动画效果
- `transition`需设置name属性。mode属性
- 实现动画的原理
    - enter: v-enter-active
    ```
    opacity: 0 - v-enter-from
    opacity: 1 - v-enter-to 
    ```
    - leave: v-leave-active
    ```
    opacity: 1 - v-leave-from
    opacity: 0 - v-leave-to
    ```

- `transition-group`：
    - 在v-for渲染列表的场景下，我们使用`transition-group`组件去包裹元素，通过tag属性指定渲染一个元素。
    - 不仅可以进入和离开动画，还可以改变定位。这个功能新增了`v-move`类
- 更精准的控制动画
    - `before-enter`：
    - `enter`：
    - `after-enter`：