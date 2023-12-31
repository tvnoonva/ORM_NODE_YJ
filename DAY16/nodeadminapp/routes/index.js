//공통기능 제공
//http://localhost:3001/
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '관리자 사이트' });
});

//로그인 웹페이지 요청&응답
//localhost:3001/login
router.get('/login', async(req,res)=>{
  res.render('login', {layout:"loginLayout"});
});

//로그인 처리 및 응답, 처리 후 메인페이지 이동
//localhost:3001/login
router.post('/login', async(req,res)=>{
  var adminId=req.body.adminId;
  var password=req.body.password;

  res.redirect('/');
});

//로그인 후 접속할 메인페이지 요청&응답
router.get('/', async(req,res)=>{
  //if (로그인 되었다면)

  res.render('index', {title: '로그인되었습니다.'});
});

module.exports = router;
