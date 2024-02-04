var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var sequelize = require('./models/index.js').sequelize;
var debug = require('debug');

var expressLayouts = require('express-ejs-layouts');
const cors = require('cors');
var session = require('./node_modules/express-session');
const webSocket = require('./socket.js');

// 라우터
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var channelRouter = require('./routes/channel');
var memberAPIRouter = require('./routes/memberAPI');
var channelAPIRouter = require('./routes/channelAPI');

var app = express();
sequelize.sync();

app.use(cors());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "testsecret",
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 5 //5분동안 서버세션을 유지하겠다.(1000은 1초)
    },
  }),
);

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
app.use('/channel', channelRouter);
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

// 기본 was 서비스 포트
app.set('port', process.env.PORT || 3000);

// 서버 객체 생성
var server = app.listen(app.get('port'), function () {

});

webSocket(server);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
