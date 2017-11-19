var express = require('express');
var router = express.Router();
const Admin=require('../model/Admin')
const Article=require('../model/Article')
//首页加载
router.get('/', function(req, res) {
  res.render('index',{
    title:'news'
  })
})
//登录跳转
router.get('/mdenglu',function(req,res){
  res.render('denglu',{
    title:'登录'
  })
})
//登录跳转
router.get('/',function(req,res){
  res.render('index',{
    title:'登录'
  })
})
//注册请求处理
router.post('/mzhuce',function(req,res){
  Admin.findOne({username:req.body.username}).exec(function(err,data){
    if(!err){
      if(!data){
      var newAdmin=new Admin(req.body)
      newAdmin.save()
      res.json({err:0,msg:'ok'})
      }else{
        return
      }
    }
  })
})
//登录请求处理
router.post('/mdenglu',function(req,res){
      Admin.findOne({username:req.body.username}).exec(function(err,data){
    if(!err){
      if(data){
      if(req.body.password== data.password){
      req.session.user=data
      console.log(req.session.user)
      res.json({err:2,msg:'ok'})
      }else{
        res.json({err:0,msg:'密码错误'})
      }
      }else{
        res.json({err:1,msg:'未注册'})
      }
    }
  })
})
//退出
router.get('/tuichu',function(req,res){
  req.session.user=null;
  return res.redirect('/')
})
//主页加载
router.get('/news', function(req, res) {
  Article.find().exec(function(err,data){
    console.log(req.session.user)
    res.render('news',{
    title:'news',
    data:data,
    user:req.session.user
  })
  })
})
//升序
router.get('/up', function(req, res) {
  Article.find().sort({'create_time':-1}).exec(function(err,data){
    console.log(req.session.user)
    res.render('news',{
    title:'news',
    data:data,
    user:req.session.user
  })
  })
})
//删除
router.get('/shanchu/:id',function(req,res){
console.log(req.params.id)
Article.remove({'_id':req.params.id}).exec(function(err){
  if(!err){
  res.redirect('/news')
  }
})
})
//搜索跳转
router.get('/search',function(req,res){
  res.render('search')
})
//搜索
router.post('/msearch',function(req,res){
  console.log(req.body.search)
  var content=req.body.search
  Article.find({title:{$regex:content}}).exec(function(err,data){
    if(!err){
      console.log(data)
      if(data){
        res.json({err:0,msg:data})
      }
    }
  })
})
module.exports = router;
