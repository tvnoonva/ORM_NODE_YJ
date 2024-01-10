var express = require('express');
var router = express.Router();
var db = require('../models/index');
var bcrypt = require('bcryptjs');
var AES = require('mysql-aes');

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
    var password = req.body.password;
    var member = await db.Member.findOne({ where: { email: email } });

    if (member) {
      var compareResult = await bcrypt.compare(password, member.member_password);

      if (compareResult) {
        resultMsg = "OK"
        member.member_password = "";
        member.telephone = await AES.decrypt(member.telephone, process.env.MYSQL_AES_KEY);

        apiResult.code = 200;
        apiResult.data = member;
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
  req.json({});
})

module.exports = router;
