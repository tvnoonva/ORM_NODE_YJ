var express = require('express');
var router = express.Router();

var db = require('../models/index');
const { DATE } = require('sequelize');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index');
});

router.get('/login', async (req, res) => {
  var resultMsg = '';
  res.render('login', { layout: "authLayout", resultMsg });
});

router.post('/login', async (req, res) => {
  var resultMsg = '';

  var email = req.body.email;
  var password = req.body.password;

  var login_member = await db.Member.findOne({
    attributes: ['email', 'member_password'],
    where: { email: email }
  });

  if (login_member == null) {
    resultMsg = '사용자를 찾을 수 없습니다.';
  } else {
    if (login_member.member_password == password) {
      res.redirect('/');
    } else {
      resultMsg = '암호가 일치하지 않습니다.';
    }
  }

  if (resultMsg !== '') {
    console.log(resultMsg);
    res.render('login', { layout: "authLayout", resultMsg });
  }

});

router.get('/entry', async (req, res) => {
  res.render('entry', { layout: "authLayout" });
});

router.post('/entry', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var member = {
    email,
    member_password: password,
    name: email,
    telephone: "",
    entry_type_code: 1,
    use_state_code: 1,
    birth_date: "000000",
    reg_date: Date.now(),
    reg_member_id: 1
  };

  await db.Member.create(member);

  res.redirect('/login');
});

router.get('/find', async (req, res) => {
  res.render('find', { layout: "authLayout" });
});

router.post('/find', async (req, res) => {
  var email = req.body.email;

  var member = await db.Member.findOne({
    attributes: ['email', 'member_password'],
    where: { email: email }
  });

  console.log("암호는 ", member.member_password);
  res.redirect('/login');
});


//암호찾기 재설정 페이지 password-init
//쿼리스트링 방식으로 token 값을 받아서 백엔드로 처리후 html 페이지로 연동
router.get("/password-init", async (req, res, next) => {
  const token = req.query.token;

  try {
    var tokenData = await jwt.verify(token, process.env.JWT_SECRET);
    res.render('password-init', {code:200, data:tokenData, result:"Valid token"});
  } catch (err) {
    console.log("This address is unvalid.");
    res.redirect('/login.html')
  }
});

router.post("/password-init", async(req,res,next)=>{
  var email = await AES.encrypt(req.body.email, process.env.MYSQL_AES_KEY);
  var password = req.body.password;

  const member = await db.Member.findOne({where:{email:email}});
  member.member_password=await bcrypt.hash(password, 12);
  var count = await db.Member.update(member, {where:{email:email}});
  console.log("Password update complete ", count);

  res.redirect('/login.html');
});


module.exports = router;
