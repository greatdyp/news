/**
 * Created by Administrator on 2017/10/10.
 */
// 一级回复 ---- 留言集合

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const ReplySchema = new Schema({
        _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    // 回复的内容
    content:{
        type:String,
        require:true
    },
    // 回复时间：
    create_time:{
        type:Date,
        default:Date.now
    },
    // 回复的那个人
    author:{
        type:String,
        ref:'User'
    },
    // 回复的那篇文章
    article_id:{
        type:String,
        ref:'Article'
    },
     // 回复的那篇文章的作者
    article_author:{
        type:String
    },
    // 二级回复数量
    comment_num:{
        type:Number,
        default:0
    },
    // 当前回复的点赞量
    likes:{
        type:Number,
        default:0
    },
    // 回复是否被删除
    deleted:{
        type:Boolean,
        default:false
    }
})
const Reply = mongoose.model('Reply', ReplySchema);
module.exports = Reply;