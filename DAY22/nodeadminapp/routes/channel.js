//관리자 사이트 채팅방 정보처리 라우팅
//http://localhost:3001/channel
var express = require('express');
var router = express.Router();

var channel_list = [
    {
        channel_id: 1,
        community_id: 1,
        category_code: 1,
        channel_name: "채팅채널1",
        user_limit: 100,
        channel_img_path: "",
        channel_desc: "채널1 소개글문구",
        channel_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    },
    {
        channel_id: 2,
        community_id: 2,
        category_code: 1,
        channel_name: "채팅채널2",
        user_limit: 100,
        channel_img_path: "",
        channel_desc: "채널2 소개글문구",
        channel_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin2",
        edit_date: Date.now(),
        edit_member_id: "yujin2"
    },
    {
        channel_id: 3,
        community_id: 1,
        category_code: 13,
        channel_name: "채팅채널3",
        user_limit: 10,
        channel_img_path: "",
        channel_desc: "채널3 소개글문구",
        channel_state_code: 0,
        reg_date: Date.now(),
        reg_member_id: "yujin3",
        edit_date: Date.now(),
        edit_member_id: "yujin3"
    },
];

//localhost:3001/channel/list
router.get('/list', async (req, res) => {
    res.render('channel/list', { channel_list });
});

//localhost:3001/channel/create
router.get('/create', async (req, res) => {
    res.render('channel/create');
});

//localhost:3001/channel/create
router.post('/create', async (req, res) => {
    var community_id = req.body.community_id;
    var category_code = req.body.category_code;
    var channel_name = req.body.channel_name;
    var user_limit = req.body.user_limit;
    var channel_img_path = req.body.channel_img_path;
    var channel_desc = req.body.channel_desc;
    var channel_state_code = req.body.channel_state_code;

    //channel 객체로 전달
    var channel = {
        channel_id: "",
        community_id,
        category_code,
        channel_name,
        user_limit,
        channel_img_path,
        channel_desc,
        channel_state_code,
        reg_date: Date.now(),
        reg_member_id: "",
        edit_date: Date.now(),
        edit_member_id: ""
    };

    res.redirect('/channel/list');
});

//localhost:3001/channel/modify
router.get('/modify/:channel_id', async (req, res) => {
    var channel_id = req.params.channel_id;

    var channel = {
        channel_id: 1,
        community_id: 1,
        category_code: 1,
        channel_name: "채팅채널1",
        user_limit: 100,
        channel_img_path: "",
        channel_desc: "채널1 소개글문구",
        channel_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    };

    res.render('channel/modify', { channel });
});

router.post('/modify/:channel_id', async (req, res) => {
    var channel_id = req.params.channel_id;

    var community_id = req.body.community_id;
    var category_code = req.body.category_code;
    var channel_name = req.body.channel_name;
    var user_limit = req.body.user_limit;
    var channel_img_path = req.body.channel_img_path;
    var channel_desc = req.body.channel_desc;
    var channel_state_code = req.body.channel_state_code;

    //channel 객체로 전달
    var channel = {
        channel_id: "",
        community_id,
        category_code,
        channel_name,
        user_limit,
        channel_img_path,
        channel_desc,
        channel_state_code,
        reg_date: Date.now(),
        reg_member_id: "",
        edit_date: Date.now(),
        edit_member_id: ""
    };

    var channel = {
        channel_id: 1,
        community_id: 1,
        category_code: 1,
        channel_name: "채팅채널1",
        user_limit: 100,
        channel_img_path: "",
        channel_desc: "채널1 소개글문구",
        channel_state_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    };

    res.redirect('/channel/list');
});

router.get('/delete', async (req, res) => {
    var channel_id=req.params.channel_id;
    
    res.redirect('/channel/list');
});

module.exports = router;