//관리자 사이트 채팅 메시지 정보처리 라우팅
//http://localhost:3001/message
var express = require('express');
var router = express.Router();
const ChannelMessage = require('../schemas/channelMessage');

//localhost:3001/message/list
router.get('/list', async (req, res) => {
    const messages = await ChannelMessage.find({});
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

    var channel_msg = {
        channel_id,
        member_id,
        nick_name,
        msg_type_code,
        connection_id,
        message,
        ip_address: "127.0.0.1",
        top_channel_msg_id: 1,
        msg_state_code: 1,
        msg_date: Date.now()
    };

    await ChannelMessage.create(channel_msg);

    res.redirect('/message/list');
});

//localhost:3001/message/modify
router.get('/modify/:channel_msg_id', async (req, res) => {
    var channelMsgIdx = req.params.channel_msg_id;

    var messages = await ChannelMessage.find({ channel_msg_id: channelMsgIdx });
    var channel_msg = messages[0];
    // console.log(channel_msg);
    res.render('message/modify', { channel_msg });
});

router.post('/modify/:channel_msg_id', async (req, res) => {
    var channelMsgIdx = req.params.channel_msg_id;

    var channel_id = req.body.channel_id;
    var member_id = req.body.member_id;
    var nick_name = req.body.nick_name;
    var msg_type_code = req.body.msg_type_code;
    var connection_id = req.body.connection_id;
    var message = req.body.message;

    var channel_msg = {
        channel_id,
        member_id,
        nick_name,
        msg_type_code,
        connection_id,
        message,
        ip_address: "127.0.0.1",
        top_channel_msg_id: 1,
        msg_state_code: 1,
        edit_date: Date.now()
    };

    await ChannelMessage.updateOne({channel_msg_id:channelMsgIdx}, channel_msg);

    res.redirect('/message/list');
});

router.get('/delete', async (req, res) => {
    var channelMsgIdx = req.query.channel_msg_id;
    await ChannelMessage.deleteOne({channel_msg_id:channelMsgIdx});
    res.redirect('/message/list');
});

module.exports = router;