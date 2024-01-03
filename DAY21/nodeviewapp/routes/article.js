//게시글 정보관리 웹페이지
var express = require('express');
var router = express.Router();

var db = require('../models/index');

var Op = db.Sequelize.Op;

//SQL 쿼리문 직접사용
var sequelize = db.sequelize;
const {QueryTypes} = sequelize;

//localhost:3001/article/list
router.get('/list', async (req, res) => {

    //search 정보
    //공지게시판을 선택한다면, 화면상에 공지게시판 표시가 유지되도록 searchOption 객체를 전달
    var searchOption = {
        boardTypeCode: "0",
        title: "",
        isDisplayCode: "9"
    };

    //게시글 List
    //db.Article.findAll()메소드는 article 테이블에 모든 데이터를 조회하는
    //SELECT * FROM article; 쿼리로 변환되어 DB서버 전달, 실행, 결과물 반환
    // var articles = await db.Article.findAll();

    // var articles = await db.Article.findAll(
    //     {
    //         attributes: ['article_id', 'board_type_code', 'title', 'view_count', 'is_display_code', 'reg_date'],
    //         // where:{is_display_code:1,view_count:{[Op.not]:0}},
    //         order: [['article_id', 'DESC']]
    //     }
    // );

    // var sqlQuery=`SELECT article_id,board_type_code,title,view_count,is_display_code,reg_date,reg_member_id
    // FROM article
    // WHERE is_display_code=1
    // ORDER BY article_id DESC;`;

    // var articles = await sequelize.query(sqlQuery,{
    //     raw:true,
    //     type:QueryTypes.SELECT
    // });

    var articles = await sequelize.query(
        "CALL SP_CHAT_ARTICLE_DISPLAY (:P_DISPLAY_CODE)",
        {replacements: {P_DISPLAY_CODE:1}}
    );

    //Select Count(*) FROM article
    var articleCount = await db.Article.count();

    res.render('article/list.ejs', { articles, searchOption, articleCount });
});

router.post('/list', async (req, res) => {

    //데이터 추출
    var boardTypeCode = req.body.boardTypeCode;
    var title = req.body.title;
    var isDisplayCode = req.body.isDisplayCode;

    var searchOption = {
        boardTypeCode,
        title,
        isDisplayCode
    };

    var articles = await db.Article.findAll({ where: { board_type_code: searchOption.boardTypeCode } });
    var articleCount = await db.Article.count();

    res.render('article/list.ejs', { articles, searchOption, articleCount });

});

//localhost:3001/article/create
//신규 게시글 등록 페이지 
router.get('/create', async (req, res) => {
    res.render('article/create.ejs');
});

//신규 게시글 등록 데이터 처리 
router.post('/create', async (req, res) => {

    //게시글 등록 데이터 추출(사용자 입력)
    var board_type_code = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var is_display_code = req.body.isDisplayCode;
    var register = req.body.register;

    //추출된 데이터를 json 형태로 DB에 영구저장
    //저장 후 article 테이블에 저장된 데이터를 반환

    //등록할 게시글 데이터
    //★★★테이블에 저장/수정할 데이터소스는 반드시 데이터모델의 속성명을 이용해야 한다.★★
    var article = {
        board_type_code,
        title,
        contents,
        view_count: 0,
        ip_address: "111.222.222.222",
        article_type_code: articleTypeCode,
        is_display_code,
        reg_member_id: 1,
        reg_date: Date.now()
    };

    //게시글 정보를 article 테이블에 저장하고 저장된 값을 다시 반환
    //var registedArticle=await db.Article.create(article);

    //반환값x
    await db.Article.create(article);

    res.redirect('/article/list');
});

//localhost:3000/article/delete=?aid=1
router.get('/delete', async (req, res) => {
    //삭제하려는 게시글 고유번호 추출
    var articleIdx = req.query.aid;

    //Delete 처리
    var deletedCnt = await db.Article.destroy({ where: { article_id: articleIdx } });

    //list 페이지로 이동
    res.redirect('/article/list');
});

//localhost:3001/article/modify/~
router.get('/modify/:aid', async (req, res) => {
    var articleIdx = req.params.aid;

    //DB에서 해당 게시글 번호에 해당하는 게시글 정보 조회
    var article = await db.Article.findOne({ where: { article_id: articleIdx } });

    //단일 게시글에 동적 속성기반 댓글목록 속성추가 
    article.comments = [{coment_id:1,coment:'댓글1입니다.'},{coment_id:2,coment:'댓글2입니다.'}];

    //단일 게시글 정보를 뷰로 전달
    res.render('article/modify.ejs', { article });
});

router.post('/modify/:aid', async (req, res) => {
    var articleIdx = req.params.aid;

    var board_type_code = req.body.boardTypeCode;
    var title = req.body.title;
    var contents = req.body.contents;
    var articleTypeCode = req.body.articleTypeCode;
    var is_display_code = req.body.isDisplayCode;
    var register = req.body.register;

    //추출된 데이터를 json 형태로 DB에 영구저장
    //처리 후 처리건수값이 반환된다.
    var article = {
        board_type_code,
        title,
        contents,
        ip_address: "111.222.222.222",
        article_type_code: articleTypeCode,
        is_display_code,
        edit_member_id: 1,
        edit_date: Date.now()
    };

    //article 테이블의 컬럼내용을 수정처리하고 수정건수 반환받기
    //await db.Article.update(수정데이터, 조건);
    //UPDATE article SET board_type_code=1, title='', ...  WHERE article_id=1;
    var updatedCount = await db.Article.update(article, { where: { article_id: articleIdx } });

    res.redirect('/article/list');
});

module.exports = router;
