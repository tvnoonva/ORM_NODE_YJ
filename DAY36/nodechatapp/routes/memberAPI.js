var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');
var jwt = require('jsonwebtoken');

//사용자 토큰 검사 미들웨어 참조
var {tokenAuthChecking} = require('./apiMiddleware');

//열거형 상수 참조
var constants = require('../common/enum');

var apiResult = {
  code: 400,
  data: null,
  msg: ""
};

/* GET home page. */
router.post('/entry', async (req, res, next) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    var telephone = req.body.telephone;

    //회원가입 로직추가: 메일주소 중복체크
    var existMember = await db.Member.findOne({ where: { email: email } });
    if (existMember) {

      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = "ExistDoubleEmail";

    } else {
      var encryptedPassword = await bcrypt.hash(password, 12);
      var encryptedMobileNum = await AES.encrypt(telephone, process.env.MYSQL_AES_KEY);

      var member = {
        email,
        member_password: encryptedPassword,
        name: req.body.name,
        profile_img_path: "",
        telephone: encryptedMobileNum,
        entry_type_code: 1,
        use_state_code: 1,
        birth_date: "",
        reg_date: Date.now(),
        reg_member_id: 0
      };

      var registedMember = await db.Member.create(member);
      //불필요한 중요 데이터 속성값 삭제후 프론트엔드로 전달
      registedMember.member_password = "";

      apiResult.code = 200;
      apiResult.data = registedMember;
      apiResult.msg = "OK";
    }

  } catch (err) {
    console.log("서버에러발생 -/api/member/entry:", err.message);
    apiResult.code = 500;
    apiResult.data = registedMember;
    apiResult.msg = "Failed";

  }

  res.json(apiResult);
});


router.post('/login', async (req, res, next) => {
  try {
    var resultMsg = ""
    var email = req.body.email;

    //STEP1 로그인 인증 체크
    var password = req.body.password;
    var member = await db.Member.findOne({ where: { email: email } });

    if (member) {

      //STEP2 단방향 암호화 기반 암호 체크
      var compareResult = await bcrypt.compare(password, member.member_password);

      if (compareResult) {
        resultMsg = "OK"
        member.member_password = "";
        member.telephone = await AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

        //STEP3 인증된 사용자의 기본정보 JWT 토큰 발급
        //STEP3-1 JWT 토큰에 담을 사용자 정보 생성
        var memberTokenData = {
          member_id: member.member_id,
          email: member.email,
          name: member.name,
          profile_img_path: member.profile_img_path,
          telephone: member.telephone,
          etc: "기타정보"
        }

        var token = await jwt.sign(memberTokenData, process.env.JWT_SECRET, { expiresIn: '24h', issuer: 'msoftware' });

        apiResult.code = 200;
        apiResult.data = token;
        apiResult.msg = resultMsg;

      } else {
        resultMsg = "NotCorrectPassword"

        apiResult.code = 400;
        apiResult.data = null;
        apiResult.msg = resultMsg;
      }
    } else {
      resultMsg = "NotExistEmail";
      apiResult.code = 400;
      apiResult.data = null;
      apiResult.msg = resultMsg;
    }


  } catch (err) {
    console.log("서버에러발생 -/api/member/entry:", err.message);
    apiResult.code = 500;
    apiResult.data = registedMember;
    apiResult.msg = "Failed";

  }

  res.json(apiResult);
})


router.post('/find', async (req, res, next) => {
  res.json({});
})

//로그인한 현재 사용자의 회원 기본정보 조회 API
//로그인시 발급된 토큰은 http header 영역에 포함되어 전달된다
router.get('/profile', tokenAuthChecking, async (req, res, next) => {

  try {
    //STEP1: 웹브라우저 헤더에서 사용자 JWT Bearer 인증토큰 추출
    //req.headers.authorization = "Bearer dfaskdfjieQRDFASF"
    var token = req.headers.authorization.split('Bearer ')[1];
    var tokenJsonData = await jwt.verify(token, process.env.JWT_SECRET);

    //웹브라우저에서 전달된 JWT토큰문자열에서 필요한 로그인 사용자 정보 추출
    var loginMemberId = tokenJsonData.member_id;
    var loginMemberEmail = tokenJsonData.email;

    var dbMember = await db.Member.findOne({
      where: { member_id: loginMemberId },
      attributes: ['email', 'name', 'profile_img_path', 'telephone', 'birth_date']
    });

    dbMember.telephone = AES.decrypt(dbMember.telephone, process.env.MYSQL_AES_KEY);


    apiResult.code = 200;
    apiResult.data = dbMember;
    apiResult.msg = "OK";

  } catch (err) {
    apiResult.code = 500;
    apiResult.data = null;
    apiResult.msg = "Failed";
  }

  res.json(apiResult);

})

//전체 회원 목록 
router.get('/all', tokenAuthChecking, async(req,res,next)=>{
  try{

    var member_list = await db.Member.findAll({
      attributes:['member_id', 'email', 'name', 'profile_img_path', 'telephone'],
      // where:{use_state_code:constants.USE_STATE_CODE_USED}
      where:{use_state_code:constants.USE_STATE_CODE_USED}
    });
    return res.json({code:200, data:member_list, msg:"OK"});
    
  }catch(err){
    return res.json({code:500, data:null, msg:"Error in /all GET"});
  }

});

module.exports = router;
