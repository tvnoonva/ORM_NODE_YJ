var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');

const {isLoggedIn, isNotLoggedIn} =require('./sessionMiddleware');

/* 
기능: 관리자 웹사이트 메인페이지 요청과 응답처리 라우팅 메소드 
호출주소: http://localhost:3000/
 */
router.get('/', isLoggedIn, async (req, res, next) => {
  var admin_id = req.session.loginUser.admin_id;
  console.log(admin_id);
  res.render('index.ejs');
});


router.get('/login', isNotLoggedIn, async (req, res, next) => {
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
      //STEP 4-0 아이디/암호가 일치하는 사용자인경우 해당 사용자의 주요정보를 세션에 저장

      //서버 메모리 공간에 저장할 현 사용자의 세션정보 구조 및 데이터 바인딩
      var sessionLoginData ={
        admin_member_id:member.admin_member_id,
        company_code:member.company_code,
        admin_id:member.admin_id,
        admin_name:member.admin_name
      };

      //req.session 속성에 동적속성으로 loginUser라는 속성을 생성하고 값으로 세션 json값을 세팅
      req.session.loginUser = sessionLoginData;

      //관리자 로그인 여부 세션 속성 추가하기
      req.session.isLogined = true;

      //반드시 req.session.save()메소드를 호출해서 동적속성에 저장된 신규속성을 저장한다.
      //save()호출과 동시에 쿠키파일이 서버에서 생성되고 생성된 쿠키파일이 현재 사용자 웹브라우저에 전달되어 저장된다.
      //저장된 쿠키파일은 이후 해당사이트로 요청이 있을때마다 무조건 전달된다.
      //전달된 쿠키정보를 이용해 서버메모리상의 세션정보를 이용해 로그인한 사용자정보를 추출한다.
      req.session.save(function(){
        //STEP 4-1 암호가 동일한경우 메인페이지 이동
        res.redirect('/');
      });

    } else {
      resultMsg = "암호가 일치하지 않습니다.";
      res.render('login.ejs', { layout: false, resultMsg });
    }

  } else {
    resultMsg = "동일한 아이디가 존재하지 않습니다.";
    res.render('login.ejs', { layout: false, resultMsg });
  }

});

router.get('/logout', isLoggedIn, async(req,res,next)=>{
  // req.logout(function(err){
  //   //로그아웃하고 관리자 로그인 페이지로 이동
  //   req.session.destroy();
  //   res.redirect('/login');
  // });

  res.redirect('/login');
});


module.exports = router;
