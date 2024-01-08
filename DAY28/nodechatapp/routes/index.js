var express = require('express');
var router = express.Router();
const Member = require('../schemas/member');

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index');
});

router.get('/login', async (req, res) => {
  res.render('login', { layout: "authLayout" });
});

router.post('/login', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var member = await Member.find({ email: email });

  if (member == null) {
    console.log("사용자를 찾을 수 없습니다.");
  }
  if (member.member_password != password) {
    console.log("비밀번호가 일치하지 않습니다.");
  } else {
    res.redirect('/');
  }

});

router.get('/entry', async (req, res) => {
  res.render('entry', { layout: "authLayout" });
});

router.post('/entry', async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  var member = {
    email,
    member_password: password,
    name: '',
    profile_img_path: '',
    telephone: '',
    entry_type_code: 0,
    use_state_code: 1,
    reg_date: Date.now(),
    reg_member_id: 1,
  };

  await Member.create(member);

  res.redirect('/login');
});

router.get('/find', async (req, res) => {
  res.render('find', { layout: "authLayout", resultMsg:"" });
});

router.post('/find', async (req, res) => {
  var email = req.body.email;
  var resultMsg = '';

  var member_list = await Member.find({ email: email })
  console.log(member_list);

  if (member_list == null) {
    resultMsg = "fail";
  }
  else {
    var member = member_list[0];
    resultMsg = member.member_password;
    console.log(resultMsg);
    res.render('find', { resultMsg });
  }

});

module.exports = router;
