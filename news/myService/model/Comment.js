/**
 * Created by Administrator on 2017/10/11.
 */
// 二级回复的数据集合   ---- 二级以及后面多级回复的集合
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const CommentSchema = new Schema({
    // 回复的id
    _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    // 回复的作者
    author:{
        type:String,
        ref:'User'
    },
    // 文章的id
    article_id:{
        type:String,
        ref:'Article'
    },
     // 文章标题
    reply_title:{
        type:String,
        ref:'Article'
    },
    // 一级回复的id
    reply_id:{
        type:String,
    },
    // 回复的时间
    create_time:{
        type:Date,
        default:Date.now
    },
    // 回复的内容:
    content:{
        type:String,
    },
    // 回复的数量:
    content_num:{
        type:Number,
        default:0
    },
    // 点赞量
    likes:{
        type:Number,
        default:0
    },
    // 是否删除
    deleted:{
        type:Boolean,
        default:false
    }
})
const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;

