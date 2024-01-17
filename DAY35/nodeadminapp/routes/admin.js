var express = require('express');
var router = express.Router();
var db = require('../models/index');

const { isLoggedIn, isNotLoggedIn } = require('./passportMiddleware');

//bcrypjs 단방향 암호화 패키지 참조하기
const bcrypt = require('bcryptjs');

//AES 양방향 암호화 패키지 참조하기
const aes = require('mysql-aes');

var sequelize = db.sequelize;
const { QueryTypes } = sequelize;

//get list
router.get('/list', isLoggedIn, async (req, res, next) => {
    var searchOption = {
        companyCode: "0",
        admin_id: "",
        usedYNCode: "9"
    };

    // var admins = await db.Admin.findAll();
    var sqlQuery =`SELECT 
    company_code,admin_id,admin_password,admin_name,
    CONVERT(AES_DECRYPT(UNHEX(email),'ASDKFJ1I2!!JI@A812')USING utf8) as email,
    CONVERT(AES_DECRYPT(UNHEX(telephone),'ASDKFJ1I2!!JI@A812')USING utf8) as telephone,
    dept_name,used_yn_code,reg_date,reg_user_id 
    FROM admin_member;`;

    var admins = await sequelize.query(sqlQuery,{
        raw: true,
        type: QueryTypes.SELECT,
    });

    res.render('admin/list.ejs', { admins, searchOption });
});

router.get('/create',isLoggedIn, async (req, res, next) => {
    res.render('admin/create.ejs');
});

router.post('/create',isLoggedIn, async (req, res, next) => {

    //관리자 암호를 해시알고리즘 기반 단방향 암호화 적용하기
    //bcrypt.hash('평문', 암호변환횟수)
    var admin_password = req.body.admin_password;
    var encryptedPassword = await bcrypt.hash(admin_password, 12);

    //메일주소/전화번호 개인정보 양방향 암호화 적용하기
    //aes.encrypt('평문', KEY);
    var email = req.body.email;
    var telephone = req.body.telephone;
    var encryptedEmail = await aes.encrypt(email, process.env.MYSQL_AES_KEY);
    var encryptedTelephone = await aes.encrypt(telephone, process.env.MYSQL_AES_KEY);

    var admin = {
        company_code: req.body.companyCode,
        admin_id: req.body.adminid,
        admin_password: encryptedPassword,
        admin_name: req.body.admin_name,
        email: encryptedEmail,
        telephone: encryptedTelephone,
        dept_name: req.body.dept_name,
        used_yn_code: req.body.used_yn_code,
        reg_user_id: 1,
        reg_date: Date.now(),
        edit_user_id: 1,
        edit_date: Date.now()
    };

    await db.Admin.create(admin);
    res.redirect('/admin/list');
});

router.get('/modify/:aid', isLoggedIn,async (req, res, next) => {
    var aid = req.params.aid;
    var admin = await db.Admin.findOne({ where: { admin_id: aid } });
    
    console.log("멤버추출", admin);

    //aes.decrypt('암호문',KEY);
    admin.email = aes.decrypt(admin.email, process.env.MYSQL_AES_KEY);
    admin.telephone = aes.decrypt(admin.telephone, process.env.MYSQL_AES_KEY);

    res.render('admin/modify.ejs', { admin });
})

router.post('/modify/:aid', isLoggedIn, async (req, res, next) => {
    var aid = req.params.aid;

})

module.exports = router;