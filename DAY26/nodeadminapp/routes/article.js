//관리자 사이트 게시글 정보처리 라우팅
//http://localhost:3001/acticle
var express = require('express');
var router = express.Router();
var Article = require('../schemas/article');

//localhost:3001/article/list
router.get('/list', async (req, res) => {
    var articles = await Article.find({});
    res.render('article/list', { articles });
});

//localhost:3001/article/create
router.get('/create', async (req, res) => {
    res.render('article/create');
});

//localhost:3001/article/create
router.post('/create', async (req, res) => {
    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var is_display_code = req.body.is_display_code;

    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count: 0,
        ip_address:"127.0.0.1",
        is_display_code,
        reg_date: Date.now(),
        reg_member_id: 1
    };

    await Article.create(article);

    res.redirect('/article/list');
});

//localhost:3001/article/modify/~
router.get('/modify/:article_id', async (req, res) => {
    var articleIdx=req.params.article_id;
    var articles = await Article.find({article_id:articleIdx});
    var article = articles[0];

    res.render('article/modify', { article });
});

router.post('/modify/:article_id', async (req, res) => {
    var articleIdx=req.params.article_id;

    var board_type_code = req.body.board_type_code;
    var title = req.body.title;
    var article_type_code = req.body.article_type_code;
    var contents = req.body.contents;
    var is_display_code = req.body.is_display_code;

    var article = {
        board_type_code,
        title,
        article_type_code,
        contents,
        view_count: 0,
        ip_address:"127.0.0.1",
        is_display_code,
        edit_date: Date.now(),
        edit_member_id: 1
    };

    await Article.updateOne({article_id:articleIdx}, article);

    res.redirect('/article/list');
});

router.get('/delete', async (req, res) => {
    var articleIdx=req.query.article_id;
    await Article.deleteOne({article_id:articleIdx});
    res.redirect('/article/list');
});

module.exports = router;