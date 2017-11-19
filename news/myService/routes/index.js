const express = require('express');
const router = express.Router();

//引入user
const User = require('../model/User');
//引入article
const Article = require('../model/Article');
//引入图文集合
const PhotoWord = require('../model/PhotoWord');
//引入Reply
const Reply = require('../model/Reply');
//引入Message
const Message = require('../model/Message');
//引入Collection
const Collection = require('../model/Collection');
//引入Zhuan
const Zhuan = require('../model/Zhuan');
//引入Comment
const Comment = require('../model/Comment');
//上传图片
const multer = require('multer');
var picture = []
//设置文件磁盘存储
var storage = multer.diskStorage({
  //文件存储的路径
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  //文件的名称设置
  filename: function (req, file, cb) {
    var suffix = file.mimetype.split("/")[1];
    var fileName = file.fieldname + '-' + Date.now() + "." + suffix;
    picture.push(fileName)
    cb(null, fileName);
  }
})
//通过multer处理当前文件的存储
var upload = multer({ storage: storage });

//---------------------------------------------------------------------------
//注册
router.post('/zhuce', function (req, res) {
  var username = req.body[0]
  var password = req.body[1]
  User.findOne({ username: username }).exec(function (err, data) {
    if (err) {
      return
    }
    if (data) {
      return res.json({ err: 0, msg: '用户名已存在' })
    }
    var newUser = new User({ username: username, password: password });
    newUser.save()
  })
})

