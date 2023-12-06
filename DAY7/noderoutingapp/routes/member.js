//기본주소: http://localhost.3000/member
var express = require('express');
var router = express.Router();


router.get('/join',function(req, res){
    res.render('member/join.ejs');
});

router.get('/entry',function(req, res){
    res.render('member/entry.ejs');
});

router.post('/entry', function(req, res){
    var email = req.body.email;
    var password = req.body.password;

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


module.exports = router;