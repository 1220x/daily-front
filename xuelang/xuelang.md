# 直播笔记

## 位运算
1、涉及到权限判断的，都可以考虑到位运算

0001
0010
0100
1000


## vue和react数据更新

### vue
初始化 -- 收集依赖关系

数据变化之后 -- proxy响应式会通知到组件 // 组件内部虚拟 dom ，计算diff 汇总更新

vue把响应式控制在了组件级别，组件内部使用虚拟dom

### react
数据更新之后 -- setState -- 计算虚拟dom （可能会卡） -- 出diff -- 更新

## compiler
hug-sun/the-der-tiny-compiler


