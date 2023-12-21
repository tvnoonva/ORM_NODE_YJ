var express = require('express');
var router = express.Router();

//임시메인
router.get('/', async(req, res, next)=> {
  res.render('channel/chat',{layout:"baseLayout"});
});

module.exports = router;