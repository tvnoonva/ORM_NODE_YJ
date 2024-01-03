//관리자 사이트 채팅방 정보처리 라우팅
//http://localhost:3001/channel
var express = require('express');
var router = express.Router();
var db = require('../models/index');

//localhost:3001/channel/list
router.get('/list', async (req, res) => {
    var channel_list = await db.Channel.findAll();
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

    var channel = {
        community_id,
        category_code,
        channel_name,
        user_limit,
        channel_img_path,
        channel_desc,
        channel_state_code,
        reg_date: Date.now(),
        reg_member_id: 1
    };

    await db.Channel.create(channel);

    res.redirect('/channel/list');
});

//localhost:3001/channel/modify
router.get('/modify/:channel_id', async (req, res) => {
    var channelIdx = req.params.channel_id;

    var channel = await db.Channel.findOne({where:{channel_id:channelIdx}});

    res.render('channel/modify', { channel });
});

router.post('/modify/:channel_id', async (req, res) => {
    var channelIdx = req.params.channel_id;

    var community_id = req.body.community_id;
    var category_code = req.body.category_code;
    var channel_name = req.body.channel_name;
    var user_limit = req.body.user_limit;
    var channel_img_path = req.body.channel_img_path;
    var channel_desc = req.body.channel_desc;
    var channel_state_code = req.body.channel_state_code;

    var channel = {
        community_id,
        category_code,
        channel_name,
        user_limit,
        channel_img_path,
        channel_desc,
        channel_state_code,
        reg_date: Date.now(),
        reg_member_id: 1
    };

    await db.Channel.update(channel, {where:{channel_id:channelIdx}});

    res.redirect('/channel/list');
});

router.get('/delete', async (req, res) => {
    var channelIdx=req.query.channel_id;
    await db.Channel.destroy({where:{channel_id:channelIdx}});
    res.redirect('/channel/list');
});

module.exports = router;