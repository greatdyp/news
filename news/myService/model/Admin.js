const mongoose = require('mongoose');
const db = require('./db');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    //用户名
    username:{
        type:String,
        require:true
    },
    //密码
    password:{
        type:String,
        require:true
    }
})
const Admin = mongoose.model('Admin',UserSchema);
module.exports = Admin;

