//관리자 사이트 관리자 계정 정보처리 라우팅
//http://localhost:3001/admin
var express = require('express');
var router = express.Router();
var Admin = require('../schemas/article');

//localhost:3001/admin/list
router.get('/list', async (req, res) => {
    var admin_member=await Admin.find({});
    res.render('admin/list', { admin_member });
});

//localhost:3001/admin/create
router.get('/create', async (req, res) => {
    res.render('admin/create');
});

//localhost:3001/admin/create
router.post('/create', async (req, res) => {
    var company_code = req.body.company_code;
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var dept_name = req.body.dept_name;
    var used_yn_code = req.body.used_yn_code;

    var admin = {
        company_code,
        admin_id,
        admin_password,
        admin_name,
        email,
        telephone,
        dept_name,
        used_yn_code,
        reg_user_id:1,
        reg_date: Date.now()
    };

    await Admin.create(admin);

    res.redirect('/admin/list');
});

//localhost:3001/admin/modify/~
router.get('/modify/:admin_id', async (req, res, next) => {
    var adminIdx = req.params.admin_id;

    var admin = await Admin.findOne({admin_member_id:adminIdx});

    res.render('admin/modify', { admin });
});

router.post('/modify/:admin_id', async (req, res, next) => {
    var adminIdx = req.params.admin_id;

    var company_code = req.body.company_code;
    var admin_id = req.body.admin_id;
    var admin_password = req.body.admin_password;
    var admin_name = req.body.admin_name;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var dept_name = req.body.dept_name;
    var used_yn_code = req.body.used_yn_code;

    var admin = {
        company_code,
        admin_id,
        admin_password,
        admin_name, 
        email,
        telephone,
        dept_name,
        used_yn_code,
        edit_user_id: 1,
        edit_date: Date.now()
    };

    await Admin.updateOne({admin_member_id:adminIdx}, admin);
    
    res.redirect("/admin/list");

});

router.get('/delete', async (req, res, next) => {
    var adminIdx = req.query.admin_id;
    await Admin.deleteOne({admin_member_id:adminIdx});
    res.redirect("/admin/list");
});

module.exports = router;