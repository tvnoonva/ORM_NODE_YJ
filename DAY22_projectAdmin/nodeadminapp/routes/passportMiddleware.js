//로그인 안됐으면 로그인 페이지로 
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        console.log("login success");
        next();
    } else {
        console.log("login failed");
        res.redirect('/');
    }
};

//로그인 되어있다면 main으로
exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/main');
    }
};