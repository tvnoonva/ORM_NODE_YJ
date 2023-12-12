//관리자 사이트 채팅방 정보처리 라우팅
//http://localhost:3001/channel
var express = require('express');
var router = express.Router();

//localhost:3001/channel/list
router.get('/list', async(req,res)=>{
    res.render('channel/list');
});

//localhost:3001/channel/create
router.get('/create', async(req,res)=>{
    res.render('channel/create');
});

//localhost:3001/channel/create
router.post('/create', async(req,res)=>{
    //채팅방 정보
    //채팅방ID, 채팅방이름, 상태, 참여멤버ID, 참여유저상한수
    //입력받는 정보: 채팅방이름 참여유저상한
    var title=req.body.title;
    var userLimit=req.body.userLimit;

    //channel 객체로 전달
    var channel={
        title,
        userLimit
    };

    res.redirect('/channel/list');
});

//localhost:3001/channel/modify
router.get('/modify', async(req,res)=>{

    //임시로 전달할 예제 객체
    // var channel={
    //     
    // }

    res.render('channel/modify');
});

router.post('/modify', async(req,res)=>{
    var title=req.body.title;
    var userLimit=req.body.userLimit;

    //channel 객체로 전달
    var channel={
        title,
        userLimit
    };

    res.redirect('/channel/list');
});

router.get('/delete', async(req,res)=>{
    res.render('channel/list');
});

module.exports=router;