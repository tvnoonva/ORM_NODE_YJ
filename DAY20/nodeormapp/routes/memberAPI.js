var express = require('express');
var router = express.Router();

//모델영역의 db객체 참조
var db = require('../models/member');

//회원 로그인처리 전용 RESTful API
router.post('/login', async (req, res, next) => {

    var apiResult = {
        code: 200,
        data: null,
        result: ""
    };

    try {

        //STEP1 로그인 정보 추출
        var email = req.body.email;
        var password = req.body.password;

        //STEP2 members 테이블에서 동일한 메일주소의 단일사용자 정보를 조회
        //db.Member.findOne(조건) ORM 메소드는
        //SELECT * FROM members WHERE email='이메일값';의 SQL구문을 백엔드 환경에서 동적으로 만들어서
        //MySQL 서버로 전달해 실행하고 조회결과물을 반환받는다
        var member = await db.Member.findOne({ where: { email: email } });

        //STEP3 로그인처리 로직구현
        var resultMsg = '';

        if (member == null) {
            resultMsg = '사용자를 찾을 수 없습니다.';

            apiResult.code = 400;
            apiResult.data = null;
            apiResult.result = resultMsg;

        } else {
            if (member.password == password) {
                resultMsg = '로그인 성공';

                apiResult.code = 200;
                apiResult.data = member;
                apiResult.result = resultMsg;

            } else {
                resultMsg = '암호가 일치하지 않습니다.';

                apiResult.code = 400;
                apiResult.data = null;
                apiResult.result = resultMsg;
            }
        }
    } catch (err) {
        resultMsg = '서버에러발생 관리자에게 문의하세요.'

        apiResult.code = 500;
        apiResult.data = null;
        apiResult.result = resultMsg;
    }

    res.json(apiResult);

});

module.exports = router;
