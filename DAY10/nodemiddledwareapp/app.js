//각종 노드 패키지를 참조
//서버상의 각종 에러처리를 위한 함수 참조
var createError = require('http-errors');
//node express 웹 개발 프레임워크 참조
var express = require('express');
//path (노드 프레임워크의 파일/폴더 경로정보 추출 패키지) 참조
var path = require('path');
//웹서버에서 발급하는 쿠키파일에 대한 정보를 추출하는 cookie-parser 패키지 참조
var cookieParser = require('cookie-parser');
//loggin(로그 기록) 패키지 morgan 참조 
var logger = require('morgan');

//라우팅 파일 참조
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//express 객체를 이용해 노드 애플리케이션 객체 생성
//app은 bakend node application 그자체
var app = express();

//app노드 애플리케이션 환경설정
//app.set();
//노드 애플리케이션 최초 실행시 서비스 환경세팅

// view engine setup
//MVC패턴기반 각종 view파일이 존재하는 물리적 views폴더의 위치 설정
app.set('views', path.join(__dirname, 'views'));
//MVC에서 사용하는 viewEngine기술로 ejs를 사용한다고 설정
app.set('view engine', 'ejs');

//app.use()는 미들웨어로 사용자들의 어떠한 요청과 응답에 대해
//요청이 발생할 때마다 실행되는 애플리케이션 미들웨어 함수 기능정의
//하기 모든 app.use()메소드들은 특정 사용자의 요청과 응답이 발생할때마다 실행

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//개발자 정의 라우팅 미들웨어
//http://localhost:3000/user/eddy 
app.use('/user/:id',function(req,res,next){
  const uid = req.params.id;
  console.log("어플리케이션 미들웨어 호출2-호출유형:",req.method);
  res.send("사용자아이디:"+uid);
});

//라우터파일에 대한 기본경로 설정
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
//404에러를 반환하는 미들웨어 함수
//404 not found
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
//MVC 패턴 노드백엔드 환경에서 서버에러 발생시 처리해주는 전역예외처리기 기능 제공 
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
