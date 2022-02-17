[ts面试题总结](https://juejin.cn/post/6988763249982308382)

# TypeScript

- 基础类型
    - boolean
    - number
    - string
    - undefined
    - any
    - 数组
    - 元组
- 函数类型
    - 可选参数
    - 函数表达式
    - 函数赋值
- interface
    - 基本概念
    - 可选属性
    - 只读属性
    - interface描述函数类型
    - 自定义属性
    - duck typing的理解
- class
    - 基本写法
    - 继承
    - 多态
    - plubic
    - private
    - protected
    - static
- interface和class的关系
    - implements
    - 处理公共属性和方法
    - 约束构造函数和静态属性

## 基础类型
- 默认情况下，null和undefined是所有类型的子类型。就是说，可以吧null和undefined赋给number类型的变量。但如果指定了`strictNullChecks`标记，null和undefined只能赋值给void和他们各自，否则会报错

- 数组类型
    ```
        let list: number[] = [1, 3, 5]
    ```
- 如果数组想每一项放入不同类型的数据，用元组类型
- 元组类型允许表示一个已知元素数量和类型的数组，各个元素的类型不必相同