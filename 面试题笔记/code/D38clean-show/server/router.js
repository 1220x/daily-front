var express = require('express');
var app = express();
var Tools = require('./tools');

// 1、实现静态资源托管 - 使用express框架

app.use('/static', express.static('public'));

// get请求
app.get('/home', function(req, res) {
    // 1、拿到page的值
    var params = req.query;

    // 解决跨域
    res.header('Access-Control-Allow-Origin', '*');

    // 2、拿到数据 - 实际中是从后端数据库中获取的数据
    var dataArr = Tools.arr;
    // 3、分页，根据分页的参数，返回对应页数的数据
    var resArr = Tools.getTableData(Number(params.page), 10, dataArr);

    resArr.status ? res.json({
        status: 200,
        data: resArr.data
    }) : res.json({
        status: 202,
        data: '没有数据了'
    })
})

app.listen(2000, () => (console.log('监听2000端口')))