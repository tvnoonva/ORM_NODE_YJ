const local = require('./localStrategy');

//해당 모듈에 패스포트 객체 전달
//로그인 라우팅 메소드에서 전달되는 패스포트 객체를 전달받아 사용
module.exports = passport => {
    //passport: 객체에 로그인 사용자의 세션정보를 세팅하는 함수
    //사용자 로그인 완료후 로그인한 사용자 정보를 세션에 담아주는 함수
    passport.serializeUser((user, done) => {
        //로그인한 사용자 세션데이터 정보를 세션영역에 바인딩
        done(null, user);
    });

    //바인딩된 세션 데이터를 조회
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    //로컬 사용자 strategy에 패스포트 객체를 전달하여 로그인 기능 구현
    local(passport);
};