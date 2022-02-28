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
    ```
    let test: [number, string] = [10, 'test'];
    ```

## 泛型
`<>`、`T` ---> 只要一看到`<>`，就知道这是泛型

## 函数类型
- 定义函数需要定义输入参数类型和输出类型
- 因为TS有类型推导，所以输出类型可以忽略
- 函数没有明确的返回值，就会默认返回void类型；void类型与any类型相反，它表示没有任何类型
- 函数的赋值
    ```
    // 先定义一个函数
    let add1 = (x: number, y: number): number => {
        return x + y;
    }

    // 给函数赋值
    let add2: (x: number, y: number) => number = add1
    // 有点像ES6的箭头函数 ，但是不是箭头函数

    // 直接赋值也是可以的，TS可以进行类型推导
    let add3 = add1

    ```
    **TS遇到`:`就知道后面的代码是写类型用的**

## interface类型
- 用于定义对象类型的
- 定义interface一般首字母大写
- interface不是JS中的关键字，所以TS编译成JS之后，这些interface是不会被转换过去的，都会被删除，interface只是在TS中用来做静态检查的
- interface用于描述函数类型
    ```
    // 描述普通的对象
    interface Person {
        name: string,
        age: 20
    }

    // 描述函数类型
    interface ISum {
        // 参数为数值类型，返回值为数值类型
        (x: number, y: number):number
    }

    const add: ISum = (num1, num2) => {
        return num1 + num2
    }
    ```
- 自定义属性（可索引的类型）
    ```
    interface RandomKey {
        [propName: string]: string
    }

    const obj: RandomKey = {
        a: 'hello',
        b: 'lin',
        c: 'welcome'
    }
    ```

**用interface可以创造一系列的自定义类型**

## 类
JS靠着原型和原型链来实现面向对象变成，es6新增了语法糖class来实现

TS通过`public`、`private`、`protected`三个修饰符来增强了JS中的类

### extends实现继承
子类没有定义自己的属性时，在继承时可以不使用`super`，但是如果子类有自己的属性，那就必须用到`super`关键字把父类的属性继承过来。


