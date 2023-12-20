//관리자 사이트 관리자 계정 정보처리 라우팅
//http://localhost:3001/admin
var express = require('express');
var router = express.Router();

var admin_member = [
    {
        admin_member_id: 1,
        company_code: 1,
        admin_id: 'yujin',
        admin_password: 'yujinPW1',
        admin_name: '최유진',
        email: 'am3ca723@gmail.com',
        telephone: '010-111-1111',
        dept_name: '개발부',
        used_yn_code: 1,
        reg_user_id: 1,
        edit_user_id: 1,
        edit_date: Date.now(),
        reg_date: Date.now(),
    },
    {
        admin_member_id: 2,
        company_code: 1,
        admin_id: 'yujin2',
        admin_password: 'yujinPW12',
        admin_name: '최유인',
        email: 'am3ca723@gmail.com',
        telephone: '010-111-2222',
        dept_name: '영업부',
        used_yn_code: 1,
        reg_user_id: 2,
        edit_user_id: 2,
        edit_date: Date.now(),
        reg_date: Date.now(),
    },
    {
        admin_member_id: 3,
        company_code: 1,
        admin_id: 'yujin3',
        admin_password: 'yujinPW124',
        admin_name: '최유민',
        email: 'am3ca723@gmail.com',
        telephone: '010-111-2223',
        dept_name: '선도부',
        used_yn_code: 0,
        reg_user_id: 3,
        edit_user_id: 3,
        edit_date: Date.now(),
        reg_date: Date.now(),
    },
];

//localhost:3001/admin/list
router.get('/list', async (req, res) => {
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
        reg_user_id: '',
        edit_user_id: '',
        edit_date: Date.now(),
        reg_date: Date.now(),
    };

    res.redirect('/admin/list');
});

//localhost:3001/admin/modify/~
router.get('/modify/:admin_id', async (req, res, next) => {
    var admin_id = req.params.admin_id;

    var admin = {
        company_code: 1,
        admin_id: 2,
        admin_password: '1234',
        admin_name: 'newadmin',
        email: 'root@gmail.com',
        telephone: '010-1111-1111',
        dept_name: 'IT부서',
        used_yn_code: '1',
        reg_user_id: 'oldAdmin',
        edit_user_id: 'oldAdmin',
        edit_date: Date.now(),
        reg_date: Date.now(),
    };

    res.render('admin/modify', { admin });
});

router.post('/modify/:admin_id', async (req, res, next) => {
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
        reg_user_id: '',
        edit_user_id: '',
        edit_date: Date.now(),
        reg_date: Date.now(),
    };

    //등록한 데이터
    var savedAdmin = {
        company_code: 1,
        admin_id: 2,
        admin_password: '1234',
        admin_name: 'newadmin',
        email: 'root@gmail.com',
        telephone: '010-1111-1111',
        dept_name: 'IT부서',
        used_yn_code: '1',
        reg_user_id: 'oldAdmin',
        edit_user_id: 'oldAdmin',
        edit_date: Date.now(),
        reg_date: Date.now(),
    };

    res.json(savedAdmin);
});

router.get('/delete', async (req, res, next) => {
    var admin_id = req.query.admin_id;
    // console.log("삭제완료");
    res.redirect("/admin/list");
});

module.exports = router;