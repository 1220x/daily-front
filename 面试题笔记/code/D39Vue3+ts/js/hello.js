"use strict";
// ---- 布尔型 ----
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isDone = false;
console.log(isDone);
// 报错
// let isA: boolean = new Boolean(1);
var isTest = new Boolean(1);
console.log(isTest);
var createByBoolean = Boolean(1);
console.log(createByBoolean);
// 修改类型会报错
// createByBoolean = '123';
// ---- 数值型 ----
var num = 120;
console.log(num);
// ---- 字符串 ----
var str = 'test-str';
console.log(str);
var myName = '张三';
var myAge = 20;
var createByNewString = new String('测试new String');
console.log('测试String', createByNewString);
var createByString = String('测试 String');
console.log(createByString);
// 模板字符串
var sentence = "hello, my name is " + myName + ", I'm " + myAge + " years old";
console.log(sentence);
// ---- 空值 ----
function alertName() {
    alert('hello wolrd');
}
var unusable2 = undefined;
console.log(unusable2);
// ---- Null Undefined ----
var n = null;
var u = undefined;
console.log(n, u);
// ---- any ----
var createByAny = 'str123';
console.log(createByAny);
// 改变值的类型
createByAny = 120;
console.log(createByAny);
// 访问任何属性和方法
var anyThing = 'hello';
console.log('任意值类型，访问任何属性');
console.log(anyThing.myName);
// console.log(anyThing.myName.firstName);
console.log('任意值类型，访问任何方法');
// anyThing.setName('zhangsan');
// anyThing.setName('zhangsan').sayHello();
// anyThing.myName.setName('lisi');
// ---- 没有声明类型的变量 ----
var noneType;
console.log(noneType);
noneType = '声明时没有指定类型';
console.log(noneType);
noneType = 12000;
console.log(noneType);
// ---- 类型推论 ----
// 报错。虽然没有声明 a 是 str ,但是可以推断出是str，此时再将number类型的值赋值给她，会报错
// let a = 'str'
// a = 120;
// ---- 联合类型 ----
var myNumber;
myNumber = 'strNumber';
console.log(myNumber);
myNumber = 1290000;
console.log(myNumber);
// 访问属性或方法
function getLength(something) {
    return something.length;
}
var Tom = {
    name: 'Tom',
    age: 18
};
console.log(Tom);
var stud1 = {
    name: '张三',
    age: 20
};
var stud2 = {
    name: '李四'
};
console.log(stud1, stud2);
var family1 = {
    name: '123',
    age: 20,
    city: '武汉',
    years: 2021
};
console.log(family1);
var test1 = {
    id: 1,
    name: '依依'
};
console.log(test1);
test1.name = '尔尔';
console.log(test1);
function ajax(config) {
    var xhr = new XMLHttpRequest();
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log('success');
        }
    };
}
// ajax({
//     type: 'get',
//     url: 'http://127.0.0.1:2000/home?page=1',
//     dataType: 'josn'
// })
// ---- 数组 ----
var tsArr = [1, 2, 4, 3];
console.log(tsArr);
var tsArray = [1, 3, 2];
console.log(tsArray);
var interfaceArray = [1, 2, 4];
console.log(interfaceArray);
// ---- 函数 ----
// 函数默认值
function buildName(firstName, lastName) {
    if (firstName === void 0) { firstName = 'tom'; }
    return firstName + ' ' + lastName;
}
var tomCat = buildName(undefined, 'cat');
console.log(tomCat);
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    }
    else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
    return '';
}
function playBaketball(name, age) {
    if (name === 'YaoMing' && age && age > 25) {
        console.log('good Center');
    }
    else if (name === 'Kobe') {
        console.log('good Guard');
    }
    else if (name === 'James') {
        console.log('good Forward');
    }
    else {
        console.log('ordinary basketball player');
    }
}
;
playBaketball('YaoMing', 28);
playBaketball('James', 28);
// ---- 枚举 ----
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
;
console.log(Days[0] === 'Sun');
console.log(Days['Sun'] === 0);
// ---- 类 ----
// class Animal {
//     public name;
//     public constructor(name: any) {
//         this.name = name;
//     }
// }
// let a = new Animal('Tom');
// console.log(a.name);    // Tom
// a.name = 'Jack';
// console.log(a.name);    // Jack
// 外部访问private属性
// class Animal {
//     private name;
//     public constructor(name: any) {
//         this.name = name;
//     }
// }
// let a = new Animal('Tom');
// console.log(a.name);
// a.name = 'Jack';
// console.log(a.name);
// 子类中访问private属性
// class Animal {
//     protected name;
//     public constructor(name: any) {
//         this.name = name;
//     }
// }
// class Cat extends Animal {
//     constructor(name: any) {
//         super(name);
//         console.log(this.name);
//     }
// }
// let cat = new Cat('cat...');
// 参数属性
// class Animal {
//     public constructor(public name: any) {
//     }
// }
// readonly
// class Animal {
//     readonly name;
//     public constructor(name: any) {
//         this.name = name;
//         console.log(this.name);
//     }
// }
// let dog = new Animal('dog');
// console.log(dog.name);
// dog.name = 'dog111';
// console.log(dog.name);
// ---- 抽象类 ----
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    ;
    return Animal;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.eat = function () {
        console.log(this.name + " is eating");
    };
    ;
    // 实现抽象父类的方法
    Cat.prototype.sayHi = function () {
        console.log(this.name + " is sayHi to ypu");
    };
    return Cat;
}(Animal));
var cat = new Cat('cat333');
cat.sayHi();
