//auth.js 라우터 파일은 회원 인증과 관련된 모든 사용자 요청과 응답을 처리합니다.
//모든 라우터 파일은 기본 라우팅 주소체계를 가집니다.
//http://localhost:3000/라우터파일의 기본주소/라우팅메소드의 주소
//http://localhost.3000/auth라는 기본주소로 해당 라우팅 파일 내 모든 라우팅
//메소드는 가공된 기본주소를 갖는다.

var express = require('express');
var router = express.Router();

//기능: 로그인 웹페이지 사용자 요청과 응답처리 라우팅 메소드
//호출주소:https://localhost:3000/auth/login
//호출방식:GET
router.get('/login',function(req, res){
    res.render('auth/login.ejs');
});

//기능: 로그인 웹페이지에서 사용자가 입력한 메일주소/암호를 받아 로그인 처리 요청과
//응답처리 라우팅 메소드
//호출주소:https://localhost:3000/auth/login
//호출방식:POST
router.post('/login', function(req, res){

    //STEP1 사용자 로그인 페이지에서 사용자가 입력한 메일주소와 암호값 추출
    //사용자가 입력한 값들은 웹브라우저를 통해 전달
    //req=HttpRequest 객체를 통해 사용자의 입력값 추출
    //브라우저에서 넘어오는 패킷은 header와 body(내부)로 구성되어 있는데
    //그 body 정보 중 email 속성에 접근한다는 뜻
    var email = req.body.email;
    var password = req.body.password;

    //STEP2: 모델을 이용해 동일한 메일주소와 암호가 있는지 체크한다.

    //STEP3: 정상적인 사용자 메일/암호일경우 메인페이지로 사용자 웹페이지를 이동
    //res HttpResponse 객체의 redirect('도메인주소/하위url주소') method는 지정된 url 주소체계로 사용자 웹페이지 이동
    //res.redirect('http://www.naver.com/main');
    res.redirect('/main');

});

//로그아웃 요청 및 응답처리 라우팅 메소드
//요청주소: http://localhost:3000/auth/logout
//요청방식: GET
//반환형식: 특정 페이지 이동처리
router.get('/logout',function(req,res){
    //STEP1: 로그아웃처리
    //STEP2: 로그아웃 후 이동할 페이지 지정
    res.redirect("/main");
});


module.exports = router;