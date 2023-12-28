//관리자 사이트 채팅 메시지 정보처리 라우팅
//http://localhost:3001/message
var express = require('express');
var router = express.Router();

var messages = [
    {
        channel_msg_id: 1,
        channel_id: 1,
        member_id: 1,
        nick_name: "helloworld",
        msg_type_code: 1,
        connection_id: 1,
        message: "메시지1 내용",
        ip_address: "111.111.111.111",
        top_channel_msg_id: 1,
        msg_state_code: 1,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    },
    {
        channel_msg_id: 2,
        channel_id: 1,
        member_id: 2,
        nick_name: "helloworld111",
        msg_type_code: 1,
        connection_id: 1,
        message: "메시지1 내용",
        ip_address: "111.111.111.111",
        top_channel_msg_id: 123,
        msg_state_code: 1,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    },
    {
        channel_msg_id: 3,
        channel_id: 3,
        member_id: 3,
        nick_name: "helloworld",
        msg_type_code: 4,
        connection_id: 1,
        message: "메시지1 내용",
        ip_address: "111.111.111.111",
        top_channel_msg_id: 3,
        msg_state_code: 0,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    },
];

//localhost:3001/message/list
router.get('/list', async (req, res) => {
    res.render('message/list', { messages });
});

//localhost:3001/message/create
router.get('/create', async (req, res) => {
    res.render('message/create');
});

//localhost:3001/message/create
router.post('/create', async (req, res) => {
    var channel_id = req.body.channel_id;
    var member_id = req.body.member_id;
    var nick_name = req.body.nick_name;
    var msg_type_code = req.body.msg_type_code;
    var connection_id = req.body.connection_id;
    var message = req.body.message;
    var ip_address = req.body.ip_address;

    var channel_msg = {
        channel_msg_id: 1,
        channel_id,
        member_id,
        nick_name,
        msg_type_code,
        connection_id,
        message,
        ip_address:"",
        top_channel_msg_id: 1,
        msg_state_code: 1,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    };

    res.redirect('/message/list');
});

//localhost:3001/message/modify
router.get('/modify/:channel_msg_id', async (req, res) => {
    var channel_msg_id = req.params.channel_msg_id;

    var channel_msg = {
        channel_msg_id: 1,
        channel_id: 1,
        member_id: 1,
        nick_name: "helloworld",
        msg_type_code: 1,
        connection_id: 1,
        message: "메시지1 내용",
        ip_address: "111.111.111.111",
        top_channel_msg_id: 1,
        msg_state_code: 1,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    }

    res.render('message/modify', { channel_msg });
});

router.post('/modify/:channel_msg_id', async (req, res) => {
    var channel_msg_id = req.params.channel_msg_id;

    var channel_id = req.body.channel_id;
    var member_id = req.body.member_id;
    var nick_name = req.body.nick_name;
    var msg_type_code = req.body.msg_type_code;
    var connection_id = req.body.connection_id;
    var message = req.body.message;
    var ip_address = req.body.ip_address;

    var channel_msg = {
        channel_msg_id: 1,
        channel_id,
        member_id,
        nick_name,
        msg_type_code,
        connection_id,
        message,
        ip_address,
        top_channel_msg_id: 1,
        msg_state_code: 1,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    };

    var channel_msg = {
        channel_msg_id: 1,
        channel_id: 1,
        member_id: 1,
        nick_name: "helloworld",
        msg_type_code: 1,
        connection_id: 1,
        message: "메시지1 내용",
        ip_address: "111.111.111.111",
        top_channel_msg_id: 1,
        msg_state_code: 1,
        msg_date: Date.now(),
        edit_date: Date.now(),
        del_date: Date.now()
    }

    res.redirect('/message/list');
});

router.get('/delete', async (req, res) => {
    var channel_msg_id = req.params.channel_msg_id;
    
    res.redirect('/message/list');
});

module.exports = router;