//登录
router.post('/login', function (req, res) {
  User.findOne({ username: req.body.username }).exec(function (err, data) {
    if (err) {
      return res.end(err)
    }

    if (!data) {
      return res.end('用户不存在，请注册...');
    }

    if (req.body.password != data.password) {
      return res.end('密码错误，请重新输入');
    }
    //设置cookie
    res.cookie("userName", data.username, { path: '/', maxAge: 1000 * 60 * 60 * 60 * 60 });
    return res.json({
      status: '0',
      msg: '',
      result: {
        userName: data.username
      }
    })
  })
})
//检查是否登录
router.get("/checkLogin", function (req, res, next) {
  if (req.cookies.userName) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userName || ''
    });
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    });
  }
});
//退出
router.get("/logout", function (req, res) {
  res.cookie("userName", "", {
    path: "/",
    maxAge: -1
  });
  res.json({
    status: "0",
    msg: '',
    result: ''
  })
})
//发布新闻
router.post('/add', upload.array('img'), function (req, res) {
  var newArticle = new Article({
    title: req.body.title,
    content: req.body.content,
    author: req.cookies.userName,
    pic_url: picture
  });
  newArticle.save();
  picture = []
  res.json({ err: 1, msg: 'success' })
  User.findOne({ username: req.cookies.userName }).exec(function (err, data) {
    data.score += 10
    data.save();
  })
})
//首页数据获取
router.post('/getnews', function (req, res) {
  Article.find().limit(5).exec(function (err, data) {
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//首页加载转发数据
router.post('/getzhuan', function (req, res) {
  Zhuan.find().populate('article_id').exec(function (err, data) {
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//加载更多
router.get('/more', function (req, res) {
  var page = parseInt(req.query.page)
  Article.find().skip(5 * page).limit(5).exec(function (err, data) {
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//文章详情页面
router.post('/news:id', function (req, res) {
  var id = req.params.id
  Article.findOne({ '_id': id }).exec(function (err, article) {
    if (!err) {
      article.click_num += 1;
      article.save();
      Reply.find({ 'article_id': id }).sort({ 'create_time': -1 }).exec(function (err, reply) {
        if (!err) {
          if (reply) {
            res.json({ err: 0, msg: article, resdata: reply })
          }
        }
      })
    }
  })
})
//用户信息
router.post('/getusers', function (req, res) {
  User.findOne({ 'username': req.cookies.userName }).exec(function (err, data) {
    console.log(data)
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//一级评论
router.post('/addreply', function (req, res) {
  var newReply = new Reply({
    content: req.body.content,
    author: req.cookies.userName,
    article_id: req.body.article_id,
    article_author: req.body.art_author
  });
  newReply.save().then(function (data) {
    Article.findOne({ '_id': data.article_id }).exec(function (err, article) {
      if (!err) {
        article.comment_num++;
        article.save();
      }
    })
    res.json({ err: 1, msg: data })
  })
  if (req.body.art_author != req.cookies.userName) {
    var newMessage = new Message({
      target_id: req.body.art_author,
      content: req.body.content,
      author: req.cookies.userName,
      article: req.body.title
    })
    newMessage.save()
  }


})
//二级评论页面跳转+显示
router.post('/tworeply:id', function (req, res) {
  var id = req.params.id
  Reply.findOne({ '_id': id }).exec(function (err, data) {
    if (!err) {
      Comment.find({ 'reply_id': id }).sort({ 'create_time': -1 }).exec(function (err, replies) {
        if (!err) {
          res.json({ err: 0, res: data, rep: replies })
        }
      })
    }
  })
})
//添加二级评论
router.post('/addtworeply', function (req, res) {
  var newComment = new Comment({
    author: req.cookies.userName,
    article_id: req.body.article_author_id,
    reply_id: req.body.reply_id,
    content: req.body.content,
    reply_title: req.body.reply_title
  });
  newComment.save().then(function (data) {
    var id = data.reply_id
    Reply.findOne({ '_id': id }).exec(function (err, data) {
      if (!err) {
        data.comment_num++;
        data.save();
      }
    })
    res.json({ err: 1, msg: data })
  })
})
//点赞
router.post('/likes', function (req, res) {
  var id = req.body.id
  Article.findOne({ '_id': id }).exec(function (err, data) {
    if (!err) {
      data.like_num++;
      data.save();
    }
  })
})
//踩
router.post('/dislikes', function (req, res) {
  var id = req.body.id
  Article.findOne({ '_id': id }).exec(function (err, data) {
    if (!err) {
      data.dislike_num++;
      data.save();
    }
  })
})
//获取通知消息
router.post('/getmessages', function (req, res) {
  if (req.cookies.userName) {
    Message.find({ 'target_id': req.cookies.userName }).exec(function (err, data) {
      if (!err) {
        res.json({ err: 0, msg: data })
      }
    })
  } else {
    res.json({ err: 1, msg: '请先登录' })
  }
})
//显示通知消息数量
router.post('/getreplymsg', function (req, res) {
  Message.find({ 'target_id': req.cookies.userName }).count().exec(function (err, data) {
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//删除文章
router.post('/remove', function (req, res) {
  Article.remove({ '_id': req.body.id }).exec(function (err) {
    if (!err) {
      res.json({ err: 0, msg: '删除成功' })
    }
  })
})
//搜索文章
router.post('/search', function (req, res) {
  var title = req.body.content
  Article.find({ title: { $regex: title, $options: 'i' } }).exec(function (err, data) {
    if (!err) {
      if (data) {
        res.json({ err: 0, msg: data })
      } else {
        res.json({ err: 1, msg: '无内容' })
      }
    }
  })
})
//获取用户发布的新闻
router.post('/getusernews', function (req, res) {
  Article.find({ 'author': req.cookies.userName }).exec(function (err, data) {
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//收藏
router.post('/care', function (req, res) {
  Collection.findOne({ article: req.body.data }).exec(function (err, data) {
    if (!err) {
      if (!data) {
        var newCollection = new Collection({
          article: req.body.data,
          author_id: req.cookies.userName
        })
        newCollection.save();
      } else {
        res.json({ err: 0, msg: 'ok' })
      }
    }
  })

})
//取消收藏
router.post('/delecoll', function (req, res) {
  Collection.remove({ 'article': req.body.id }).exec(function (err) {
    if (!err) {
      res.json({ err: 0, msg: '删除成功' })
    }
  })
})
router.post('/getcollection', function (req, res) {
  Collection.find({ 'author_id': req.cookies.userName }).populate('article').exec(function (err, data) {
    if (!err) {
      res.json({ err: 0, msg: data })
    }
  })
})
//是否收藏
router.post('/getusermsg', function (req, res) {
  console.log(req.body.data)
  Collection.findOne({ 'article': req.body.data }).exec(function (err, data) {
    console.log(data)
    res.json({ err: 0, msg: data })
  })
})
//更新用户信息
router.post('/newusermsg', upload.array('img'), function (req, res) {
  User.findOne({ 'username': req.cookies.userName }).exec(function (err, data) {
    data.motto = req.body.motto;
    data.save();
    res.json({ err: 0, msg: 'ok' })
  })

})
//兑换
router.post('/buy', function (req, res) {
  console.log(req.body.data)
  User.findOne({ username: req.cookies.userName }).exec(function (err, data) {
    if (!err) {
      console.log(data)
      data.score -= req.body.data;
      data.save();
      res.json({ err: 0, msg: 'ok' })
    }
  })
})
//转发
router.post('/zhuan', function (req, res) {
  Article.findOne({ '_id': req.body.id }).exec(function (err, data) {
    if (!err) {
      var newZhuan = new Zhuan({
        zhuan_id: req.body.id,
        zhuan_reply: req.body.content,
        title: data.title,
        content: data.content,
         zhuan_author: req.cookies.userName,
        pic_url: data.pic_url
      });
      newZhuan.save();
      picture = []
    }
  })

  res.json({ err: 0, msg: 'ok' })

})

module.exports = router;
