//미로그인 상태에서 요청시 로그인 페이지로 이동처리
//로그인을 한 상태에서만 호출되어야 하는 라우팅 메소드에서 이용
exports.isLoggedIn =(req, res, next)=>{
 if(req.session.loginUser!=undefined){
    next();
 }else{
    res.redirect('/login');
 }
};

//미로그인 사용자만 특정 페이지로 이동처리
//로그인을 안한 상태에서만 호출되어야 하는 라우팅 메소드에서 이동
exports.isNotLoggedIn =(req, res, next)=>{
    if(req.session.loginUser==undefined){
        next();
    }else{
        res.redirect('/');
    }
};