//관리자 사이트 사용자 계정 정보처리 라우팅
//http://localhost:3001/member
var express = require('express');
var router = express.Router();

var member_list = [
    {
        member_id:1,
        email:"am3ca723@gmail.com",
        member_password:"pass1234",
        name:"최유진",
        profile_img_path:"",
        telephone:"101-111-1111",
        entry_type_code:1,
        use_state_code:1,
        reg_date:Date.now(),
        reg_member_id:"yujin",
        edit_date:Date.now(),
        edit_member_id:"yujin"
    },
    {
        member_id:2,
        email:"am3ca7231@gmail.com",
        member_password:"pass1234111",
        name:"최유빈",
        profile_img_path:"",
        telephone:"101-111-2222",
        entry_type_code:1,
        use_state_code:1,
        reg_date:Date.now(),
        reg_member_id:"yujin",
        edit_date:Date.now(),
        edit_member_id:"yujin"
    },
    {
        member_id:3,
        email:"am3ca7232@gmail.com",
        member_password:"pass123431",
        name:"최유신",
        profile_img_path:"",
        telephone:"101-111-1234",
        entry_type_code:1,
        use_state_code:0,
        reg_date:Date.now(),
        reg_member_id:"yujin",
        edit_date:Date.now(),
        edit_member_id:"yujin"
    }
];

//localhost:3001/member/list
router.get('/list', async(req,res)=>{
    res.render('member/list', {member_list});
});

//localhost:3001/member/create
router.get('/create', async(req,res)=>{
    res.render('member/create');
});

//localhost:3001/member/create
router.post('/create', async(req,res)=>{
    var email=req.body.email;
    var member_password=req.body.member_password;
    var name=req.body.name;
    var profile_img_path=req.body.profile_img_path;
    var telephone=req.body.telephone;

    var memberSavedDB = {
        member_id:"",
        email,
        member_password,
        name,
        profile_img_path,
        telephone,
        entry_type_code:0,
        use_state_code:1,
        reg_date:Date.now(),
        reg_member_id:"",
        edit_date:Date.now(),
        edit_member_id:""
    };

    res.redirect('/member/list');
});

//localhost:3001/member/modify
router.get('/modify/:member_id', async(req,res)=>{
    var member_id=req.params.member_id;

    var member ={
        member_id:3,
        email:"am3ca7232@gmail.com",
        member_password:"pass123431",
        name:"최유신",
        profile_img_path:"",
        telephone:"101-111-1234",
        entry_type_code:1,
        use_state_code:0,
        reg_date:Date.now(),
        reg_member_id:"yujin",
        edit_date:Date.now(),
        edit_member_id:"yujin"
    };

    res.render('member/modify', {member});
});

router.post('/modify/:member_id', async(req,res)=>{
    var member_id=req.params.member_id;

    var email=req.body.email;
    var member_password=req.body.member_password;
    var name=req.body.name;
    var profile_img_path=req.body.profile_img_path;
    var telephone=req.body.telephone;
    var entry_type_code=req.body.entry_type_code;

    var memberSavedDB = {
        member_id,
        email,
        member_password,
        name,
        profile_img_path,
        telephone,
        entry_type_code,
        use_state_code:1,
        reg_date:Date.now(),
        reg_member_id:"",
        edit_date:Date.now(),
        edit_member_id:""
    };

    var member ={
        member_id:3,
        email:"am3ca7232@gmail.com",
        member_password:"pass123431",
        name:"최유신",
        profile_img_path:"",
        telephone:"101-111-1234",
        entry_type_code:1,
        use_state_code:0,
        reg_date:Date.now(),
        reg_member_id:"yujin",
        edit_date:Date.now(),
        edit_member_id:"yujin"
    };

    res.redirect('/member/list');
});

router.get('/delete', async(req,res)=>{
    var member_id=req.body.member_id;

    res.redirect('/member/list');
});

module.exports=router;