//각종 회원정보 요청과 응답 처리 라우팅 파일
//기본주소: http://localhost.3000/member
var express = require('express');
var router = express.Router();


//회원약간 웹페이지에 대한 요청, 응답처리 
//http://localhost:3000/member/join
router.get('/join',function(req, res){
    res.render('member/join.ejs');
});

/*
    res.render('view파일의 물리적 경로');
    -웹페이지 리소스(ex ejs)를 전달해주는것
    res.redirect('링크 URL 주소');
    -웹페이지 url로 이동시키는 것
*/

//신규회원 가입 웹페이지(가입폼)에 대한 요청, 응답처리 (폼 제공)
//http://localhost:3000/member/entry
router.get('/entry',function(req, res){
    res.render('member/entry.ejs');
});

//사용자가 입력한 회원 정보를 DB처리하고 로그인 페이지로 이동시키는 요청, 응답처리 (입력값 처리)
//http://localhost:3000/member/entry
router.post('/entry', function(req, res){
    //STEP1 사용자가 입력한 회원가입정보를 추출한다.
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    //STEP2 DB의 member 테이블에 동일한 사용자 메일주소가 있는지 체크한다.

    //STEP3 메일주소가 중복되지 않으면 신규회원으로 해당 사용자 정보를 member 테이블에 저장한다.
    var member = {
        email,
        password,
        name
    }

    res.redirect('/auth/login');

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


//라우터 export 
module.exports = router;