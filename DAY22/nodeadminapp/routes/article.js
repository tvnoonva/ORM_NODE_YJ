//관리자 사이트 게시글 정보처리 라우팅
//http://localhost:3001/acticle
var express = require('express');
var router = express.Router();

var articles = [
    {
        article_id: 1,
        board_type_code: 1,
        title: "제목1",
        article_type_code: 1,
        contents: "내용1",
        view_count: 10,
        ip_address: "111.111.111.111",
        is_display_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    },
    {
        article_id: 2,
        board_type_code: 1,
        title: "제목2",
        article_type_code: 1,
        contents: "내용2",
        view_count: 12,
        ip_address: "111.111.111.222",
        is_display_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin2",
        edit_date: Date.now(),
        edit_member_id: "yujin2"
    },
    {
        article_id: 1,
        board_type_code: 3,
        title: "제목3",
        article_type_code: 5,
        contents: "내용12345",
        view_count: 10,
        ip_address: "111.111.333.111",
        is_display_code: 0,
        reg_date: Date.now(),
        reg_member_id: "yujin3",
        edit_date: Date.now(),
        edit_member_id: "yujin3"
    },
];

//localhost:3001/article/list
router.get('/list', async (req, res) => {
    res.render('article/list', { articles });
});

//localhost:3001/article/create
router.get('/create', async (req, res) => {
    res.render('article/create');
});

//localhost:3001/article/create
router.post('/create', async (req, res) => {
    //입력받을 항목
    //게시판 ID, 제목, 타입코드, 내용, 게시여부
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var is_display_code = req.body.is_display_code;

    var articleSavedDB = {
        article_id: "",
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count: 0,
        ip_address: "",
        is_display_code,
        reg_date: Date.now(),
        reg_member_id: "",
        edit_date: Date.now(),
        edit_member_id: ""
    };

    res.redirect('/article/list');
});

//localhost:3001/article/modify/~
router.get('/modify/:article_id', async (req, res) => {
    var article_id=req.params.article_id;

    var article = {
        article_id: 1,
        board_type_code: 1,
        title: "제목1",
        article_type_code: 1,
        contents: "내용1",
        view_count: 10,
        ip_address: "111.111.111.111",
        is_display_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    };

    res.render('article/modify', { article });
});

router.post('/modify/:article_id', async (req, res) => {
    var article_id=req.params.article_id;

    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var is_display_code = req.body.is_display_code;

    var articleSavedDB = {
        article_id: "",
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count: 0,
        ip_address: "",
        is_display_code,
        reg_date: Date.now(),
        reg_member_id: "",
        edit_date: Date.now(),
        edit_member_id: ""
    };

    var acticle = {
        article_id: 1,
        board_type_code: 1,
        title: "제목1",
        article_type_code: 1,
        contents: "내용1",
        view_count: 10,
        ip_address: "111.111.111.111",
        is_display_code: 1,
        reg_date: Date.now(),
        reg_member_id: "yujin",
        edit_date: Date.now(),
        edit_member_id: "yujin"
    };

    res.redirect('/article/list');
});

router.get('/delete', async (req, res) => {
    var article_id=req.params.article_id;
    
    res.redirect('/article/list');
});

module.exports = router;