// ---- 布尔型 ----

let isDone: boolean = false;
console.log(isDone);

// 报错
// let isA: boolean = new Boolean(1);

let isTest: Boolean = new Boolean(1);
console.log(isTest);

let createByBoolean: boolean = Boolean(1);
console.log(createByBoolean);

// 修改类型会报错
// createByBoolean = '123';

// ---- 数值型 ----
let num: number = 120;
console.log(num);

// ---- 字符串 ----
let str: string = 'test-str';
console.log(str);

let myName: string = '张三';
let myAge: number = 20;

let createByNewString: String = new String('测试new String');
console.log('测试String', createByNewString);

let createByString: string = String('测试 String');
console.log(createByString);

// 模板字符串
let sentence: string = `hello, my name is ${myName}, I'm ${myAge} years old`;
console.log(sentence);


// ---- 空值 ----
function alertName(): void {
    alert('hello wolrd');
}

let unusable2: void = undefined;
console.log(unusable2);

// ---- Null Undefined ----
let n: null = null;
let u: undefined = undefined;
console.log(n, u);

// ---- any ----
let createByAny: any = 'str123';
console.log(createByAny);

// 改变值的类型
createByAny = 120;
console.log(createByAny);

// 访问任何属性和方法
let anyThing: any = 'hello';
console.log('任意值类型，访问任何属性')
console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);

console.log('任意值类型，访问任何方法');
// anyThing.setName('zhangsan');
// anyThing.setName('zhangsan').sayHello();
// anyThing.myName.setName('lisi');

// ---- 没有声明类型的变量 ----
let noneType;
console.log(noneType);
noneType = '声明时没有指定类型';
console.log(noneType);
noneType = 12000;
console.log(noneType)

// ---- 类型推论 ----
// 报错。虽然没有声明 a 是 str ,但是可以推断出是str，此时再将number类型的值赋值给她，会报错
// let a = 'str'
// a = 120;


// ---- 联合类型 ----
let myNumber: string | number;
myNumber = 'strNumber';
console.log(myNumber);
myNumber = 1290000;
console.log(myNumber);

// 访问属性或方法
function getLength(something: string): number {
    return something.length;
}


// ---- 接口 ----
interface Person {
    name: string,
    age: number
}

let Tom: Person = {
    name: 'Tom',
    age: 18
}
console.log(Tom)

// 可选属性
interface Student {
    name: string,
    age?: number
}

let stud1: Student = {
    name: '张三',
    age: 20
}

let stud2: Student = {
    name: '李四'
}

console.log(stud1, stud2)

// 任意属性
interface Family {
    name: string,
    age?: number,
    [propName: string | number]: any
}

let family1: Family = {
    name: '123',
    age: 20,
    city: '武汉',
    years: 2021
}
console.log(family1)

// 只读属性
interface Test {
    readonly id: number,
    name: string
}

let test1: Test = {
    id: 1,
    name: '依依'
}

console.log(test1);
test1.name = '尔尔';
console.log(test1);

// 栗子
interface Config {
    type: string,
    url: string,
    data?: string,
    dataType: string
}

function ajax(config: Config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('success');
        }
    }
}

ajax({
    type: 'get',
    url: 'http://127.0.0.1:2000/home?page=1',
    dataType: 'josn'
})

// ---- 数组 ----
let tsArr: number[] = [1, 2, 4, 3]
console.log(tsArr)

let tsArray: Array<number> = [1, 3, 2]
console.log(tsArray)

interface NumberArray {
    [index: number]: number
}
let interfaceArray: NumberArray = [1, 2, 4];
console.log(interfaceArray);