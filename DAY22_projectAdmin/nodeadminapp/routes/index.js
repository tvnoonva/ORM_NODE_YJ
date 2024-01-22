//공통기능 제공
//http://localhost:3001/
var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');
const passport = require('passport');

// const {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');
const { isLoggedIn, isNotLoggedIn } = require('./passportMiddleware');

var resultMsg = '';

/* GET home page. */
router.get('/main', isLoggedIn, async (req, res, next)=> {
  var userData = req.session.loginUser;
  res.render('index', { userData });
});

//로그인 웹페이지 요청&응답
//localhost:3001/
router.get('/', isNotLoggedIn, async (req, res, next) => {
  resultMsg = '';
  res.render('login', { layout: "loginLayout", resultMsg, loginError:req.flash('loginError') });
});

//로그인 처리 및 응답, 처리 후 메인페이지 이동
//localhost:3001/
router.post('/', isNotLoggedIn, async (req, res, next) => {

  var admin_id = req.body.adminId;
  var password = req.body.password;

  var login_member = await db.Admin.findOne({ where: { admin_id: admin_id } });

  if (login_member) {
    if (await bcrypt.compare(password, login_member.admin_password)) {
      var sessionLoginData = {
        admin_member_id: login_member.admin_member_id,
        company_code: login_member.company_code,
        admin_id: login_member.admin_id,
        admin_name: login_member.admin_name
      };

      req.session.isLoggedIn = true;
      req.session.loginUser = sessionLoginData;
      req.session.save(function () {
        return res.redirect("/main");
      });
    } else {
      return res.render('login', { layout: false, resultMsg: "Password not correct." });
    }
  } else {
    return res.render('login', { layout: false, resultMsg: "Admin member not found." });
  }

});

router.post('/passportLogin', async (req, res, next) => {
  passport.authenticate('local', (authError, admin, info) => {

    //패스포트 인증시 에러가 발생한경우 에러값 반환
    if (authError) {
      console.log(authError);
      return next(authError);
    }

    if (!admin) {
      req.flash('loginError', info.message);
      return res.redirect('/');
    }

    return req.login(admin, (loginError) => {
      if (loginError) {
        console.log(loginError);
        return next(loginError);
      }

      return res.redirect('/main');
    });

  })(req, res, next);

})

//패스포트 전용 로그아웃 
router.get('/logout', isLoggedIn, async (req, res, next) => {
  req.logout(function (err) {
    //로그아웃하고 관리자 로그인 페이지로 이동
    req.session.destroy();
    res.redirect('/login');
  });

});

module.exports = router;
