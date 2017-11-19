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
    //关注的用户
    author_id:{
    type:String
    },
    //创建时间
    create_time:{
        type:Date,
        default:Date.now
    },
    //关注的文章
    article:{
        type:String,
        ref:'Article' 
    }
})

const Collection = mongoose.model('Collection',ArticleSchema);
module.exports = Collection

