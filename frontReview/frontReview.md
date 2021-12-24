# 重学前端笔记
**JavaScript - 用规定的文法，去表达一定的语义，最终操作运行时**
```
1、文法
    词法
    语法
2、语义
3、运行时：程序 = 数据结构 + 算法 -> 对运行时来说，类型就是数据结构，执行过程就是算法
    类型
    执行过程
```

**知识架构图**
- ![JavaScript架构图](./img/javaScript架构图.png)
    - 数据结构：
        - 类型：number string boolean symbol undefined null object
        - 实例：List和Record、Set、Completion Record、Reference、Property Descriptor、Lexical Environment和Environment Record、Data Block
- ![HTML和CSS架构图](./img/HTML和CSS架构图.png)
- ![浏览器的实现原理和API](./img/浏览器API.png) 
- ![前端工程实践](./img/前端工程实践.png)

## JavaScript模块

### JavaScript类型

#### Undefined
- 表示`未定义`
- 任何变量在赋值之前都是Undefined类型，值为`undefined`
- 因为JavaScript的代码undefined是一个变量而非一个关键字，所以，我们为了避免无意中被篡改，建议使用`viod 0`来获取`undefined`值（undefined被赋值，还是undefined，没有被改变 --- **ES5之前，undefined可以被赋值，现代浏览器已经吧undefined设置为一个non-configurable、non-writable属性的值了**）
- 为什么有的变成规范要求使用`void 0`代替`undefined`？
    - undefined不是一个关键字，避免无意篡改，使用`void 0`

#### Null
- 表示`定义了但是为空`
- Null类型也只有一个值，`null`
- null 是一个关键字

#### Boolean
- true
- false

#### String
- 字符串有最大长度吗？
- String有最大长度`2^53-1`，`但这个最大长度，并不是字符数，而是字符串的UTF16编码`
- 对字符串的操作：charAt、charCodeAt、length等方法针对的都是UTF16编码
- 字符串是永远无法变更的，一旦构造出来，无法使用任何方式改变字符串的内容 -- 字符串字面量的值不可变，可重新赋值

#### Number
- 0.1 + 0.2 不是等于 0.3 吗？为什么JavaScript里面不是这样的？

#### Symbol
- ES6新加入的Symbol是个生命东西？

#### Object
- 为什么给对象添加的方法能用在基本类型上？

### JavaScript对象

## HTML和CSS

## 浏览器实现原理API

## 前端综合应用