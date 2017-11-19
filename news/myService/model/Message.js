/**
 * Created by hama on 2017/5/10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const MessageSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate,
        unique: true
    },
    //评论的文章的id
    article_id:{
       type: String,
    },
    // 登录的那个人
    author: {
        type: String,
        ref: 'User' 
    },
    // 当前的文章
    article: {
        type: String,
        ref: 'Article'
    },
    //回复的内容
    content:{
       type: String,
    },
    // 被回复的那个人
    target_id: {
        type: String,
        ref: 'User'
    },
    // 创建时间
    create_time: {
        type: Date,
        default: Date.now
    },
    // 回复的那条id
    reply_id: {
        type: String,
        ref: 'Reply'
    },
    // 二级回复的id
    comment_id: {
        type: String,
        ref: 'Comment'
    },
    // 是否已读
    has_read: {
        type: Boolean,
        default: false
    }
})

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message
