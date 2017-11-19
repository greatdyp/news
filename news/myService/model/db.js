/**
 * Created by hama on 2017/5/9.
 */
const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/news');
var db = mongoose.connection;
//验证数据库连接是否成功
db.on('error', function(){
    console.log('数据库连接失败');
});
db.once('open', function(){
    console.log('数据库连接成功');
});

module.exports = db