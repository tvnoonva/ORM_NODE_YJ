var express = require('express');
var router = express.Router();
var db = require('../models/index');

var bcrypt = require('bcryptjs');

//jsonwebtoken 패키지 참조하기
const jwt = require('jsonwebtoken');

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
  res.render('login.ejs', { result: "" });
});

/* 로그인 사용자 입력정보 처리 요청과 응답*/
router.post('/login', async (req, res, next) => {
  var email = req.body.email;
  var password = req.body.password;

  var member = await db.Member.findOne({ where: { email: email } });
  var resultMsg = ""

  if (member) {

    var result = await bcrypt.compare(password, member.member_password);

    if (result) {
      res.redirect('/');
    } else {
      resultMsg = "암호가 일치하지 않습니다.";
      res.render('login', { resultMsg });
    }

  } else {
    resultMsg = "해당 유저가 존재하지 않습니다.";
    res.render('login', { resultMsg });
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


/* JWT토큰 생성 웹페이지 요청과 응답*/
router.get('/maketoken', async (req, res, next) => {
  var token = "";

  res.render('maketoken.ejs', { token, layout: false });
});

/* JWT 토큰 생성하고 확인하기*/
router.post('/maketoken', async (req, res, next) => {
  var token = "";

  //JWT토큰에 담을 JSON 데이터 구조 및 데이터 바인딩
  var jsonTokenData = {
    userid: req.body.userID,
    email: req.body.email,
    usertype: req.body.userType,
    name: req.body.name,
    telephone: req.body.telephone
  }

  //JSON데이터를 JWT 토큰으로 생성한다. 
  //jwt.sign(JSON데이터, KEY, 옵션{expiresIn(파기기한지정), issuer:'msoftware)});
  //파기일시 지정포맷 : 30s 60m m24h 200d 토큰 생성일을 기준으로 해당 기간만큼 유효
  token = await jwt.sign(jsonTokenData, process.env.JWT_SECRET, { expiresIn: '24h', issuer: 'msoftware' });
  console.log(token);

  res.render('maketoken.ejs', { token, layout: false });
});

/*
-JWT 토큰값을 수신하여 토큰값을 해석하기
-http://localhost:3000/readtoken?token=토큰값
*/
router.get('/readtoken', async (req, res, next) => {
  var token = req.query.token;

  try {
    //토큰의 유효성을 검사하고 데이터를 추출한다
    //await jwt.verify(토큰문자열, KEY)
    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    token = "유효하지 않은 토큰입니다.";
    var tokenJsonData = {
      userid:"",
      email:"",
      usertype:"",
      name:"",
      telephone:""
    }
  }

  res.render('readtoken.ejs', { token, tokenJsonData, layout: false });
});


module.exports = router;
