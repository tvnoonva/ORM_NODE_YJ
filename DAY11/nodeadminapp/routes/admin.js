//관리자 사이트 관리자 계정 정보처리 라우팅
//http://localhost:3001/admin
var express = require('express');
var router = express.Router();

//localhost:3001/admin/list
router.get('/list', async(req,res)=>{
    res.render('admin/list');
});

//localhost:3001/admin/create
router.get('/create', async(req,res)=>{
    res.render('admin/create');
});

//localhost:3001/admin/create
router.post('/create', async(req,res)=>{
    //관리자계정
    //이름, email, 전화번호, 주소, ID
    var adminId=req.body.adminId;
    var adminpassword=req.body.adminpassword;
    var adminName=req.body.adminName;
    var adminAdd=req.body.adminAdd;
    var adminPhone=req.body.adminPhone;
    var adminEmail=req.body.adminEmail;

    //adminAcount 객체로 전달
    var adminAcount={
        adminId,
        adminpassword,
        adminName,
        adminEmail,
        adminPhone,
        adminAdd
    };

    res.redirect('/admin/list');
});

//localhost:3001/admin/modify
router.get('/modify', async(req,res)=>{

    //예제 객체
    var adminAcount={
        adminId:"hello",
        adminName:"YUJIN",
        adminEmail:"am3cat723@gmail.com",
        adminPhone:"000-1111-1111",
        adminAdd:"서울"
    }

    res.render('admin/modify', {adminAcount});
});

router.post('/modify', async(req,res)=>{
    var adminId=req.body.adminId;
    var adminpassword=req.body.adminpassword;
    var adminName=req.body.adminName;
    var adminAdd=req.body.adminAdd;
    var adminPhone=req.body.adminPhone;
    var adminEmail=req.body.adminEmail;

    //adminAcount 객체로 전달
    var adminAcount={
        adminId,
        adminpassword,
        adminName,
        adminEmail,
        adminPhone,
        adminAdd
    };

    res.redirect('/admin/list');
});

router.get('/delete', async(req,res)=>{
    res.render('admin/list');
});

module.exports=router;