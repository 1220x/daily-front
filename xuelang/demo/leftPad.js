// 业务代码

// 给一个字符串，前面补0

function leftpad(str, length, ch) {
    let len = length - str.length;
    return Array(len).join(ch) + str;
}

// console.log(leftpad('hello', 20, '0'));

// 10个字符串 = 2 + 8
// 1           不要
// 11          留下
// 1111        不要
// 11111111    留下

// 1010  -  二进制的10   8 + 2

// 位运算+二分版本
function leftpad1(str, length, ch) {
    let len = length - str.length;
    let total = '';

    while(true) {
        if (len & 1) {
            total += ch;
        }

        if (len == 1) {
            return total + str;
        }

        ch += ch;
        len = len >> 1; // 往右移一位，判断尾部是不是1
    }
}

console.log(leftpad1('hello', 20, '0'));


/**
 * 过程解析：
 * ch: '0'
 * len: 10
 * total: ''
 * 
 * 10/2 = 5  余0
 * len: 5
 * ch: '00'
 * total: ''
 * 
 * 5 / 2 = 2 余1
 * total: '00'
 * ch: '0000'
 * 
 * 
 * 2 / 2 = 1 余 0
 * total: '00'
 * ch: '00000000';
 * 
 * 1 / 2 = 1 余 0
 * len = 1
 * **/

function leftpad1(str, length, ch) {
    let len = length - str.length;
    let total = '';

    while(true) {
        // 除 2，判断在哪个位置上是0
        if (len % 2 == 1) {
            total += ch;
        }

        if (len == 1) {
            return total + str;
        }

        ch += ch;
        len = parseInt(len / 2);
    }
}


console.time('业务型实现：')
for (let i = 0; i < 1000; i++) {
    leftpad('hello', 1000, '0');
}
console.timeEnd('业务型实现：');

console.time('二进制型实现：')
for (let i = 0; i < 1000; i++) {
    leftpad1('hello', 1000, '0');
}
console.timeEnd('二进制型实现：');

console.time('原生实现：')
for (let i = 0; i < 1000; i++) {
    'hello'.padStart(1000, '0');
}
console.timeEnd('原生实现：');
