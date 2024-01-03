//게시글 정보관리 웹페이지
var express = require('express');
var router = express.Router();

//MongoDB ODB 모델 참조하기
const Article = require('../schemas/article');

var moment = require('moment');

//localhost:3001/article/list
router.get('/list', async(req,res)=>{

    //search 정보
    //공지게시판을 선택한다면, 화면상에 공지게시판 표시가 유지되도록 searchOption 객체를 전달
    var searchOption = {
        boardTypeCode:"0",
        title:"",
        isDisplayCode:"9"
    };

    //게시글 List
    const articles = await Article.find({});

    res.render('article/list.ejs', {articles, searchOption, moment});
});

router.post('/list',async(req,res)=>{

    //데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var isDisplayCode = req.body.isDisplayCode;

    var searchOption = {
        boardTypeCode,
        title,
        isDisplayCode
    };

    const articles = [
        {
            article_id:1,
            board_type_code:1,
            title:"공지게시글 1번글입니다.",
            contents:"공지게시글 1번 내용입니다.",
            view_count:10,
            ip_address:"111.111.124.44",
            is_display_code:1,
            article_type_code:1,
            reg_date:"2023-12-12",
            reg_member_id:"eddy",
        }
    ];

    res.render('article/list.ejs', {articles, searchOption}); 

});

//localhost:3001/article/create
//신규 게시글 등록 페이지 
router.get('/create', async(req,res)=>{
    res.render('article/create.ejs');
});

//신규 게시글 등록 데이터 처리 
//localhost:3001/article/create
router.post('/create', async(req,res)=>{

    //게시글 등록 데이터 추출(사용자 입력)
    var title = req.body.title;
    var contents = req.body.contents;
    var article_type_code = req.body.articleTypeCode;
    var is_display_code = req.body.isDisplayCode;
    var edit_member_id = req.body.register;

    //추출된 데이터를 json 형태로 DB에 영구저장
    //저장 후 article 테이블에 저장된 데이터를 반환
    var article = {
        title,
        contents,
        article_type_code,
        view_count:0,
        is_display_code,
        edit_member_id,
        edit_date:Date.now()
    };

    const registedArticle = await Article.create(article);

    res.redirect('/article/list');
});

//localhost:3000/article/delete=?aid=1
router.get('/delete', async(req,res)=>{
    //삭제하려는 게시글 고유번호 추출
    var articleIdx = req.query.aid;

    //Delete 처리
    const result = await Article.deleteOne({article_id:articleIdx});

    //list 페이지로 이동
    res.redirect('/article/list');
});

//localhost:3001/article/modify/~
router.get('/modify/:aid', async(req,res)=>{
    var articleIdx=req.params.aid;

    //DB에서 해당 게시글 번호에 해당하는 게시글 정보 조회
    var articles= await Article.find({article_id:articleIdx});

    if(articles.length>0){
        var article=articles[0];
    }

    //단일 게시글 정보를 뷰로 전달
    res.render('article/modify.ejs',{article});
});

router.post('/modify/:aid', async(req,res)=>{
    var articleIdx=req.params.aid;

    var title = req.body.title;
    var contents = req.body.contents;
    var article_type_code = req.body.articleTypeCode;
    var is_display_code = req.body.isDisplayCode;
    var edit_member_id = req.body.register;

    //추출된 데이터를 json 형태로 DB에 영구저장
    //저장 후 article 테이블에 저장된 데이터를 반환
    var article = {
        title,
        contents,
        article_type_code,
        view_count:0,
        is_display_code,
        edit_member_id,
        edit_date:Date.now()
    };

    const result = await Article.updateOne({article_id:articleIdx},article);

    res.redirect('/article/list');
});

module.exports = router;
