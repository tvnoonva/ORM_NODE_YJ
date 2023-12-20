//게시글 데이터 관리 전용 RESTful API 라우터 파일
//기본 주소 http://localhost:3000/api/article/~

var express = require('express');
var router = express.Router();

//API 반환형식 정의
var apiResult = {
    code: 200,
    data: [],
    result: "Ok"
}

//전체 게시글 목록 데이터 조회 반환
//localhost:3000/api/article/all
router.get('/all', async (req, res) => {

    //예외처리
    //웹페이지에서 발생한 에러는 app.js에서 자동으로 처리중
    //API는 DB에서 데이터를 가져오므로 app.js에서 자동으로 처리하지 않음
    //데이터 추출에서 error발생시 처리할 예외처리 구문이 필요 
    try {

        //STEP1 DB에서 전체 게시글 목록 데이터 조회
        const articles = [
            {
                article_id: 1,
                board_type_code: 1,
                title: "공지게시글 1번글입니다.",
                contents: "공지게시글 1번 내용입니다.",
                view_count: 10,
                ip_address: "111.111.124.44",
                is_display_code: 1,
                reg_date: "2023-12-12",
                reg_member_id: "eddy"
            },
            {
                article_id: 2,
                board_type_code: 2,
                title: "기술 블로깅 게시글 1번글입니다.",
                contents: "기술 게시글 1번 내용입니다.",
                view_count: 20,
                ip_address: "222.111.124.44",
                is_display_code: 0,
                reg_date: "2023-12-13",
                reg_member_id: "eddy"
            },
            {
                article_id: 3,
                board_type_code: 2,
                title: "기술 게시글 입니다.",
                contents: "기술 게시글 내용입니다.",
                view_count: 30,
                ip_address: "123.111.124.44",
                is_display_code: 1,
                reg_date: "2023-12-14",
                reg_member_id: "eddy"
            }
        ];

        //프론트엔드로 반환할 실제 데이터 바인딩
        apiResult.code = 200;
        apiResult.data = articles;
        apiResult.result = "Ok";

    } catch (err) {
        //error가 발생할 경우 전달할 데이터 값
        //에러가 발생해도 apiResult 데이터는 전달해야 한다.

        //console.log(err.message);
        //서버측 에러는 보안에 민감
        //프론트엔드나 사용자에게는 err.message 대신 정해진 error 코드나 관리 메세지를 전송한다.
        //서버측 에러코드는 추후 별도 로깅시스템 구현을 통해 서버 특정 폴더 내 로그파일로 기록하거나
        //백엔드 에러발생 알림 시스템(sms, email 등)을 통해 실시간 에러정보를 노티해준다.

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }

    //STEP2 

    res.json(apiResult);
});

//신규 게시글 등록처리 API
//localhost:3000/api/article/create
router.post('/create', async (req, res) => {

    try {

        //STEP1 프론트엔드에서 추출해준 게시글 등록 데이터 추출
        var boardTypeCode = req.body.boardTypeCode;
        var title = req.body.title;
        var contents = req.body.contents;
        var articleTypeCode = req.body.articleTypeCode;
        var isDisplayCode = req.body.isDisplayCode;
        var register = req.body.register;

        //추출된 데이터를 json 형태로 DB에 영구저장
        //저장 후 article 테이블에 저장된 데이터를 반환

        //등록할 데이터
        var article = {
            boardTypeCode,
            title,
            contents,
            articleTypeCode,
            isDisplayCode,
            register,
            registDate: Date.now()
        };

        //STEP2 DB article 테이블에 데이터를 등록하고 등록된 게이터가 반환된다.
        //등록된 데이터
        var savedArticle = {
            article_id: 1,
            board_type_code: 1,
            title: "공지게시글 1번글입니다.",
            contents: "공지게시글 1번 내용입니다.",
            view_count: 10,
            ip_address: "111.111.124.44",
            is_display_code: 1,
            reg_date: "2023-12-12",
            reg_member_id: "eddy"
        };

        //STEP3 정상 데이터 등록처리
        apiResult.code = 200;
        apiResult.data = savedArticle;
        apiResult.result = "Ok";

    } catch (err) {

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";

    }

    res.json(apiResult);

});

//단일 게시글 수정처리 API
//localhost:3000/api/article/update
router.post('/update', async (req, res) => {

    try{
        //STEP1 사용자가 게시글 데이터 수정한 데이터 추출 
        var articleIdx = req.body.article_id;

        var boardTypeCode = req.body.boardTypeCode;
        var title = req.body.title;
        var contents = req.body.contents;
        var articleTypeCode = req.body.articleTypeCode;
        var isDisplayCode = req.body.isDisplayCode;
        var register = req.body.register;

        //수정처리 후 적용건수 반환

        //수정할 게시글 데이터
        var article = {
            articleIdx,
            boardTypeCode,
            title,
            contents,
            articleTypeCode,
            isDisplayCode,
            register,
            registDate: Date.now()
        };

        //STEP2 수정처리 후 처리건수 반환
        //DB처리 후 적용건수 1이 반환되었다고 가정
        var affectedCnt = 1;

        //STEP3 정상수정된 정보를 apiResult 객체에 바인딩
        apiResult.code = 200;
        apiResult.data = affectedCnt;
        apiResult.result = "Ok";

    }catch(err){

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";

    }

    res.json(apiResult);

});

//단일 게시글 데이터 조회 반환 API
//localhost:3000/api/article/1
router.get('/:aidx', async (req, res) => {
    
    try{
        //STEP1 URL을 통해 전달된 게시글 고유번호 추출
        var articleIdx=req.params.aidx;

        //STEP2 게시글 고유번호에 해당하는 단일 게시글 정보를 DB에서 조회
        var savedArticle = {
            article_id: 1,
            board_type_code: 1,
            title: "공지게시글 1번글입니다.",
            contents: "공지게시글 1번 내용입니다.",
            view_count: 10,
            ip_address: "111.111.124.44",
            is_display_code: 1,
            reg_date: "2023-12-12",
            reg_member_id: "eddy"
        };

        //STEP3 정상조회된 정보를 apiResult 객체에 바인딩
        apiResult.code = 200;
        apiResult.data = savedArticle;
        apiResult.result = "Ok";

    }catch(err){

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";

    }

    res.json(apiResult);

});

//단일 게시글 삭제처리 API
//localhost:3000/api/article/1
router.delete('/:aidx', async (req, res) => {

    try{
        //1 url 주소에서 게시글 고유번호 추출
        var articleIdx = req.params.aidx;

        //2 db의 article테이블에서 해당 번호 게시글 완전삭제

        //3 db에서 삭제된 건수 전달
        var deletedCnt = 1;

        //4 정상 삭제된 정보를 apiResult 객체에 바인딩
        apiResult.code = 200;
        apiResult.data = deletedCnt;
        apiResult.result = "Ok";

    }catch(err){
        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = "Failed";
    }
    
    res.json(apiResult);

});

module.exports = router;