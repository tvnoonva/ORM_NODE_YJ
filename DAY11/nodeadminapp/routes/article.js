//관리자 사이트 게시글 정보처리 라우팅
//http://localhost:3001/acticle
var express = require('express');
var router = express.Router();

//localhost:3001/article/list
router.get('/list', async(req,res)=>{
    res.render('article/list');
});

//localhost:3001/article/create
router.get('/create', async(req,res)=>{
    res.render('article/create');
});

//localhost:3001/article/create
router.post('/create', async(req,res)=>{
    //게시글 정보
    //제목, 게시글번호, 내용, 조회수, 작성자(user), 작성일
    //게시글 작성시 제목, 내용, 작성자만 전달받음
    var title=req.body.title;
    var contents=req.body.contents;
    var reister=req.body.reister;

    //article 객체로 전달
    var article={
        title,
        contents,
        reister,
        registDate:Date.now()
    };

    res.redirect('/article/list');
});

//localhost:3001/article/modify
router.get('/modify', async(req,res)=>{

    //임시로 전달할 예제 객체
    var article={
        title:"게시글1",
        articleId:1,
        contents:"내용입니다.",
        ViewCount:100,
        reister:"am3ca723",
        registDate:Date.now()
    };

    res.render('article/modify', {article});
});

router.post('/modify', async(req,res)=>{
    var title=req.body.title;
    var contents=req.body.contents;
    var reister=req.body.reister;

    //article 객체로 전달
    var article={
        title,
        contents,
        reister,
        registDate:Date.now()
    };

    res.redirect('/article/list');
});

router.get('/delete', async(req,res)=>{
    res.render('article/list');
});

module.exports=router;