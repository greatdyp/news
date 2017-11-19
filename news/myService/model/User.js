/**
 * Created by hama on 2017/5/10.
 */
//保存登录用户的信息
const mongoose = require('mongoose');
const db = require('./db');
const Schema = mongoose.Schema;
//设置与用户所有相关的信息的数据结构
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
    },
    //个人简介
    motto:{
        type:String,
        default:'这家伙很懒,什么都没有留下..'
    },
    //个人头像
    avatar:{
        type:String,
        default:'/images/default-avatar.jpg'
    },
    //注册时间
    create_time:{
        type:Date,   
        default:Date.now
    },
    //更新个人资料时间
    update_time:{
        type:Date,
        default:Date.now
    },
    //用户的积分（发表文章增加积分）
    score:{
        type:Number,
        default:0
    },
    //发表文章数量
    article_count:{
        type:Number,
        default:0
    },
    //回复的数量
    reply_count:{
        type:Number,
        default:0
    },
    //关注的数量
    care_count:{
        type:Number,
        default:0
    },
     //被关注的数量
    becared_count:{
        type:Number,
        default:0
    }
})
const User = mongoose.model('User',UserSchema);
module.exports = User;

