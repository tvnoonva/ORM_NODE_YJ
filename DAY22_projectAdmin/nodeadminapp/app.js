var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

require('dotenv').config();
var expressLayouts = require('express-ejs-layouts');
var sequelize = require('./models/index.js').sequelize;
var session = require('express-session');
const passport = require("passport");
const passportConfig = require('./passport/index.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//라우팅 파일 참조
var adminRouter = require('./routes/admin');
var articleRouter = require('./routes/article');
var channelRouter = require('./routes/channel');
var memberRouter = require('./routes/member');
var messageRouter = require('./routes/message');

var app = express();

app.use(flash());
sequelize.sync();

passportConfig(passport);

app.use(session({
    resave: false,
    saveUninitialized: true, 
    secret: "testsecret", 
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge:1000 * 60 * 5 //5분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('layout', 'layout'); //해당 노드앱의 모든 컨텐츠 뷰파일의 기본 레이아웃ejs 파일 설정
app.set("layout extractScripts", true); //콘텐츠 페이지 내 script 태그를 레이아웃에 통합할지 여부
app.set("layout extractStyles", true); //콘텐츠 페이지 내 style 태그를 레이아웃에 통합할지 여부
app.set("layout extractMetas", true); //콘텐츠 페이지 내 meta 태그를 레이아웃에 통합할지 여부
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//각 라우터 주소 지정
app.use('/admin', adminRouter);
app.use('/article', articleRouter);
app.use('/channel', channelRouter);
app.use('/member', memberRouter);
app.use('/message', messageRouter);

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
