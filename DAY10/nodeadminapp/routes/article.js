//기본주소 http://localhost:3000/articles/~
var express = require('express');
var router = express.Router();

//게시글 목록 웹페이지 요청&응답 처리
//localhost:3000/articles
router.get('/',async(req,res)=>{
    
    //게시글 목록 데이터
    //추후 DB와 연동
    var articles = [
    {
        articleIdx:1,
        title:"첫번째 게시글입니다.",
        content:"첫번째 게시글 내용",
        view_cnt:100,
        display:"Y",
        ipaddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:"eddy"
    },
    {
        articleIdx:2,
        title:"2번째 게시글입니다.",
        content:"2번째 게시글 내용",
        view_cnt:200,
        display:"Y",
        ipaddress:"222.111.111.111",
        registDate:Date.now(),
        registMemberId:"eddy2"
    },
    {
        articleIdx:3,
        title:"3번째 게시글입니다.",
        content:"3번째 게시글 내용",
        view_cnt:300,
        display:"Y",
        ipaddress:"123.111.111.111",
        registDate:Date.now(),
        registMemberId:"eddy3"
    }
    ];

    res.render('article/list',{articles});
});

//신규 게시글 등록 웹페이지 요청&응답 처리
//localhost:3000/articles/create
//신규 게시글 등록 웹페이지로 이동 
router.get('/create',async(req,res)=>{
    res.render('article/create');
});

//신규 게시글 사용자 입력정보 등록
//localhost:3000/articles/create
//게시글 목록 페이지로 이동
router.post('/create',async(req,res)=>{
    var title=req.body.title;
    var content=req.body.content;
    var register=req.body.register;

    //DB 입력 데이터 생성 및 DB 등록
    var article={
        articleIdx:0,
        title,
        content,
        view_cnt:0,
        display:"Y",
        ipaddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:register
    };

    //게시글 목록 페이지로 이동
    res.redirect("/articles");
});

//선택 게시글 정보확인 요청&응답
//localhost:3000/articles/modify/1
//선택 단일 게시글 정보 표시 웹페이지
router.get('/modify/:aid',async(req,res)=>{
    
    //url을 통해 전달된 게시글 고유번호 추출 
    var articleIdx=req.params.aid;

    //게시글 고유번호를 이용해 DB에서 게시글 정보 조회

    //조회 결과(DB에서 나왔다고 침)
    var article={
        articleIdx,
        title:"1번째 게시글 제목입니다.",
        content:"1번째 게시글 내용입니다.",
        view_cnt:100,
        display:"Y",
        ipaddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:"eddy"
    };

    res.render('article/modify',{article});
});

//게시글 수정페이지에서 사용자가 수정한 게시글 수정정보 처리 요청&응답
//localhost:3000/articles/modify/1
router.post('/modify/:aid',async(req,res)=>{
    var articleIdx=req.params.aid;

    var title=req.body.title;
    var content=req.body.content;
    var register=req.body.register;

    //DB 수정 데이터 생성 및 DB 수정
    var article={
        articleIdx,
        title,
        content,
        view_cnt:0,
        display:"Y",
        ipaddress:"111.111.111.111",
        registDate:Date.now(),
        registMemberId:register
    };
    //게시글 목록 페이지로 이동
    res.redirect("/articles");
});

//게시글 삭제 요청&응답 처리
//localhost:3000/articles/delete?aidx=1
router.get('/delete', async(req,res)=>{
    var articleIdx=req.query.aidx;

    //해당 게시글 번호를 이용해 DB에서 해당 게시글 삭제

    //삭제완료 후 게시글 목록 페이지로 이동

    res.redirect("/articles");
});


module.exports = router;