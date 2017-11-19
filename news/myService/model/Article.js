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
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //图片路径
    pic_url:{
        type:String
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
      //点赞
    like_num:{
        type:Number,
        default:1,
    },
      //踩
    dislike_num:{
        type:Number,
        default:1,
    },
    //作者,它应该一个user表中的数据
    author:{
        type:String,
        ref:'User' //文章的作者
    }
})

const Article = mongoose.model('Article',ArticleSchema);
module.exports = Article

