var express = require('express');
var router = express.Router();

//임시메인
router.get('/', async(req, res, next)=> {
  res.render('channel/chat',{layout:"baseLayout"});
  //res.render('channel/chat',{layout:false});
});

//login get
router.get("/login", async(req,res)=>{
  res.render('login');
});

//login post
router.post("/login", async(req,res)=>{
  res.redirect('/');
});

//entry get
router.get("/entry", async(req,res)=>{
  res.render('entry');
});

//entry post
router.post("/entry", async(req,res)=>{
  var email=req.body.email;
  var password=req.body.password;

  //DB등록

  //등록 완료 후 /login으로 이동
  res.redirect("/login");
});

//find get
router.get("/find", async(req,res)=>{
  res.render('find');
});

//find post
router.post('/find', async(req, res)=>{
  var email=req.body.email;

  res.render('find', {email:"", result:"OK"});
});


module.exports = router;
