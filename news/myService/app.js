var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//session
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash=require('connect-flash');


var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//模板引擎ejs
app.set('view engine', 'ejs');

//加载flash（）方法，在请求对象时，挂载一个req.flash方法
app.use(flash());
//设置session数据的相关信息
app.use(session({
    secret: 'yp',
    store: new MongoStore({
        url: 'mongodb://localhost/news'
    }),
//是否强制保存未初始化的session数据
    saveUninitialized: false,
    //是否强制保存未修改过得session数据
    resave: false,
    //设置sessionID cookoe的名称
    name:'yp',
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/', users);
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3800,function(){
  console.log('node is running')
})
module.exports = app;
