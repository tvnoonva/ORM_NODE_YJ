//관리자 사이트 사용자 계정 정보처리 라우팅
//http://localhost:3001/member
var express = require('express');
var router = express.Router();
var db = require('../models/index');

//localhost:3001/member/list
router.get('/list', async (req, res) => {
    var member_list = await db.Member.findAll();
    res.render('member/list', { member_list });
});

//localhost:3001/member/create
router.get('/create', async (req, res) => {
    res.render('member/create');
});

//localhost:3001/member/create
router.post('/create', async (req, res) => {
    var email = req.body.email;
    var member_password = req.body.member_password;
    var name = req.body.name;
    var profile_img_path = req.body.profile_img_path;
    var telephone = req.body.telephone;
    var birth_date = req.body.birth_date;

    var member = {
        email,
        member_password,
        name,
        profile_img_path,
        telephone,
        entry_type_code: 0,
        use_state_code: 1,
        birth_date,
        reg_date: Date.now(),
        reg_member_id: 1
    };

    await db.Member.create(member);

    res.redirect('/member/list');
});

//localhost:3001/member/modify
router.get('/modify/:member_id', async (req, res) => {
    var memberIdx = req.params.member_id;

    var member = await db.Member.findOne({ where: { member_id: memberIdx } });

    res.render('member/modify', { member });
});

router.post('/modify/:member_id', async (req, res) => {
    var memberIdx = req.params.member_id;

    var email = req.body.email;
    var member_password = req.body.member_password;
    var name = req.body.name;
    var profile_img_path = req.body.profile_img_path;
    var telephone = req.body.telephone;
    var birth_date = req.body.birth_date;

    var member = {
        email,
        member_password,
        name,
        profile_img_path,
        telephone,
        entry_type_code: 0,
        use_state_code: 1,
        birth_date,
        edit_date: Date.now(),
        edit_member_id: 1
    };

    await db.Member.update(member, { where: { member_id: memberIdx } });

    res.redirect('/member/list');
});

router.get('/delete', async (req, res) => {
    var memberIdx = req.query.member_id;
    await db.Member.destroy({ where: { member_id: memberIdx } });
    res.redirect('/member/list');
});

module.exports = router;