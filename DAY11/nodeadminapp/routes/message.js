//관리자 사이트 채팅 메시지 정보처리 라우팅
//http://localhost:3001/message
var express = require('express');
var router = express.Router();

//localhost:3001/message/list
router.get('/list', async(req,res)=>{
    res.render('message/list');
});

//localhost:3001/message/create
router.get('/create', async(req,res)=>{
    res.render('message/create');
});

//localhost:3001/message/create
router.post('/create', async(req,res)=>{
    //채팅 메시지 정보
    //채팅방ID, 작성사용자ID, 메시지내용(message), 작성일자
    var message=req.body.message;
    var channelId=req.body.channelId;
    var memberId=req.body.memberId;


    //임시로 전달할 예제 객체
    var channel_message={
        message,
        channelId,
        memberId
    };

    res.redirect('/message/list');
});

//localhost:3001/message/modify
router.get('/modify', async(req,res)=>{

    //임시로 전달할 예제 객체
    // var channel_message={
        
    // }

    res.render('message/modify');
});

router.post('/modify', async(req,res)=>{
    var message=req.body.message;
    var channelId=req.body.channelId;
    var memberId=req.body.memberId;


    //임시로 전달할 예제 객체
    var channel_message={
        message,
        channelId,
        memberId
    };

    res.redirect('/message/list');
});

router.get('/delete', async(req,res)=>{
    res.render('message/list');
});

module.exports=router;