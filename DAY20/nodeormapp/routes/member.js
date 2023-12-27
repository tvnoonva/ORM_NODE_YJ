var express = require('express');
var router = express.Router();

var db=require('../models/index');

var email='';
var password='';
var resultMsg='';

//회원가입 웹페이지
//http://localhost:3000/member/entry
router.get('/entry', async (req, res, next) => {
    res.render('member/entry');
});

router.post('/entry', async (req, res, next) => {

    //STEP1 회원가입 정보 추출하기
    var email=req.body.email;
    var password=req.body.password;

    //STEP2 members 테이블 데이터를 저장한다
    //DB에 전달되는 JSON 데이터의 속성명은 반드시 해당 데이터모델(models/member.js)의 속성명과 동일해야한다.
    var member={
        email,
        password
    };


    //STEP3 DB에 저장하고 저장된 값을 반환받는다
    //db.Member.create()는 ORM 프레임워크에 의해서 백엔드에서
    //INSERT INTO members(email,password,createdAt)Values('메일주소','암호',now()); 
    //MySQL DB서버로 전달되어 데이터가 입력되고 입력된 데이터를 MySQL 서버에서 반환해준다.
    var savedMember = await db.Member.create(member);

    res.redirect('/');
});

//로그인
router.get('/login', async (req, res, next) => {
    res.render('member/login',{resultMsg,email,password});
});

router.post('/login', async (req, res, next) => {

    //STEP1 로그인 정보 추출
    var email=req.body.email;
    var password=req.body.password;

    //STEP2 members 테이블에서 동일한 메일주소의 단일사용자 정보를 조회
    //db.Member.findOne(조건) ORM 메소드는
    //SELECT * FROM members WHERE email='이메일값';의 SQL구문을 백엔드 환경에서 동적으로 만들어서
    //MySQL 서버로 전달해 실행하고 조회결과물을 반환받는다
    var member = await db.Member.findOne({where:{email:email}});

    //STEP3 로그인처리 로직구현

    if(member==null){
        resultMsg='사용자를 찾을 수 없습니다.';
    }else{
        if(member.password == password){
            res.redirect('/');
        }else{
            resultMsg='암호가 일치하지 않습니다.';
        }
    }

    if (resultMsg!==''){
        console.log(resultMsg);
        res.render('member/login', {resultMsg,email,password});
    }

});


module.exports = router;
