var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//flash 패키지(휘발성 데이터를 뷰에 전달) 참조
var flash = require('connect-flash');

//환경설정파일 호출하기: 전역정보로 설정
//호출 위치 app.js 최상단
require('dotenv').config();

var sequelize = require('./models/index').sequelize;

//express-ejs-layouts 패키지 참조하기
var expressLayouts = require('express-ejs-layouts');

var session = require('express-session');
const passport = require('passport');
const passportConfig = require('./passport/index');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var articleRouter = require('./routes/article');
var articleAPIRouter = require('./routes/articleAPI');
var adminRouter = require('./routes/admin');

var app = express();

//flash 사용 활성화: cookie-parser와 express-session보다 위에 위치
app.use(flash());

//mysql과 자동연결처리 및 모델기반 물리 테이블 생성처리제공
sequelize.sync(); 

//패스포트 설정처리
passportConfig(passport);

//express기반 서버세션 관리 팩키지 참조하기 
app.use(
  session({
    resave: false,
    saveUninitialized: true, 
    secret: process.env.COOKIE_SECRET, 
    cookie: {
      httpOnly: true, //javascript로 cookie에 접근하지 못하게 하는 옵션
      secure: false, //https 환경에서만 session 정보를 주고받도록 처리
      maxAge:1000 * 60 * 5 //5분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);

//패스포트-세션 초기화:express session 뒤에 설정
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


app.use('/article', articleRouter);
app.use('/api/article', articleAPIRouter);
app.use('/admin', adminRouter);



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
