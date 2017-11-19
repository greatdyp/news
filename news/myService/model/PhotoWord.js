/**
 * Created by hama on 2017/5/10.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const ArticleSchema = new Schema({
     _id:{
        type:String,
        default:shortid.generate,
        unique:true
    },
    //文章的标题
    title:{
        type:String,
        require:true
    },
    //文章的内容
    content:{
        type:String,
        require:true
    },
    //图片路径
    pic_url:{
        type:String
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //点击量
    click_num:{
        type:Number,
        default:0,
    },
    //回复量
    comment_num:{
        type:Number,
        default:0,
    },
      //点赞量
    like_num:{
        type:Number,
        default:0,
    },
      //踩
    dislike_num:{
        type:Number,
        default:0,
    },
    //作者,它应该一个user表中的数据
    author:{
        type:String,
        ref:'User' //文章的作者
    },
    //最后的回复
    last_reply:{
        type:String,
        ref:'Reply' //最后回复的帖子
    },
    //最后回复的时间
    last_reply_time:{
        type:Date,
        default:Date.now
    },
    //最后回复的那个人
    last_reply_author:{
        type:String,
        ref:'User'
    },
    //增加删除功能
    deleted:{
        type:Boolean,
        default:false
    }
})

const PhotoWord = mongoose.model('PhotoWord',ArticleSchema);
module.exports = PhotoWord

