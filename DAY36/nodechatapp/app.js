var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var sequilize = require('./models/index.js').sequelize;

var expressLayouts = require('express-ejs-layouts');

//CORS 접근 이슈 해결을 위한 cors 패키지 참조
const cors = require('cors');

//웹페이지 요청과 응답처리 전용 라우터파일 참조
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var channelRouter = require('./routes/channel');


//RESTFul 데이터 요청과 응답처리 전용 라우터파일 참조 
var memberAPIRouter = require('./routes/memberAPI.js');
var channelAPIRouter = require('./routes/channelAPI.js');


var app = express();
sequilize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//레이아웃 설정
app.set('layout', 'authLayout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("layout extractMetas", true);
app.use(expressLayouts);

// app.use(cors());

//특정 도메인 주소만 cors 허가
app.use(cors({
  methods: ["GET", "POST", "DELETE", "OPTIONS"],
  origin: ["http://localhost:3005", "http://naver.com"],
})
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', channelRouter);

app.use('/api/member', memberAPIRouter);
app.use('/api/channel', channelAPIRouter);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
