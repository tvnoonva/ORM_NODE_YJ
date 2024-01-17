//공통기능 제공
//http://localhost:3001/
var express = require('express');
var router = express.Router();
var db=require('../models/index');
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');

const {isLoggedIn, isNotLoggedIn} = require('./sessionMiddleware');

var resultMsg='';

/* GET home page. */
router.get('/main', isLoggedIn, function(req, res, next) {
  var userData =  req.session.loginUser;
  res.render('index', {userData});
});

//로그인 웹페이지 요청&응답
//localhost:3001/
router.get('/', isNotLoggedIn, async(req,res)=>{
  resultMsg='';
  res.render('login', {layout:"loginLayout", resultMsg});
});

//로그인 처리 및 응답, 처리 후 메인페이지 이동
//localhost:3001/
router.post('/', isNotLoggedIn, async(req,res)=>{

  var admin_id=req.body.adminId;
  var password=req.body.password;

  var login_member = await db.Admin.findOne({where:{admin_id:admin_id}});

  if(login_member){
    if(await bcrypt.compare(password, login_member.admin_password)){
      var sessionLoginData = {
        admin_member_id: login_member.admin_member_id,
        company_code: login_member.company_code,
        admin_id: login_member.admin_id,
        admin_name: login_member.admin_name
      };

      req.session.isLoggedIn = true;
      req.session.loginUser = sessionLoginData;
      req.session.save(function () {
        return res.redirect("/main");
      });
    }else{
      return res.render('login', {layout:false, resultMsg:"Password not correct."});
    }
  }else{
    return res.render('login', {layout:false, resultMsg:"Admin member not found."});
  }

});

module.exports = router;
