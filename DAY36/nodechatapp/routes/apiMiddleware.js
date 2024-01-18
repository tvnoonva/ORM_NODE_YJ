//각종 RESTful API 라우터/라우팅메소드에서 데이터 요청시
//JWT 사용자 로그인 인증토큰이 있는지 없는지 체크해서 후행작업을 제어
//apiMiddleware.js 해당 호출 API를 해당 요청사용자가 호출/사용가능한지에 대한 권한체크 미들웨어
var jwt = require('jsonwebtoken');

exports.tokenAuthChecking = async(req, res, next) => {

    //STEP1: 발급된 토큰정보가 존재하지 않을 경우
    if (req.headers.authorization == undefined) {
        var apiResult = {
            code: 400,
            data: null,
            msg: "사용자 인증 토큰 미제공"
        }
        return res.json(apiResult);
    }

    //토큰 유효성 검사
    try {
        var token = req.headers.authorization.split('Bearer ')[1];
        var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

        if(tokenJsonData){
            next();
        }

    } catch (error) {
        var apiResult = {
            code: 400,
            data: null,
            msg: "유효하지 않은 토큰"
        }
        return res.json(apiResult);
    }

};