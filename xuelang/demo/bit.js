// 位运算

// 1、涉及到权限判断的，都可以考虑到位运算

// 0001 = 2^0 = 1
// 0010 = 2^1 = 2
// 0100 = 2^2 = 4
// 1000 = 2^3 = 8


// vue和react中，就会用位运算，判断一个组件是不是component，还是div标签
// 本质就是更快，比较受框架的喜欢。
let read = 1;
let write = read << 1;
let remove = write << 1;
let admin = remove << 1;

console.log(read, write, remove, admin);

// |= 或等于，用来授权

// & 判断权限

// &= ~ 删除权限

//实现一下~~~

let role = read | write; // 授权，此时role拥有了read和write的权限，没有remove的权限
console.log(!!(role & read)); // true，有权限，是true
console.log(!!(role & write));
console.log(!!(role & remove)); // false，没有权限，所以是false
console.log(!!(role & admin));
console.log('---');
role |= read | remove; // |= 用来授权，或等于
console.log(!!(role & read)); // true，有权限，是true
console.log(!!(role & write));
console.log(!!(role & remove)); // 再次授权，remove就有权限了
console.log(!!(role & admin));

