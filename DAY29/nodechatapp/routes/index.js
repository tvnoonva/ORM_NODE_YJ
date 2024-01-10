var express = require('express');
var router = express.Router();
var db = require('../models/index');

var bcrypt = require('bcryptjs');

/* 임시메인- */
router.get('/', async (req, res, next) => {
  res.render('channel/chat.ejs', { layout: "baseLayout" });
  //res.render('channel/chat.ejs',{layout:false});
});


/* 회원가입 웹페이지 요청과 응답*/
router.get('/entry', async (req, res, next) => {
  res.render('entry');
});

/* 회원가입 사용자 입력정보 처리 요청과 응답*/
router.post('/entry', async (req, res, next) => {

  encryptedPassword = await bcrypt.hash(req.body.password, 12);

  var member = {
    email: req.body.email,
    member_password: encryptedPassword,
    name: req.body.name,
    profile_img_path: "",
    telephone: "",
    entry_type_code: 0,
    use_state_code: 1,
    birth_date: "",
    reg_date: Date.now(),
    reg_member_id: 0
  }

  await db.Member.create(member);

  //등록완료시 로그인 페이지로 이동시키지
  res.redirect('/login');
});


/* 로그인 웹페이지 요청과 응답*/
router.get('/login', async (req, res, next) => {
  res.render('login.ejs', {result:""});
});

/* 로그인 사용자 입력정보 처리 요청과 응답*/
router.post('/login', async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var member = await db.Member.findOne({where:{email:email}});
  var resultMsg = ""

  if(member){

    var result = await bcrypt.compare(password, member.member_password);

    if(result){
      res.redirect('/');
    } else {
      resultMsg = "암호가 일치하지 않습니다.";
      res.render('login', {resultMsg});
    }

  } else {
    resultMsg = "해당 유저가 존재하지 않습니다.";
    res.render('login', {resultMsg});
  }
});


/* 암호찾기 웹페이지 요청과 응답*/
router.get('/find', async (req, res, next) => {
  res.render('find.ejs');
});

/* 암호찾기 사용자 입력정보 처리 요청과 응답*/
router.post('/find', async (req, res, next) => {
  res.render('find.ejs', { email: "", result: "Ok" });
});



module.exports = router;
