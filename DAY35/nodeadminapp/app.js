var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
require('dotenv').config();
var session = require('express-session');

//redis
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: 0,
});


//패스포트
const passport = require('passport');
const passportConfig = require('./passport/index.js');
var sequelize = require('./models/index').sequelize;
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var articleRouter = require('./routes/article');
var articleAPIRouter = require('./routes/articleAPI');

var app = express();

app.use(flash());
sequelize.sync(); 
passportConfig(passport);

app.use(
  session({
  store: new RedisStore({ client: redisClient }),
    saveUninitialized: true,
    secret: "secretkey",
    resave: false,
    cookie: {
      httpOnly: true,
      secure: false,
      //maxAge: 3600000, //세션유지 시간설정 : 1시간
  },
    ttl : 250, //Redis DB에서 세션정보가 사라지게 할지에 대한 만료시간설정
    token: "secretkey",
  })
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//레이아웃 설정
app.set('layout', 'layout.ejs'); // 해당 노드앱의 모든 (콘텐츠)뷰파일의 기본 레이아웃ejs파일 설정하기 
app.set("layout extractScripts", true);  //콘텐츠페이지내 script태그를 레이아웃에 통합할지여부
app.set("layout extractStyles", true);//콘텐츠페이지내 style태그를 레이아웃에 통합할지여부
app.set("layout extractMetas", true); //콘텐츠페이지내 meta 태그를 레이아웃에 통합할지여부
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/api/article', articleAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;