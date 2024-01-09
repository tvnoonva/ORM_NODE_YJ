var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');

/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/', async (req, res, next) => {
  res.render('index.ejs');
});


router.get('/login', async (req, res, next) => {
  res.render('login.ejs', { layout: false, resultMsg:"" });
});

router.post('/login', async (req, res, next) => {
  var admin_id = req.body.admin_id;
  var admin_password = req.body.password;
  var resultMsg = "";

  var member = await db.Admin.findOne({ where: { admin_id: admin_id } });

  if (member) {

    //bcrypt를 이용한 암호체크 bcrypt.compare('입력값','DB저장값');
    //bcrypt.compare() 실행결과가 boolean으로 return
    var passwordResult = await bcrypt.compare(admin_password, member.admin_password);

    if (passwordResult) {
      res.redirect('/');
    } else {
      resultMsg = "암호가 일치하지 않습니다.";
      res.render('login.ejs', { layout: false, resultMsg });
    }

  } else {
    resultMsg = "동일한 아이디가 존재하지 않습니다.";
    res.render('login.ejs', { layout: false, resultMsg });
  }

});


module.exports = router;
