//게시글 정보관리 웹페이지
var express = require('express');
var router = express.Router();

//localhost:3001/article/list
router.get('/list', async(req,res)=>{

    //게시글 List
    const articles = [
        {
            article_id:1,
            board_type_code:1,
            title:"공지게시글 1번글입니다.",
            contents:"공지게시글 1번 내용입니다.",
            view_count:10,
            ip_address:"111.111.124.44",
            is_display_code:1,
            reg_date:"2023-12-12",
            reg_member_id:"eddy"
        },
        {
            article_id:2,
            board_type_code:2,
            title:"기술 블로깅 게시글 1번글입니다.",
            contents:"기술 게시글 1번 내용입니다.",
            view_count:20,
            ip_address:"222.111.124.44",
            is_display_code:0,
            reg_date:"2023-12-13",
            reg_member_id:"eddy"
        },
        {
            article_id:3,
            board_type_code:2,
            title:"기술 게시글 입니다.",
            contents:"기술 게시글 내용입니다.",
            view_count:30,
            ip_address:"123.111.124.44",
            is_display_code:1,
            reg_date:"2023-12-14",
            reg_member_id:"eddy"
        }
    ];

    res.render('article/list.ejs', {articles});
});

router.post('/list',async(req,res)=>{

    //데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var isDisplayCode = req.body.isDisplayCode;

    const articles = [
        {
            article_id:1,
            board_type_code:1,
            title:"공지게시글 1번글입니다.",
            contents:"공지게시글 1번 내용입니다.",
            view_count:10,
            ip_address:"111.111.124.44",
            is_display_code:1,
            reg_date:"2023-12-12",
            reg_member_id:"eddy"
        }
    ];

    res.render('article/list.ejs', {articles}); 

});

//localhost:3001/article/create
router.get('/create', async(req,res)=>{
    res.render('article/create.ejs');
});

//localhost:3001/article/create
router.post('/create', async(req,res)=>{

    res.redirect('/article/list');
});

router.get('/delete', async(req,res)=>{
    var articleIdx = req.query.aid;

    res.render('article/list.ejs');
});

//localhost:3001/article/modify
router.get('/modify/:aid', async(req,res)=>{
    var articleIdx=req.params.aid;

    res.render('article/modify.ejs');
});

router.post('/modify/:aid', async(req,res)=>{
    var articleIdx=req.params.aid;

    res.redirect('/article/list');
});

module.exports = router;
