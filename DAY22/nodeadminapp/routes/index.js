//공통기능 제공
//http://localhost:3001/
var express = require('express');
var router = express.Router();
var db=require('../models/index');

var resultMsg='';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

//로그인 웹페이지 요청&응답
//localhost:3001/login
router.get('/login', async(req,res)=>{
  resultMsg='';
  res.render('login', {layout:"loginLayout", resultMsg});
});

//로그인 처리 및 응답, 처리 후 메인페이지 이동
//localhost:3001/login
router.post('/login', async(req,res)=>{

  var admin_id=req.body.adminId;
  var password=req.body.password;

  var login_member = await db.Admin.findOne({where:{admin_id:admin_id}});

  if(login_member==null){
    resultMsg='사용자를 찾을 수 없습니다.';
  }else{
    if(login_member.admin_password == password){
      res.redirect('/');
    }else{
      resultMsg='암호가 일치하지 않습니다.';
    }
  }

  if(resultMsg!==''){
    console.log(resultMsg);
    res.render('login', {layout:"loginLayout", resultMsg});
  }
});

//로그인 후 접속할 메인페이지 요청&응답
router.get('/', async(req,res)=>{
  res.render('index');
});

module.exports = router;
