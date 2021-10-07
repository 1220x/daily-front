# 原始数据类型

- JavaScript的类型分为两种：`原始数据类型`和`对象类型`
    - `原始数据类型`：`布尔值`、`数值`、`字符串`、`null`、`undefined`以及ES6中的`Symbol`、`BigInt`
    - `对象类型`：

# TS中对应的数据类型介绍

## 布尔值
- 定义：`boolean`定义布尔值类型
```
let isDone: boolean = true;
```

- 使用构造函数`Boolean`创建的对象，**不是**布尔值。
```
// 会报错
let isTest: boolean = new Boolean(1);
```

- 事实上`new Boolean()`返回的是一个`Boolean`对象
```
let isTest: Boolean = new Boolean(1);
```

- 直接调用`Boolean`也可以返回一个`boolean`类型
```
let createByBoolean: boolean = Boolean(1);
```

- 在TypeScript中，`boolean`是JavaScript中的基本类型，而`Boolean`是JavaScript中的构造函数。其他基本类型（除了`null`和`undefined`）一样。

## 数值
- 定义：`number`定义数值类型
```
let num: number = 120;
```

## 字符串
- 定义： `string`定义字符串类型
```
let str: string = 'test-str';

let createByNewString: String = new String('测试new String');
console.log('测试String', createByNewString);

let createByString: string = String('测试 String');
console.log(createByString);
```

- 模板字符串
```
let myName: string = '张三';
let myAge: number = 20;

// 模板字符串
let sentence: string = `hello, my name is ${myName}, I'm ${myAge} years old`;
console.log(sentence);
```

## 空值
- JavaScript没有空值(`viod`)概念，在TypeScript中，可以用`viod`来表示没有任何返回值的函数
```
function alertName(): void {
    alert('hello wolr')
}
```

- 声明一个void变量 没什么用，因为只能将它赋值为`undefined`
```
let unusable2: void = undefined;
```

## Null Undefined
- 定义：`null`和`undefined`来定义
```
let n: null = null;
let u: undefined = undefined;
```