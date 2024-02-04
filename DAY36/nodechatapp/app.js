var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var debug = require('debug');
var sequilize = require('./models/index.js').sequelize;
const webSocket = require('./socket');

var expressLayouts = require('express-ejs-layouts');
var session = require('session');
const redis = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  db: 0,
});

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

//노드 앱의 기본 WAS 서비스 포트
app.set('port', process.env.PORT);

//노드 앱의 서버 객체 생성
var server = app.listen(app.get('port'),function(){

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
