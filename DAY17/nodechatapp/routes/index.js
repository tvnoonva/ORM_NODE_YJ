var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res)=>{
  res.render('index');
});

router.get('/login', async(req, res)=>{
  res.render('login', {layout: "authLayout"});
});

router.post('/login', async(req, res)=>{
  var email=req.body.email;
  var password=req.body.password;

  res.redirect('/');
});

router.get('/entry', async(req, res)=>{
  res.render('entry', {layout: "authLayout"});
});

router.post('/entry', async(req, res)=>{
  var email=req.body.email;
  var password=req.body.password;

  res.redirect('/login');
});

router.get('/find', async(req, res)=>{
  res.render('find', {layout: "authLayout"});
});

router.post('/find', async(req, res)=>{
  var email=req.body.email;

  res.redirect('/login');
});

module.exports = router;
