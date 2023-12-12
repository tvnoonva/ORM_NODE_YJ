//관리자 사이트 사용자 계정 정보처리 라우팅
//http://localhost:3001/member
var express = require('express');
var router = express.Router();

//localhost:3001/member/list
router.get('/list', async(req,res)=>{
    res.render('member/list');
});

//localhost:3001/member/create
router.get('/create', async(req,res)=>{
    res.render('member/create');
});

//localhost:3001/member/create
router.post('/create', async(req,res)=>{
    //관리자계정
    //이름, email, 전화번호, 주소, ID
    var memberId=req.body.memberId;
    var memberpassword=req.body.memberpassword;
    var memberName=req.body.memberName;
    var memberAdd=req.body.memberAdd;
    var memberPhone=req.body.memberPhone;
    var memberEmail=req.body.memberEmail;

    //memberAcount 객체로 전달
    var memberAcount={
        memberId,
        memberpassword,
        memberName,
        memberAdd,
        memberPhone,
        memberEmail
    };

    res.redirect('/member/list');
});

//localhost:3001/member/modify
router.get('/modify', async(req,res)=>{

    //예제 객체
    var memberAcount={
        memberId:"mem1",
        memberName:"yujin1",
        memberAdd:"Korea",
        memberPhone:"010-1234-1234",
        memberEmail:"123@gmail.com"
    };

    res.render('member/modify', {memberAcount});
});

router.post('/modify', async(req,res)=>{
    var memberId=req.body.memberId;
    var memberpassword=req.body.memberpassword;
    var memberName=req.body.memberName;
    var memberAdd=req.body.memberAdd;
    var memberPhone=req.body.memberPhone;
    var memberEmail=req.body.memberEmail;

    //memberAcount 객체로 전달
    var memberAcount={
        memberId,
        memberpassword,
        memberName,
        memberAdd,
        memberPhone,
        memberEmail
    };

    res.redirect('/member/list');
});

router.get('/delete', async(req,res)=>{
    res.render('member/list');
});

module.exports=router;